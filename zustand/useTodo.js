import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { persist, createJSONStorage } from 'zustand/middleware';

const todoObj = (todoText) => {
  return {
    id: crypto.randomUUID(), // 建立 id
    text: todoText,
    complete: false, // 是否完成
    edit: false,
  };
};

const addNewTodo = (todos, newTodoText) => {
  const todo = todoObj(newTodoText);
  const newTodos = [...todos, todo];
  return newTodos;
};

const toggleComplete = (todos, todoId) => {
  return todos.map((item) => (item.id === todoId ? { ...item, complete: !item.complete } : item));
};

const toggleEdit = (todos, todoId) => {
  return todos.map((item) => (item.id === todoId ? { ...item, edit: !item.edit } : item));
};

const saveEditValue = (todos, todoId, todoText) => {
  return todos.map((item) =>
    item.id === todoId && item.edit === true ? { ...item, text: todoText, edit: false } : item,
  );
};

const deleteItem = (todos, todoId) => {
  return todos.filter((item) => item.id !== todoId);
};

const useTodo = create(
  devtools(
    persist(
      (set) => ({
        todos: [],
        addTodo: (todoText) =>
          // 先將原本的 state 展開，把需要改變的 todos 另外寫 fu 處理 todo 邏輯
          // 直接使用 set 去撰寫邏輯，一個 callback function 回傳一個 object
          set((state) => ({
            ...state,
            todos: addNewTodo(state.todos, todoText),
          })),
        toggleComplete: (todoId) =>
          set((state) => ({
            ...state,
            todos: toggleComplete(state.todos, todoId),
          })),
        toggleEdit: (todoId) =>
          set((state) => ({
            ...state,
            todos: toggleEdit(state.todos, todoId),
          })),
        saveEditValue: (todoId, todoText) =>
          set((state) => ({
            ...state,
            todos: saveEditValue(state.todos, todoId, todoText),
          })),
        deleteItem: (todoId) =>
          set((state) => ({
            ...state,
            todos: deleteItem(state.todos, todoId),
          })),
      }),
      {
        name: 'todo-storage',
        storage: createJSONStorage(() => localStorage),
        // (optional) by default, 'localStorage' is used
      },
    ),
  ),
);

export default useTodo;

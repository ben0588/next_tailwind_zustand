'use client';

import useTodo from '@/zustand/useTodo';
import { useRef, useState } from 'react';

const Page = () => {
  // const store = useTodo(); // 如下可以直接把方法結構出來
  const { todos, addTodo, toggleComplete, toggleEdit, saveEditValue, deleteItem } = useTodo();

  const [todoText, setTodoText] = useState('');
  const [todoEditText, setTodoEditText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(todoText);

    setTodoText('');
  };

  const handleSaveText = (id) => {
    saveEditValue(id, todoEditText);

    setTodoEditText('');
  };

  return (
    <div className='px-3'>
      <form onSubmit={handleSubmit}>
        <div className='flex items-center space-x-3'>
          <input
            type='text'
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
            className='w-2/3 border-2 border-zinc-300 py-2 pl-3'
            placeholder='請輸入待辦項目'
          />
          <input
            type='submit'
            disabled={todoText === ''}
            className={`ml-3 border-2 border-zinc-300 py-2 px-4 ${todoText === '' ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-zinc-900 hover:text-white'} w-1/3 duration-150`}
          />
        </div>
      </form>
      <ul className='mt-5 flex flex-col space-y-3'>
        {todos &&
          todos.map((item) => (
            <li key={item.id} className='w-full'>
              {item.edit ? (
                <div className='flex items-center justify-between space-x-3 border-2 border-zinc-300 p-3'>
                  <input
                    type='text'
                    className='w-3/4 border border-zinc-400 py-1 pl-2'
                    value={todoEditText}
                    onChange={(e) => setTodoEditText(e.target.value)}
                  />
                  <button
                    type='button'
                    className='w-1/4 border-2 border-green-600 bg-green-600 px-3 py-1 text-white duration-150 hover:bg-white hover:text-green-600'
                    onClick={() => handleSaveText(item.id)}
                  >
                    儲存
                  </button>
                </div>
              ) : (
                <div className='flex items-center justify-between space-x-3 border-2 border-zinc-300 p-3'>
                  <div className='flex items-center'>
                    <input
                      type='checkbox'
                      name=''
                      id=''
                      value={item.complete}
                      onChange={() => toggleComplete(item.id)}
                      className='h-6 w-6 accent-violet-600'
                      checked={item.complete}
                    />
                    <span
                      className={`ml-5 cursor-pointer ${item.complete && 'line-through'} `}
                      onClick={() => toggleComplete(item.id)}
                    >
                      {item.text}
                    </span>
                  </div>
                  <div className='flex  items-center space-x-3'>
                    <button
                      type='button'
                      className='border-2 border-zinc-500 px-3 py-1 text-zinc-500 duration-150 hover:bg-zinc-900 hover:text-white'
                      onClick={() => {
                        toggleEdit(item.id);
                        setTodoEditText(item.text);
                      }}
                    >
                      編輯
                    </button>
                    <button
                      type='button'
                      className='border-2 border-red-600 bg-red-600 px-3 py-1 text-white duration-150 hover:bg-white hover:text-red-600'
                      onClick={() => deleteItem(item.id)}
                    >
                      刪除
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};
export default Page;

'use client';
import { useEffect } from 'react';
import React from 'react';
export default function ScrollToTop() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);
  return null;
}

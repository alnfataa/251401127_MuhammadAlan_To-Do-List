import { createContext, useCallback, useContext, useState } from "react";
import { dummyTodos } from "../data/dummyTodos.js";

const TodoContext = createContext(null);

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState(dummyTodos);
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = "success") => {
    const key = Date.now();
    setToast({ message, type, key });
    setTimeout(() => {
      setToast((current) => (current && current.key === key ? null : current));
    }, 3000);
  }, []);

  const addTodo = (data) => {
    // id unik: id terbesar + 1 (nanti diganti id dari backend)
    const nextId = todos.reduce((max, t) => Math.max(max, t.id), 0) + 1;
    setTodos((prev) => [...prev, { id: nextId, ...data }]);
    showToast("Tugas berhasil ditambahkan");
  };

  const updateTodo = (id, data) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, ...data } : t)));
    showToast("Tugas berhasil diperbarui");
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
    showToast("Tugas berhasil dihapus", "danger");
  };

  return (
    <TodoContext.Provider
      value={{ todos, addTodo, updateTodo, deleteTodo, toast }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodos() {
  const ctx = useContext(TodoContext);
  if (!ctx) throw new Error("useTodos harus dipakai di dalam TodoProvider");
  return ctx;
}

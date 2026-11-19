import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTodos } from "../context/TodoContext.jsx";
import TodoForm from "../components/TodoForm.jsx";
import ConfirmDialog from "../components/ConfirmDialog.jsx";
import { EyeIcon, TrashIcon } from "../components/Icons.jsx";

const truncate = (text, max = 28) =>
  text.length > max ? text.slice(0, max) + "..." : text;

export default function TodoList() {
  const { todos, addTodo, deleteTodo } = useTodos();
  const navigate = useNavigate();
  const [showAdd, setShowAdd] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  return (
    <div className="page">
      <header className="page-header">
        <h1>Todo List</h1>
        <button className="btn btn-blue" onClick={() => setShowAdd(true)}>
          Tambah Todo
        </button>
      </header>

      <table className="table">
        <thead>
          <tr>
            <th>Judul</th>
            <th>Status</th>
            <th>Prioritas</th>
            <th>Deadline</th>
            <th className="center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td title={todo.title}>{truncate(todo.title)}</td>
              <td>{todo.status}</td>
              <td>{todo.priority}</td>
              <td>{todo.deadline}</td>
              <td className="center">
                <button
                  className="icon-btn btn-blue"
                  aria-label={`Lihat detail ${todo.title}`}
                  onClick={() => navigate(`/todo/${todo.id}`)}
                >
                  <EyeIcon />
                </button>
                <button
                  className="icon-btn btn-red"
                  aria-label={`Hapus ${todo.title}`}
                  onClick={() => setToDelete(todo)}
                >
                  <TrashIcon />
                </button>
              </td>
            </tr>
          ))}
          {todos.length === 0 && (
            <tr>
              <td colSpan={5} className="empty">
                Belum ada tugas. Klik "Tambah Todo" untuk membuat tugas baru.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {showAdd && (
        <TodoForm
          mode="add"
          onClose={() => setShowAdd(false)}
          onSubmit={(data) => {
            addTodo(data);
            setShowAdd(false);
          }}
        />
      )}

      {toDelete && (
        <ConfirmDialog
          title="Hapus Todo"
          message={`Yakin ingin menghapus tugas "${toDelete.title}"?`}
          onCancel={() => setToDelete(null)}
          onConfirm={() => {
            deleteTodo(toDelete.id);
            setToDelete(null);
          }}
        />
      )}
    </div>
  );
}

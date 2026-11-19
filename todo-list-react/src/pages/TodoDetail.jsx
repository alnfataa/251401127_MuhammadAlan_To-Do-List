import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTodos } from "../context/TodoContext.jsx";
import TodoForm from "../components/TodoForm.jsx";

export default function TodoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { todos, updateTodo } = useTodos();
  const [showEdit, setShowEdit] = useState(false);

  const todo = todos.find((t) => t.id === Number(id));

  if (!todo) {
    return (
      <div className="detail-wrap">
        <div className="card detail-card">
          <p className="confirm-text">Tugas tidak ditemukan.</p>
          <button className="btn btn-red" onClick={() => navigate("/")}>
            Kembali
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="detail-wrap">
      <div className="card detail-card">
        <div className="detail-grid">
          <div>
            <p className="label">Judul</p>
            <p className="value">{todo.title}</p>

            <p className="label">Deskripsi</p>
            <div className="desc-box">{todo.description || "-"}</div>
          </div>
          <div>
            <p className="label">Status</p>
            <p className="value">{todo.status}</p>

            <p className="label">Prioritas</p>
            <p className="value">{todo.priority}</p>

            <p className="label">Deadline</p>
            <p className="value">{todo.deadline}</p>

            <div className="row actions">
              <button className="btn btn-red" onClick={() => navigate("/")}>
                Kembali
              </button>
              <button className="btn btn-blue" onClick={() => setShowEdit(true)}>
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

      {showEdit && (
        <TodoForm
          mode="edit"
          initial={todo}
          onClose={() => setShowEdit(false)}
          onSubmit={(data) => {
            updateTodo(todo.id, data);
            setShowEdit(false);
          }}
        />
      )}
    </div>
  );
}

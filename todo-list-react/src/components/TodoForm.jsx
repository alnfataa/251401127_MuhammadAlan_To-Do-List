import { useState } from "react";
import Modal from "./Modal.jsx";
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from "../data/dummyTodos.js";

const emptyTodo = {
  title: "",
  description: "",
  status: "to-do",
  priority: "low",
  deadline: "",
};

// Dipakai untuk "Tambah Todo" (initial kosong) dan "Update Todo" (initial = data tugas)
export default function TodoForm({ mode, initial, onSubmit, onClose }) {
  const [form, setForm] = useState(
    initial
      ? {
          title: initial.title,
          description: initial.description,
          status: initial.status,
          priority: initial.priority,
          deadline: initial.deadline,
        }
      : emptyTodo
  );
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const err = {};
    if (!form.title.trim()) err.title = "Judul wajib diisi";
    if (!form.deadline) err.deadline = "Deadline wajib diisi";
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    if (Object.keys(err).length) return setErrors(err);
    onSubmit({ ...form, title: form.title.trim(), description: form.description.trim() });
  };

  const isEdit = mode === "edit";

  return (
    <Modal title={isEdit ? "Update Todo" : "Tambah Todo"} onClose={onClose}>
      <form onSubmit={handleSubmit} noValidate>
        <label className="label" htmlFor="title">Judul</label>
        <input
          id="title"
          name="title"
          className={`input ${errors.title ? "input-error" : ""}`}
          value={form.title}
          onChange={handleChange}
          autoFocus
        />
        {errors.title && <p className="error-text">{errors.title}</p>}

        <label className="label" htmlFor="description">Deskripsi</label>
        <textarea
          id="description"
          name="description"
          className="input"
          rows={3}
          value={form.description}
          onChange={handleChange}
        />

        <div className="row">
          <div className="col">
            <label className="label" htmlFor="status">Status</label>
            <select id="status" name="status" className="input" value={form.status} onChange={handleChange}>
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="col">
            <label className="label" htmlFor="priority">Prioritas</label>
            <select id="priority" name="priority" className="input" value={form.priority} onChange={handleChange}>
              {PRIORITY_OPTIONS.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>

        <label className="label" htmlFor="deadline">Deadline</label>
        <input
          id="deadline"
          name="deadline"
          type="date"
          className={`input ${errors.deadline ? "input-error" : ""}`}
          value={form.deadline}
          onChange={handleChange}
        />
        {errors.deadline && <p className="error-text">{errors.deadline}</p>}

        <div className="row actions">
          <button type="button" className="btn btn-red col" onClick={onClose}>Batal</button>
          <button type="submit" className="btn btn-blue col">{isEdit ? "Update" : "Tambah"}</button>
        </div>
      </form>
    </Modal>
  );
}

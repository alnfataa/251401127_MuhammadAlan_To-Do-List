# Todo List – React.js

Kuis Praktikum Pengembangan Frontend. Aplikasi To-Do List sederhana (frontend saja, data dummy) yang dibuat dengan React.js + Vite.

## Fitur

- **Menampilkan tugas** – tabel berisi judul, status, prioritas, dan deadline.
- **Melihat detail** – klik ikon mata → halaman `/todo/:id`.
- **Menambah tugas** – tombol "Tambah Todo" membuka form modal (dengan validasi judul & deadline).
- **Memperbarui tugas** – tombol "Update" di halaman detail membuka form modal berisi data lama.
- **Menghapus tugas** – klik ikon tempat sampah → dialog konfirmasi sebelum dihapus.
- **Umpan balik** – dialog konfirmasi hapus dan notifikasi (toast) setiap tambah / update / hapus.
- Semua perubahan langsung tampil lewat **React State** (Context + `useState`) tanpa reload halaman.

## Struktur Data

```js
{
  id: 1,
  title: "Mengerjakan Proyek Computer Vision",
  description: "…",
  priority: "high",        // low | medium | high
  deadline: "2026-10-11",  // YYYY-MM-DD
  status: "in progress",   // to-do | in progress | done
}
```

Atribut mengikuti ketentuan soal sehingga mudah diintegrasikan dengan REST API
(`GET/POST /api/todos`, `GET/PUT/DELETE /api/todos/:id`) pada pertemuan berikutnya.
Titik integrasi ada di `src/context/TodoContext.jsx` (`addTodo`, `updateTodo`, `deleteTodo`) dan data awal di `src/data/dummyTodos.js`.

## Teknologi

React 18, React Router 6, Vite 5, CSS biasa.

## Cara Menjalankan

```bash
npm install
npm run dev
```

Buka http://localhost:5173

## Struktur Folder

```
src/
├── components/   Modal, TodoForm, ConfirmDialog, Toast, Icons
├── context/      TodoContext (state global + operasi CRUD)
├── data/         dummyTodos.js
├── pages/        TodoList, TodoDetail
├── App.jsx
├── main.jsx
└── index.css
```

## Screenshot

> Ganti dengan screenshot hasil implementasi (simpan di folder `screenshots/`).

| Halaman | Screenshot |
| --- | --- |
| Daftar Todo | ![Daftar](screenshots/list.png) |
| Tambah Todo | ![Tambah](screenshots/add.png) |
| Detail Todo | ![Detail](screenshots/detail.png) |
| Update Todo | ![Update](screenshots/update.png) |
| Konfirmasi Hapus | ![Hapus](screenshots/delete.png) |

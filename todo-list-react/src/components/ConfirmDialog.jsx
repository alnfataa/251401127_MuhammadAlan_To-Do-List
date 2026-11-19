import Modal from "./Modal.jsx";

export default function ConfirmDialog({ title, message, confirmLabel = "Hapus", onConfirm, onCancel }) {
  return (
    <Modal title={title} onClose={onCancel}>
      <p className="confirm-text">{message}</p>
      <div className="row actions">
        <button type="button" className="btn btn-gray col" onClick={onCancel}>Batal</button>
        <button type="button" className="btn btn-red col" onClick={onConfirm}>{confirmLabel}</button>
      </div>
    </Modal>
  );
}

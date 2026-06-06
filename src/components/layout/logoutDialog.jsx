import "../../extraCSS/dialog.css";

export default function ConfirmDialog({
  open,
  title = "Are you sure?",
  message = "Do you really want to continue?",
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className="dialogOverlay">
      <div className="dialogBox">
        <h3 className="font-bold text-md  text-gray-700">{title}</h3>
        <p className="text-gray-600">{message}</p>

        <div className="dialogActions">
          <button className="confirmBtn text-sm" onClick={onConfirm}>
            Yes, Logout
          </button>

          <button className="cancelBtn text-sm" onClick={onCancel}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}

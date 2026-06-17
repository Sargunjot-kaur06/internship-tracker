function ApplicationCard({
  id,
  company,
  role,
  status,
  deleteApplication,
  updateStatus,
}) {
  return (
    <div className="application-card">
      <h3>{company}</h3>

      <p>{role}</p>

      <p>Status: {status}</p>

      <button
        onClick={() => deleteApplication(id)}
      >
        🗑️ Delete
      </button>

      <button
        onClick={() => updateStatus(id)}
      >
        Update Status
      </button>
    </div>
  );
}

export default ApplicationCard;
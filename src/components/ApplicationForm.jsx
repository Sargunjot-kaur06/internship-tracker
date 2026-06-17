import { useState } from "react";

function ApplicationForm({ addApplication }) {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newApplication = {
      id: Date.now(),
      company,
      role,
      status: "Applied",
    };

    addApplication(newApplication);

    setCompany("");
    setRole("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Company Name"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      <input
        type="text"
        placeholder="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />

      <button type="submit">
        Add Application
      </button>
    </form>
  );
}

export default ApplicationForm;
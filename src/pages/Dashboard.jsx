import { useState, useEffect } from "react";
import ApplicationForm from "../components/ApplicationForm";
import NavBar from "../components/NavBar";
import ApplicationCard from "../components/ApplicationCard";

function Dashboard() {
  const defaultApplications = [
    {
      id: 1,
      company: "Google",
      role: "Frontend Intern",
      status: "Applied",
    },
    {
      id: 2,
      company: "Microsoft",
      role: "SDE Intern",
      status: "Interview",
    },
  ];

  // STATE: stores all applications (LOCAL STORAGE)
  const [applications, setApplications] = useState([]);
  // const [applications, setApplications] = useState(() => {
  //   const savedApplications = localStorage.getItem("applications");

  //   if (!savedApplications) {
  //     return defaultApplications;
  //   }

  //   try {
  //     const parsedApplications = JSON.parse(savedApplications);
  //     return Array.isArray(parsedApplications)
  //       ? parsedApplications
  //       : defaultApplications;
  //   } catch {
  //     return defaultApplications;
  //   }
  // });

  useEffect(() => {
    localStorage.setItem(
      "applications",
      JSON.stringify(applications)
    );
  }, [applications]);

  useEffect(() => {
  fetch("http://localhost:5000/applications")
    .then((response) => response.json())
    .then((data) => {
      setApplications(data);
    })
    .catch((error) => {
      console.error(error);
    });
}, []);

  // ADD APPLICATION FUNCTION
  const addApplication = async (newApplication) => {
  try {
    const response = await fetch(
      "http://localhost:5000/applications",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newApplication),
      }
    );

    const data = await response.json();

    setApplications((prev) => [
      ...prev,
      data.application,
    ]);
  } catch (error) {
    console.error(error);
  }
};

  // DELETE APPLICATION FUNCTION
  const deleteApplication = async (id) => {
  try {
    await fetch(
      `http://localhost:5000/applications/${id}`,
      {
        method: "DELETE",
      }
    );

    setApplications(
      applications.filter(
        (app) => app.id !== id
      )
    );
  } catch (error) {
    console.error(error);
  }
};


  // UPDATE FUNCTION 
  const updateStatus = async (id) => {
  const application = applications.find(
    (app) => app.id === id
  );

  if (!application) return;

  let newStatus = application.status;

  if (application.status === "Applied") {
    newStatus = "Interview";
  } else if (application.status === "Interview") {
    newStatus = "Selected";
  } else {
    return;
  }

  try {
    await fetch(
      `http://localhost:5000/applications/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      }
    );

    setApplications(
      applications.map((app) =>
        app.id === id
          ? { ...app, status: newStatus }
          : app
      )
    );
  } catch (error) {
    console.error(error);
  }
};

  const totalApplications = applications.length;

  const totalInterviews = applications.filter(
    (app) => app.status === "Interview"
  ).length;

  const totalSelected = applications.filter(
    (app) => app.status === "Selected"
  ).length;

  const totalRejected = applications.filter(
    (app) => app.status === "Rejected"
  ).length;

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredApplications = applications.filter((app) => {
    const matchesSearch = app.company
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      app.status === statusFilter;

    return matchesSearch && matchesStatus;
    });

  return (
    <>
      <NavBar />

      <div className="dashboard">
        <h1>Internship Tracker Dashboard</h1>

        {/* FORM */}
        <ApplicationForm addApplication={addApplication} />

        {/* STATS */}
        <div className="stats">
          <div className="stat-card">
            <h2>{totalApplications}</h2>
            <p>Total Applications</p>
          </div>

          <div className="stat-card">
            <h2>{totalInterviews}</h2>
            <p>Interviews</p>
          </div>

          <div className="stat-card">
            <h2>{totalSelected}</h2>
            <p>Selected</p>
          </div>

          <div className="stat-card">
            <h2>{totalRejected}</h2>
            <p>Rejected</p>
          </div>
        </div>

        <h2>Applications</h2>

        <input
          className="search-input"
          type="text"
          placeholder="Search Company..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Selected">Selected</option>
        </select>
        
        {filteredApplications.length === 0 ? (
          <div className="empty-state">
            <h3>No applications found</h3>
            <p>Add your first intership application!</p>
          </div>
        ):(
          filteredApplications.map((app) => (
          <ApplicationCard
            key={app.id}
            id={app.id}
            company={app.company}
            role={app.role}
            status={app.status}
            deleteApplication={deleteApplication}
            updateStatus={updateStatus}
          />
        )))}
      </div>
    </>
  );
}

export default Dashboard;
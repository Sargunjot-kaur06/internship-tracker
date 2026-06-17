import { useState, useEffect } from "react";
import ApplicationForm from "../components/ApplicationForm";
import NavBar from "../components/NavBar";
import ApplicationCard from "../components/ApplicationCard";

function Dashboard() {

  // STATE: stores all applications (LOCAL STORAGE)
  const [applications, setApplications] = useState(() => {
    const savedApplications = 
      localStorage.getItem("applications");

    return savedApplications
      ? JSON.parse(savedApplications)
      :[
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
  });

  useEffect(() => {
    localStorage.setItem(
      "applications",
      JSON.stringify(applications)
    );
  }, [applications]);

  // ADD APPLICATION FUNCTION
  const addApplication = (newApplication) => {
    setApplications([
      ...applications,
      newApplication,
    ]);
  };  

  // DELETE APPLICATION FUNCTION
  const deleteApplication = (id) => {
    setApplications(
      applications.filter((app) => app.id !== id)
    );
  };


  // UPDATE FUNCTION 
  const updateStatus = (id) => {
  setApplications(
    applications.map((app) => {
      if (app.id === id) {
        if (app.status === "Applied") {
          return { ...app, status: "Interview" };
        }

        if (app.status === "Interview") {
          return { ...app, status: "Selected" };
        }

        return app;
      }

      return app;
     })
    );
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
        
        {filteredApplications.map((app) => (
          <ApplicationCard
            key={app.id}
            id={app.id}
            company={app.company}
            role={app.role}
            status={app.status}
            deleteApplication={deleteApplication}
            updateStatus={updateStatus}
          />
        ))}
      </div>
    </>
  );
}

export default Dashboard;
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // accept json sent from clients

const applications = [
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
  {
    id: 3,
    company: "Amazon",
    role: "Backend Intern",
    status: "Selected",
  },
];

// get -> returns data or retrieve data
app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.get("/applications", (req, res) => {
  res.json(applications);
});

//post -> add new data or create data
app.post("/applications", (req, res) => {
  const newApplication = req.body;

  applications.push(newApplication);

  res.status(201).json({
    message: "Application added successfully",
    application: newApplication,
  });
});

// delete -> deleting the present data
app.delete("/applications/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = applications.findIndex(
    (app) => app.id === id
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Application not found",
    });
  }

  applications.splice(index, 1);

  res.json({
    message: "Application deleted successfully",
  });
});

// put -> update present data 
app.put("/applications/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const application = applications.find(
    (app) => app.id === id
  );

  if (!application) {
    return res.status(404).json({
      message: "Application not found",
    });
  }

  application.status = req.body.status;

  res.json({
    message: "Status updated",
    application,
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});



// CRUD Cycle  HTTP Methods:
// get -> returns data or retrieve data
// post -> add new data or create data
// delete -> deleting the present data
// put -> update present data 
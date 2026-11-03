
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory student array
let students = [
    {
        id: 101,
        name: "Rahul Sharma",
        email: "rahul@gmail.com",
        course: "CSE",
        age: 21
    }
];

// Home route
app.get("/", (req, res) => {
    res.send("Student Management API is running!");
});


// TASK 2: POST - Add student
app.post("/students", (req, res) => {

    const { id, name, email, course, age } = req.body;

    if (id === undefined || id === null || !name || !email ||
        !course || age === undefined || age === null) {
        return res.status(400).json({
            message: "All fields are mandatory"
        });
    }

    if (students.some(s => s.id === Number(id))) {
        return res.status(409).json({
            message: "Student ID already exists"
        });
    }

    const newStudent = {
        id: Number(id),
        name,
        email,
        course,
        age: Number(age)
    };

    students.push(newStudent);

    res.status(201).json({
        message: "Student added successfully",
        student: newStudent
    });
});


// TASK 3: GET - Retrieve all students
app.get("/api/students", (req, res) => {
    res.status(200).json(students);
});


// TASK 3: GET - Retrieve student by ID
app.get("/api/students/:id", (req, res) => {

    const studentId = Number(req.params.id);

    const student = students.find(s => s.id === studentId);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.status(200).json(student);
});


// TASK 4: PUT - Update student details
app.put("/api/students/:id", (req, res) => {

    const studentId = Number(req.params.id);

    const student = students.find(s => s.id === studentId);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    const { name, email, course, age } = req.body;

    if (name !== undefined) student.name = name;
    if (email !== undefined) student.email = email;
    if (course !== undefined) student.course = course;
    if (age !== undefined) student.age = Number(age);

    res.status(200).json({
        message: "Student updated successfully",
        student: student
    });
});


// TASK 5: DELETE - Delete student record
app.delete("/api/students/:id", (req, res) => {

    const studentId = Number(req.params.id);

    const index = students.findIndex(s => s.id === studentId);

    if (index === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    const deletedStudent = students.splice(index, 1);

    res.status(200).json({
        message: "Student deleted successfully",
        student: deletedStudent[0]
    });
});


// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});


const express = require('express');

const app = express();

app.use(express.json());

// In-memory student array
let students = [];

// POST route to add student
app.post('/students', (req, res) => {

    const { id, name, email, course, age } = req.body;

    // Validate mandatory fields
    if (!id || !name || !email || !course || !age) {
        return res.status(400).json({
            message: 'All fields are mandatory'
        });
    }

    // Prevent duplicate student IDs
    const existingStudent = students.find(student => student.id === id);

    if (existingStudent) {
        return res.status(409).json({
            message: 'Student ID already exists'
        });
    }

    // Store student record
    const newStudent = {
        id,
        name,
        email,
        course,
        age
    };

    students.push(newStudent);

    // Success response
    res.status(201).json({
        message: 'Student added successfully',
        student: newStudent
    });
});

// Start server
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

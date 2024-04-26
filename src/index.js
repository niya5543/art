const express = require('express');
const app = express();
const path = require("path");
const hbs = require("hbs");
const collection = require("./mongodb");

const templatePath = path.join(__dirname, '../templates');

app.use(express.json());
app.set("view engine", "hbs");
app.set("views", templatePath);
app.use(express.urlencoded({ extended: false }));

// Serve static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Route to render the index page
app.get("/", (req, res) => {
    res.render("index");
});

// Route to render the login page
app.get("/login", (req, res) => {
    res.render("login_cust");
});

// Route to handle login form submission
app.post("/login", async (req, res) => {
    console.log("Request Body:", req.body); // Check the entire request body
    const { email, password } = req.body; // Ensure correct extraction
    console.log("Extracted Email:", email); // Log the extracted email
    console.log("Extracted Password:", password); // Log the extracted password
    // Further processing...
});


// Route to render the signup page
app.get("/signup", (req, res) => {
    res.render("reg_cust");
});

// Route to handle signup form submission
app.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    const data = { email, password };
    try {
        await collection.insertMany([data]); // Insert user data into the database
        console.log("Data inserted successfully");
        res.redirect("/login"); // Redirect to login page after signup
    } catch (error) {
        console.error("Error inserting data into MongoDB:", error);
        res.render("reg_cust", { errorMessage: "An unexpected error occurred. Please try again later." });
    }
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});

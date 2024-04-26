const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/artgallery")
    .then(() => {
        console.log("mongodb connected");
    })
    .catch(() => {
        console.log("failed to connect");
    });

const LogInSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const collection = mongoose.model("login_cust", LogInSchema);

async function insertData() {
    try {
        const data = { email: 'example@example.com', password: 'password' };
        await collection.insertOne(data);
        console.log("Data inserted successfully");
    } catch (error) {
        console.error("Error inserting data into MongoDB:", error);
        // Handle the error appropriately, such as retrying the operation or displaying an error message
    }
}

module.exports = collection;

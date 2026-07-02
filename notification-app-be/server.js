const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const TOKEN = process.env.TOKEN;

// Check whether token is loaded
console.log("==================================");
console.log("Token Loaded :", TOKEN ? "YES" : "NO");
console.log("Token Length :", TOKEN ? TOKEN.length : 0);
console.log("==================================");

// Affordmed Notification API
const API_URL = "http://20.244.56.144/evaluation-service/notifications";

// Home Route
app.get("/", (req, res) => {
    res.send("Notification Backend Running...");
});

// Notification Route
app.get("/notifications", async (req, res) => {

    try {

        if (!TOKEN) {
            return res.status(500).json({
                success: false,
                message: "Bearer Token not found in .env"
            });
        }

        const response = await axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${TOKEN}`
            },
            timeout: 10000
        });

        console.log("========== SUCCESS ==========");
        console.log(response.data);
        console.log("=============================");

        res.status(200).json(response.data);

    } catch (error) {

        console.log("\n========== ERROR ==========");

        if (error.response) {

            console.log("Status :", error.response.status);
            console.log("Status Text :", error.response.statusText);
            console.log("Response Data :");
            console.log(error.response.data);

        } else {

            console.log("Message :", error.message);

        }

        console.log("===========================\n");

        res.status(error.response?.status || 500).json({
            success: false,
            message: "Unable to fetch notifications.",
            error: error.response?.data || error.message
        });

    }

});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
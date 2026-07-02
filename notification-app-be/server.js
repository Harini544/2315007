const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const TOKEN = process.env.TOKEN;

// API given in the assignment
const API_URL = "http://4.224.186.213/evaluation-service/notifications";

app.get("/", (req, res) => {
    res.send("Notification Backend Running");
});

app.get("/notifications", async (req, res) => {

    if (!TOKEN) {
        return res.status(500).json({
            success: false,
            message: "TOKEN not found in .env"
        });
    }

    try {

        const response = await axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${TOKEN}`
            }
        });

        res.status(200).json(response.data);

    } catch (err) {

        console.log("========== API ERROR ==========");

        if (err.response) {
            console.log("Status :", err.response.status);
            console.log("Response :", err.response.data);

            return res.status(err.response.status).json({
                success: false,
                message: "Notification API Error",
                error: err.response.data
            });
        }

        if (err.request) {
            console.log("No response from server");

            return res.status(500).json({
                success: false,
                message: "No response from Notification API"
            });
        }

        console.log(err.message);

        return res.status(500).json({
            success: false,
            message: err.message
        });
    }

});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
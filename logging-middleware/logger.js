const axios = require("axios");

const LOG_API = "http://4.224.186.213/evaluation-service/logs";

const TOKEN = "PASTE_YOUR_ACCESS_TOKEN_HERE";

async function Log(stack, level, packageName, message) {
    try {
        const response = await axios.post(
            LOG_API,
            {
                stack: stack,
                level: level,
                package: packageName,
                message: message
            },
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                    "Content-Type": "application/json"
                }
            }
        );

        console.log("Log Created Successfully");
        console.log(response.data);

    } catch (error) {

        console.log("Logging Failed");

        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }
    }
}

module.exports = Log;
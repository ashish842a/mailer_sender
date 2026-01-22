require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

const { sendRawEmail, sendTemplateMail } = require("./mailer");

const app = express();

/**
 * 🔹 Create logs.txt file (if not exists)
 */
const logFilePath = path.join(__dirname, "logs.txt");
const logStream = fs.createWriteStream(logFilePath, { flags: "a" });

/**
 * 🔹 Morgan middleware
 * - Logs to file
 * - Logs to console
 */
app.use(
  morgan(":method :url :status :response-time ms", {
    stream: logStream,
  })
);

app.use(morgan("dev")); // console logs

/**
 * 🔹 Body parser
 */
app.use(express.json());

/**
 * 🔹 Health check
 */
app.get("/", (req, res) => {
  res.send("Mail service running ✅");
});

/**
 * 🔹 Simple email test
 */
app.post("/send-mail", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    await sendRawEmail({
      to: email,
      subject: "Test Mail",
      html: "<h2>Hello from Nodemailer 🚀</h2>",
    });

    res.json({
      success: true,
      message: "Mail sent successfully",
    });
  } catch (err) {
    console.error("Send Mail Error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to send mail",
    });
  }
});

/**
 * 🔹 Welcome email
 */
app.post("/send-welcome-mail", async (req, res) => {
  try {
    const { email, name } = req.body;

    if (!email || !name) {
      return res.status(400).json({
        success: false,
        message: "Email and name are required",
      });
    }

    await sendTemplateMail({
      to: email,
      subject: "Welcome to My App 🎉",
      template: "welcome",
      context: {
        name,
        appName: "My App",
        year: new Date().getFullYear(),
      },
    });

    res.json({
      success: true,
      message: "Welcome email sent",
    });
  } catch (err) {
    console.error("Welcome Mail Error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to send welcome mail",
    });
  }
});

/**
 * 🔹 OTP email
 */
app.post("/send-otp", async (req, res) => {
  try {
    const { email, name } = req.body;

    if (!email || !name) {
      return res.status(400).json({
        success: false,
        message: "Email and name are required",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    await sendTemplateMail({
      to: email,
      subject: "Your OTP Code",
      template: "otp",
      context: {
        name,
        otp,
        expiryMinutes: 10,
        appName: "My App",
        year: new Date().getFullYear(),
      },
    });

    res.json({
      success: true,
      message: "OTP sent successfully",
      otp, // ❌ remove in production
    });
  } catch (err) {
    console.error("OTP Mail Error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to send OTP",
    });
  }
});

/**
 * 🔹 Start server
 */
app.listen(6000, () => {
  console.log("🚀 Server running on port 6000");
  console.log("📄 Logs writing to logs.txt");
});

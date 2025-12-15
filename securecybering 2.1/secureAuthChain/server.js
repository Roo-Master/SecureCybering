require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const twilio = require("twilio");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(express.json());

/* ---------------- CONFIG ---------------- */
const otpStore = {}; // In production → Redis / DB
const twilioClient = twilio(
    process.env.TWILIO_SID,
    process.env.TWILIO_TOKEN
);

/* ---------------- AUDIT LOGGING ---------------- */
function auditLog(event, username, status, ip) {
    const log = `${new Date().toISOString()} | ${event} | ${username} | ${status} | ${ip}\n`;
    fs.appendFileSync("audit.log", log);
}

/* ---------------- EMAIL TRANSPORT ---------------- */
const mailer = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

/* ---------------- OTP GENERATOR ---------------- */
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

/* ---------------- LOGIN ENDPOINT ---------------- */
app.post("/api/login", (req, res) => {
    const { username } = req.body;
    const sessionId = uuidv4();
    const otp = generateOTP();

    otpStore[sessionId] = {
        otp,
        attempts: 0,
        expires: Date.now() + 60 * 1000
    };

    auditLog("LOGIN_SUCCESS", username, "PENDING_OTP", req.ip);

    res.json({
        success: true,
        sessionId,
        message: "Login successful. OTP required."
    });
});

/* ---------------- EMAIL OTP ---------------- */
app.post("/api/send-email-otp", async(req, res) => {
    const { email, sessionId, username } = req.body;
    const record = otpStore[sessionId];

    if (!record) return res.status(400).json({ error: "Invalid session" });

    await mailer.sendMail({
        from: `"SecureChain" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Your SecureChain OTP",
        text: `Your OTP is ${record.otp}. Expires in 60 seconds.`
    });

    auditLog("OTP_EMAIL_SENT", username, "SUCCESS", req.ip);
    res.json({ success: true });
});

/* ---------------- SMS OTP ---------------- */
app.post("/api/send-sms-otp", async(req, res) => {
    const { phone, sessionId, username } = req.body;
    const record = otpStore[sessionId];

    if (!record) return res.status(400).json({ error: "Invalid session" });

    await twilioClient.messages.create({
        body: `SecureChain OTP: ${record.otp} (valid 60s)`,
        from: process.env.TWILIO_PHONE,
        to: phone
    });

    auditLog("OTP_SMS_SENT", username, "SUCCESS", req.ip);
    res.json({ success: true });
});

/* ---------------- VERIFY OTP ---------------- */
app.post("/api/verify-otp", (req, res) => {
    const { sessionId, otp, username } = req.body;
    const record = otpStore[sessionId];

    if (!record) {
        auditLog("OTP_VERIFY", username, "INVALID_SESSION", req.ip);
        return res.status(400).json({ error: "Invalid session" });
    }

    if (Date.now() > record.expires) {
        auditLog("OTP_VERIFY", username, "EXPIRED", req.ip);
        delete otpStore[sessionId];
        return res.status(401).json({ error: "OTP expired" });
    }

    record.attempts++;

    if (record.attempts > 3) {
        auditLog("OTP_VERIFY", username, "LOCKED", req.ip);
        delete otpStore[sessionId];
        return res.status(403).json({ error: "Account locked" });
    }

    if (record.otp === otp) {
        auditLog("OTP_VERIFY", username, "SUCCESS", req.ip);
        delete otpStore[sessionId];
        return res.json({ success: true, message: "Access granted" });
    }

    auditLog("OTP_VERIFY", username, "FAILED", req.ip);
    res.status(401).json({ error: "Invalid OTP" });
});

/* ---------------- START SERVER ---------------- */
app.listen(process.env.PORT, () =>
    console.log(`SecureChain Auth Server running on port ${process.env.PORT}`)
);
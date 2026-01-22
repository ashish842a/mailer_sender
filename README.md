Here is the **FULL `README.md` in pure Markdown code**.
You can **copy–paste exactly** and the formatting will stay perfect 👇

````markdown
# 📧 Node.js Mailer Service (Nodemailer + Handlebars)

A **production-ready email service** built with **Node.js, Express, Nodemailer, Handlebars, and Morgan**.  
Supports **HTML emails, template-based emails, OTP emails**, and **request logging to file**.

---

## 🚀 Features

- ✅ Send simple HTML emails
- ✅ Send professional template emails
- ✅ OTP email support
- ✅ Handlebars templating (`.hbs`)
- ✅ SMTP support (Gmail, Outlook, etc.)
- ✅ Request logging using **Morgan**
- ✅ Logs saved to `logs.txt`
- ✅ Secure environment variable handling
- ✅ Production-friendly structure

---

## 📁 Project Structure

```text
mailer_checker/
│── server.js
│── mailer.js
│── templates/
│   ├── welcome.hbs
│   └── otp.hbs
│── logs.txt
│── .env.example
│── .gitignore
│── package.json
│── README.md
````

---

## 🛠️ Installation

### 1️⃣ Clone the Repository

```bash
git clone <your-repo-url>
cd mailer_checker
```

### 2️⃣ Install Dependencies

```bash
npm install
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory.

```env
PORT=6000

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

> ⚠️ **Never commit `.env` to GitHub**

---

## ▶️ Run the Project

```bash
node server.js
```

Server will start at:

```
http://localhost:6000
```

---

## 📌 API Endpoints

### 🔹 Health Check

```http
GET /
```

Response:

```
Mail service running ✅
```

---

### 🔹 Send Test Email

```http
POST /send-mail
```

Body:

```json
{
  "email": "test@example.com"
}
```

---

### 🔹 Send Welcome Email (Template)

```http
POST /send-welcome-mail
```

Body:

```json
{
  "email": "test@example.com",
  "name": "Ash"
}
```

---

### 🔹 Send OTP Email

```http
POST /send-otp
```

Body:

```json
{
  "email": "test@example.com",
  "name": "Ash"
}
```

---

## 📝 Logging

* HTTP requests are logged using **Morgan**
* Logs are written to:

```
logs.txt
```

Example log:

```
POST /send-otp 200 112 ms
```

---

## 📄 Email Templates

Templates are written using **Handlebars** and stored in:

```
/templates
```

### Available Templates

* `welcome.hbs` – Welcome email
* `otp.hbs` – OTP verification email

---

## 🔒 Security Notes (Important)

* ❌ Never return OTP in API response (remove in production)
* ✅ Hash OTP before saving to DB
* ✅ Add rate-limiting for OTP endpoints
* ✅ Rotate logs in production
* ✅ Use App Password for Gmail SMTP

---

## 📦 Tech Stack

* Node.js
* Express.js
* Nodemailer
* Handlebars
* Morgan
* dotenv

---

## 🚀 Production Improvements (Optional)

* Add OTP verification API
* Add rate limiting (`express-rate-limit`)
* Use PM2 for process management
* Use SendGrid / AWS SES
* Add Docker support
* Add CI/CD pipeline

---

## 👨‍💻 Author

**Ashish**

---

## 📄 License

MIT License

```

---

If you want, I can also:
- Add **badges** (Node, License)
- Add **screenshots**
- Add **API docs (Swagger)**
- Make it **open-source ready**

Just tell me 👍
```

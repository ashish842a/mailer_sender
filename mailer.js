const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Verify SMTP
transporter.verify((err) => {
  if (err) console.error("❌ SMTP Error:", err);
  else console.log("✅ SMTP Ready");
});

/**
 * Send normal text/html mail
 */
const sendRawEmail = async ({ to, subject, text, html }) => {
  return transporter.sendMail({
    from: `"My App" <${process.env.SMTP_USER}>`,
    to,
    subject,
    text,
    html,
  });
};

/**
 * Send Handlebars template mail (PRODUCTION SAFE)
 */
const sendTemplateMail = async ({ to, subject, template, context }) => {
  const templatePath = path.join(__dirname, "templates", `${template}.hbs`);
  const source = fs.readFileSync(templatePath, "utf8");
  const compiledTemplate = handlebars.compile(source);
  const html = compiledTemplate(context);

  return transporter.sendMail({
    from: `"My App" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
  });
};

module.exports = {
  sendRawEmail,
  sendTemplateMail,
};

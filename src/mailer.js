import nodemailer from 'nodemailer'

const from = '"Auth React App" <info@auth.com>'

function setup() {
  return nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "a74850ba9afaa1",
      pass: "573fc6c97b991f"
    }
  });
}

export function sendConfirmationEmail(user) {
  const transport = setup()
  const email = {
    to: user.email,
    subject: "Welcome To Auth React App",
    text: `
      Please Confirm your email

      ${user.generateConfirmationUrl()}
    `
  }

  transport.sendMail(email)
}
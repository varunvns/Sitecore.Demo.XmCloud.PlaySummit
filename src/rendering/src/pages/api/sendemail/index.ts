import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

const email = process.env.Mail;
const pass = process.env.Mail_Key;

type Data = {
  message?: string;
  error?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const data = req.body;

    // Hardcoded email details
    const toAddress = [
      'vshringarpure@horizontalintegration.com',
      'ataylor@horizontal.com',
      'jvadher@horizontal.com',
      'saad.khan@horizontal.com',
      'vthakur@horizontal.com',
    ];
    // const toAddress = 'kunalghlp@gmail.com';

    let subject = '';
    let text = '';
    //If horizontal user fill the form then this function will trigger
    const StatusCheck = async (api?: string) =>
      await axios
        .post(api as string, {
          method: 'POST',
          email: data.email,
          message: data.message,
        })
        .then((response) => {
          if (response.status === 200) {
            subject = 'Enquiry from New Prospect';
            text = `
  <p>Hi Andy,</p>
  <p>
    We have received an enquiry from a prospect with email 
    <a href="mailto:${data.email}">${data.email}</a> and DP World AI 
   <strong> ${
     response.data.result ? 'has qualified' : 'has not qualified'
   }</strong> it with the below reason:
  </p>
  <p>${response.data.reason}</p>
  <p>Details submitted via Contact Us are:</p>
  <ul>
    <li><strong>First Name:</strong> ${data.firstname}</li>
    <li><strong>Last Name:</strong> ${data.surname}</li>
    <li><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></li>
    <li><strong>Phone Number:</strong> ${data.phone}</li>
    <li><strong>Country:</strong> ${data.country}</li>
    <li><strong>Message:</strong> ${data.message}</li>
  </ul>
  <p>Best,<br><strong>DP World AI</strong></p>
`;
          }
        });

    if (data.email.includes('saad.khan@horizontal.com')) {
      subject = 'Enquiry from Existing User';
      text = ` <p>Hi Andy,</p>
  <p>
    We have received an enquiry from an existing customer from the US with email 
    <a href="mailto:${data.email}">${data.email}</a>. Our record shows they have availed Freight Forwarding services before.
  </p>
  <p>Best,<br>DP World AI</p>
`;
    } else {
      await StatusCheck('https://lead-qualifier-gamma.vercel.app/api/completion');
    }

    console.log(req);

    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth: {
          user: email, // email address
          pass: pass, // app password
        },
      });

      await transporter.sendMail({
        from: email,
        to: toAddress,
        subject: subject,
        html: text,
      });
      console.log('Email sent successfully'); // Log on success
      res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
      console.error('Error sending email:', error); // Log the error
      res.status(500).json({ error: 'Failed to send email.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

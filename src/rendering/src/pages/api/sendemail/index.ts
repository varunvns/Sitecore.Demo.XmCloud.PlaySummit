/* eslint-disable */
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { useState } from 'react';

const email = process.env.Mail;
const pass = process.env.Mail_Key;
const [SendEmail, setSendEmail] = useState(false);

type Data = {
  message?: string;
  error?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    // Hardcoded email details
    const data = req.body;
    console.log('Data Email : ', data.email);
    // const toAddress = 'vthakur@horizontal.com';
    // const toAddress = 'kunalghlp@gmail.com';
    const toAddress = data.email;
    const subject = 'Test Email';
    let text = '';
    if (!data.email.includes('saad.khan@horizontal.com')) {
      axios.get('https://testapi-pied-gamma.vercel.app/api/testing').then((response) => {
        if (response.status === 200) {
          text =
            `Hi M,
We have received an enquiry from a prospect with email ` +
            data.email +
            ` and DP World AI <has qualified | has not qualified> it with below reason.
Message:- ` +
            data.message +
            `
Best
DP World AI`;
          console.log('Request was successful:', response.data);
          setSendEmail(true);
        }
      });
    } else {
      text =
        `Hi M,
We have received an enquiry from an existing customer from the US with email ` +
        data.email +
        `. Our record shows they have availed Freight Forwarding services before.
Best
DP World AI`;
      setSendEmail(true);
    }

    console.log(req);

    try {
      const transporter =
        SendEmail &&
        nodemailer.createTransport({
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
        text: text,
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

import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

const email = process.env.Mail;
const pass = process.env.Mail_Key;

type Data = {
  message?: string;
  error?: string;
};

type ResponseProps = {
  success?: boolean;
  message?: string;
  status?: number;
  result?: boolean;
  reason?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const data = req.body;

    // Hardcoded email details
    const toAddress = ['vshringarpure@horizontalintegration.com', 'vthakur@horizontal.com'];
    const ccAddress = 'vikassinghv34@gmail.com';
    // const toAddress = 'kunalghlp@gmail.com';

    let subject = '';
    let text = '';
    const mail = 'mailto:' + data.email;
    //If horizontal user fill the form then this function will trigger
    const StatusCheck = async (api?: string) =>
      await axios.get(api as string).then((response: ResponseProps) => {
        if (response.status === 200) {
          subject = 'Enquiry from New Prospect';
          text =
            `Hi Andy,
We have received an enquiry from a prospect with email mailto:` +
            mail +
            ` and DP World AI ${
              response.success ? 'has qualified' : 'has not qualified'
            } it with below reason.
` +
            data.message +
            `
Details submitted via Contact Us are:-

First Name: ` +
            data.firstname +
            `
            Last Name: ` +
            data.surname +
            `Email: ` +
            mail +
            `Phone Number: ` +
            data.phone +
            `Country: ` +
            data.country +
            `Message: ` +
            data.message +
            `

Best
DP World AI`;
        }
      });

    if (data.email.includes('saad.khan@horizontal.com')) {
      subject = 'Enquiry from Existing User';
      text =
        `Hi Andy,
        
We have received an enquiry from an existing customer from the US with email mailto:` +
        mail +
        `. Our record shows they have availed Freight Forwarding services before.
Best
DP World AI`;
    } else {
      // if (data.email.includes('@horizontal.com')) {
      //   await StatusCheck('https://testapi-pied-gamma.vercel.app/api/completion');
      // } else {
      await StatusCheck('https://testapi-pied-gamma.vercel.app/api/completion');
      // }
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
        cc: ccAddress,
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

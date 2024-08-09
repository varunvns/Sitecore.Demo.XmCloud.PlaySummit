import type { NextApiRequest, NextApiResponse } from 'next';
import sendgrid from '@sendgrid/mail';
// type ResponseData = {
//   message: string;
// };

sendgrid.setApiKey(process.env.SENDGRID_API_KEY as string);

type Data = {
  message?: string;
  error?: string;
};
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  console.log(req);
  // const data = req.body;
  if (req.method === 'POST') {
    // console.log('Email data:', data.email);
    // res.status(200).json({ message: `Email received: ${data.email}` });
    const fromAddress = 'kgholap@horizontal.com';
    const toAddress = 'vthakur@horizontal.com';
    const subject = 'Test Email';
    const text = `Hey Vikas, This is a test email sent from Kunal for DP World POC work.\n Test Form email:- testing`;
    try {
      await sendgrid.send({
        from: fromAddress,
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
    res.status(400).json({ message: 'Email not found in the request body' });
  }
}

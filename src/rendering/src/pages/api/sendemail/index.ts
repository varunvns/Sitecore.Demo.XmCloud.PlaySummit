/* eslint-disable */
import type { NextApiRequest, NextApiResponse } from 'next';
import sendgrid from '@sendgrid/mail';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY as string);

type Data = {
  message?: string;
  error?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    // Hardcoded email details
    const data = req.body;
    console.log('Data Email : ', data.email);
    const fromAddress = 'kgholap@horizontal.com';
    const toAddress = 'kunalghlp@gmail.com';
    const subject = 'Test Email';
    let text = '';

    if (data.email.includes('saad.khan@horizontal.com')) {
      text =
        `Hi M,
We have received an enquiry from an existing customer from the US with email ` +
        data.email +
        `. Our record shows they have availed Freight Forwarding services before.
Best
DP World AI`;
    } else {
      try {
        // New API Call
        const apiResponse = await fetch('/api/sendemaildummy', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          // body: JSON.stringify({ email: data.email }),
        });

        const apiData = await apiResponse.json(); // Rename the second 'data' variable to 'apiData'
        console.log('Data : ', apiResponse);

        if (apiResponse.ok) {
          console.log(apiData.message);
        } else {
          console.log(apiData.error);
        }
      } catch (error) {
        console.log('An error occurred while sending the email.');
      }
    }

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
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

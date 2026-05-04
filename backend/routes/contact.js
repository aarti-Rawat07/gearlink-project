const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Inquiry = require('../models/Inquiry');

const smtpConfig = {
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
};

const transporter = nodemailer.createTransport(smtpConfig);
const EMAIL_FROM = process.env.EMAIL_FROM || process.env.SMTP_USER || 'no-reply@gearlink.com';

const sendEmail = async ({ to, subject, text, html }) => {
  if (!smtpConfig.host || !smtpConfig.auth.user || !smtpConfig.auth.pass) {
    console.warn('SMTP is not configured. Email will not be sent.');
    return;
  }

  await transporter.sendMail({
    from: EMAIL_FROM,
    to,
    subject,
    text,
    html,
  });
};

const sendIncomingConfirmation = async (inquiry) => {
  const subject = 'GearLink enquiry received';
  const text = `Hello ${inquiry.name || 'Customer'},\n\n` +
    `We have received your enquiry and will get back to you soon.\n\n` +
    `Your message:\n${inquiry.message}\n\n` +
    `Thank you for contacting GearLink.`;

  const html = `<p>Hello ${inquiry.name || 'Customer'},</p>` +
    `<p>We have received your enquiry and will get back to you soon.</p>` +
    `<p><strong>Your message:</strong><br/>${inquiry.message}</p>` +
    `<p>Thank you for contacting GearLink.</p>`;

  await sendEmail({ to: inquiry.email, subject, text, html });
};

const sendReplyEmail = async (inquiry) => {
  const subject = 'GearLink enquiry reply';
  const text = `Hello ${inquiry.name || 'Customer'},\n\n` +
    `Our support team has replied to your enquiry.\n\n` +
    `Reply:\n${inquiry.reply}\n\n` +
    `If you need anything else, please respond to this message.`;

  const html = `<p>Hello ${inquiry.name || 'Customer'},</p>` +
    `<p>Our support team has replied to your enquiry.</p>` +
    `<p><strong>Reply:</strong><br/>${inquiry.reply}</p>` +
    `<p>If you need anything else, please respond to this message.</p>`;

  await sendEmail({ to: inquiry.email, subject, text, html });
};

router.post('/', async (req, res) => {
  try {
    const { name, email, mobile, city, message, form } = req.body;

    if (!email || !message) {
      return res.status(400).json({ error: 'Please provide an email and a message.' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const inquiry = await Inquiry.create({
      name,
      email: normalizedEmail,
      mobile,
      city,
      message,
      form: form || 'contact',
    });

    console.log('Contact submission received:', {
      id: inquiry._id,
      form: inquiry.form,
      name: inquiry.name,
      email: inquiry.email,
      mobile: inquiry.mobile,
      city: inquiry.city,
      message: inquiry.message,
    });

    try {
      await sendIncomingConfirmation(inquiry);
    } catch (mailError) {
      console.error('Error sending confirmation email:', mailError);
    }

    return res.status(201).json({ message: 'Thank you! Your enquiry has been received. We will contact you soon.' });
  } catch (error) {
    console.error('Contact submission error:', error);
    return res.status(500).json({ error: 'Unable to save your enquiry. Please try again later.' });
  }
});

router.get('/', async (req, res) => {
  try {
    const { email } = req.query;
    const filter = {};
    if (email) {
      filter.email = email.toLowerCase().trim();
    }
    const inquiries = await Inquiry.find(filter).sort({ createdAt: -1 });
    return res.json(inquiries);
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return res.status(500).json({ error: 'Unable to fetch inquiries.' });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { status, reply } = req.body;
    const update = {};
    if (status) update.status = status;
    if (reply !== undefined) update.reply = reply;
    if (status === 'Replied' && reply === undefined) update.reply = '';

    const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!inquiry) {
      return res.status(404).json({ error: 'Inquiry not found.' });
    }

    if (reply) {
      try {
        await sendReplyEmail(inquiry);
      } catch (mailError) {
        console.error('Error sending reply email:', mailError);
      }
    }

    return res.json(inquiry);
  } catch (error) {
    console.error('Error updating inquiry:', error);
    return res.status(500).json({ error: 'Unable to update inquiry.' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ error: 'Inquiry not found.' });
    }
    return res.json({ message: 'Inquiry deleted successfully.' });
  } catch (error) {
    console.error('Error deleting inquiry:', error);
    return res.status(500).json({ error: 'Unable to delete inquiry.' });
  }
});

module.exports = router;

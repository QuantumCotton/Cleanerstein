import nodemailer from 'nodemailer';

interface FormEvent {
  httpMethod: string;
  body: string;
}

interface ApiResponse {
  statusCode: number;
  body: string;
}

exports.handler = async (event: FormEvent): Promise<ApiResponse> => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const formData = event.body ? JSON.parse(event.body) : {};
    const formName = formData['form-name'] || 'unknown';
    
    console.log(`Form submission received: ${formName}`, formData);

    // Create email content
    let emailContent = `SERVICE PARTNER APPLICATION - Elite Service Hub\n`;
    emailContent += `================================================\n\n`;

    Object.entries(formData).forEach(([key, value]) => {
      if (key !== 'form-name' && key !== 'bot-field') {
        const label = key.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase());
        const printableValue = Array.isArray(value) ? value.join(', ') : (value || '—');
        emailContent += `${label}: ${printableValue}\n`;
      }
    });

    emailContent += `\n\nSubmitted: ${new Date().toLocaleString()}`;

    // Send email using SMTP
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'noreply@theeliteservicehub.com',
      to: process.env.LEAD_EMAIL_TO || 'chris@theeliteservicehub.com',
      subject: `New Service Partner Application - ${formData['business-name'] || 'Unknown'}`,
      text: emailContent,
      replyTo: formData.email || '',
    });

    console.log('Email sent successfully');

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Form submitted successfully',
        redirectTo: '/thanks.html',
      }),
    };
  } catch (error) {
    console.error('Form submission error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to process form' }),
    };
  }
};

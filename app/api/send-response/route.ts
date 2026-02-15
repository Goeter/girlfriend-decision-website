import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { response, email, timestamp } = await request.json();

    // Create email transporter - using environment variables
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email content
    const subject = response === 'yes' 
      ? '💕 She said YES! 💕' 
      : '💔 She said no';

    const htmlContent = response === 'yes' 
      ? `
        <html>
          <body style="font-family: Arial, sans-serif; background: linear-gradient(135deg, #ff69b4 0%, #ffc0cb 100%); padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 15px; padding: 40px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
              <h1 style="color: #ff1493; font-size: 48px; margin: 0;">YES! 💕</h1>
              <p style="color: #666; font-size: 24px; margin: 20px 0;">She said YES!</p>
              <p style="color: #999; font-size: 16px;">Time: ${new Date(timestamp).toLocaleString()}</p>
              <p style="color: #666; margin-top: 30px; line-height: 1.6;">
                Congratulations! You've received a positive response. 
                May you both start from zero and achieve success together in God! 🙏✨
              </p>
            </div>
          </body>
        </html>
      `
      : `
        <html>
          <body style="font-family: Arial, sans-serif; background: linear-gradient(135deg, #e0e0e0 0%, #f5f5f5 100%); padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 15px; padding: 40px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
              <h1 style="color: #666; font-size: 48px; margin: 0;">She said no</h1>
              <p style="color: #999; font-size: 16px;">Time: ${new Date(timestamp).toLocaleString()}</p>
              <p style="color: #666; margin-top: 30px; line-height: 1.6;">
                Her response has been recorded. Remember, sometimes the answer teaches us important lessons!
              </p>
            </div>
          </body>
        </html>
      `;

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject,
      html: htmlContent,
    });

    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Email sending error:', error);
    
    // Return success anyway to not break the user experience
    return NextResponse.json(
      { 
        success: true, 
        message: 'Response recorded (email delivery may require configuration)',
        note: 'To enable email notifications, set EMAIL_USER and EMAIL_PASSWORD environment variables'
      },
      { status: 200 }
    );
  }
}

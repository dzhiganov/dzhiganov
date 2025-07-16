import crypto from 'crypto';
import { MongoClient } from 'mongodb';
import { Resend } from 'resend';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Rate limiting store (in production, use Redis)
const rateLimitStore = new Map();

// MongoDB connection
let cachedClient: MongoClient | null = null;

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  const client = new MongoClient(
    process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio',
  );
  await client.connect();
  cachedClient = client;
  return client;
}

// Rate limiting function
function checkRateLimit(email: string): boolean {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 3;

  if (!rateLimitStore.has(email)) {
    rateLimitStore.set(email, { count: 1, resetTime: now + windowMs });
    return true;
  }

  const userLimit = rateLimitStore.get(email);

  if (now > userLimit.resetTime) {
    rateLimitStore.set(email, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (userLimit.count >= maxRequests) {
    return false;
  }

  userLimit.count++;
  return true;
}

// Email validation
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Send email using Resend
async function sendDownloadEmail(
  email: string,
  token: string,
  videoTitle: string,
) {
  const downloadUrl = `${process.env.NUXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/download/${token}`;

  try {
    const { data, error } = await resend.emails.send({
      from: 'Dmitriy Zhiganov <noreply@dzhiganov.dev>',
      to: [email],
      subject: `Download Materials for "${videoTitle}"`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Download Materials</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f8f9fa;
            }
            .container {
              background: white;
              border-radius: 8px;
              padding: 40px;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            .logo {
              font-size: 24px;
              font-weight: bold;
              color: #efbcd5;
              margin-bottom: 10px;
            }
            .title {
              font-size: 28px;
              font-weight: bold;
              color: #2e294e;
              margin-bottom: 10px;
            }
            .subtitle {
              color: #666;
              font-size: 16px;
            }
            .content {
              margin: 30px 0;
            }
            .video-info {
              background: #f8f9fa;
              border-left: 4px solid #efbcd5;
              padding: 15px 20px;
              margin: 20px 0;
              border-radius: 4px;
            }
            .video-title {
              font-weight: 600;
              color: #2e294e;
              margin-bottom: 5px;
            }
            .download-button {
              display: inline-block;
              background: #efbcd5;
              color: #2e294e;
              padding: 15px 30px;
              text-decoration: none;
              border-radius: 6px;
              font-weight: 600;
              margin: 20px 0;
              text-align: center;
            }
            .download-button:hover {
              background: #e5a8c9;
            }
            .features {
              margin: 30px 0;
            }
            .feature {
              display: flex;
              align-items: center;
              margin: 10px 0;
              color: #555;
            }
            .checkmark {
              color: #efbcd5;
              margin-right: 10px;
              font-weight: bold;
            }
            .footer {
              margin-top: 40px;
              padding-top: 20px;
              border-top: 1px solid #eee;
              text-align: center;
              color: #666;
              font-size: 14px;
            }
            .warning {
              background: #fff3cd;
              border: 1px solid #ffeaa7;
              color: #856404;
              padding: 15px;
              border-radius: 4px;
              margin: 20px 0;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">Dmitriy Zhiganov</div>
              <h1 class="title">Your Tutorial Materials Are Ready!</h1>
              <p class="subtitle">Thank you for your interest in my content</p>
            </div>

            <div class="content">
              <p>Hi there!</p>
              
              <p>Thank you for requesting the materials for my tutorial. I'm excited to help you on your coding journey!</p>

              <div class="video-info">
                <div class="video-title">Tutorial: ${videoTitle}</div>
                <div>Complete source code, project files, and additional resources included</div>
              </div>

              <div style="text-align: center;">
                <a href="${downloadUrl}" class="download-button">
                  📥 Download Materials
                </a>
              </div>

              <div class="features">
                <h3 style="color: #2e294e; margin-bottom: 15px;">What's included:</h3>
                <div class="feature">
                  <span class="checkmark">✓</span>
                  Complete source code with comments
                </div>
                <div class="feature">
                  <span class="checkmark">✓</span>
                  Project files and assets
                </div>
                <div class="feature">
                  <span class="checkmark">✓</span>
                  Setup instructions and documentation
                </div>
                <div class="feature">
                  <span class="checkmark">✓</span>
                  Additional resources and links
                </div>
              </div>

              <div class="warning">
                <strong>Important:</strong> This download link expires in 24 hours and can only be used once. Please download all files immediately.
              </div>

              <p>If you have any questions or run into issues, feel free to reach out to me at <a href="mailto:hey@dimazhiganov.dev" style="color: #efbcd5;">hey@dimazhiganov.dev</a></p>

              <p>Happy coding!<br>
              <strong>Dmitriy Zhiganov</strong><br>
              Senior Software Engineer</p>
            </div>

            <div class="footer">
              <p>You received this email because you requested tutorial materials from zhiganov.dev</p>
              <p>If you didn't request this, you can safely ignore this email.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Hi there!

Thank you for requesting the materials for "${videoTitle}".

Click the link below to download your materials:
${downloadUrl}

What's included:
• Complete source code with comments
• Project files and assets  
• Setup instructions and documentation
• Additional resources and links

Important: This link expires in 24 hours and can only be used once.

If you have any questions, reach out to me at hey@dimazhiganov.dev

Happy coding!
Dmitriy Zhiganov
Senior Software Engineer
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      throw new Error('Failed to send email');
    }

    console.log('Email sent successfully:', data);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

export default defineEventHandler(async (event) => {
  if (event.node.req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const body = await readBody(event);
    const { email, videoId, videoTitle, newsletter } = body;

    // Validate input
    if (!email || !videoId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Email and video ID are required',
      });
    }

    if (!isValidEmail(email)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid email format',
      });
    }

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured');
      throw createError({
        statusCode: 500,
        statusMessage: 'Email service not configured',
      });
    }

    // Check rate limiting
    if (!checkRateLimit(email)) {
      throw createError({
        statusCode: 429,
        statusMessage: 'Too many requests. Please try again in 15 minutes.',
      });
    }

    // Connect to database
    const client = await connectToDatabase();
    const db = client.db('portfolio');
    const collection = db.collection('download_tokens');

    // Generate secure token
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Store token in database
    await collection.insertOne({
      token,
      email,
      videoId,
      videoTitle: videoTitle || 'Tutorial Materials',
      newsletter: newsletter || false,
      expiresAt,
      used: false,
      createdAt: new Date(),
      ipAddress: getClientIP(event),
    });

    // Send email using Resend
    await sendDownloadEmail(
      email,
      token,
      videoTitle || 'Tutorial Materials',
      videoId,
    );

    // If user opted for newsletter, store their preference
    if (newsletter) {
      const newsletterCollection = db.collection('newsletter_subscribers');
      await newsletterCollection.updateOne(
        { email },
        {
          $set: {
            email,
            subscribedAt: new Date(),
            source: 'materials_download',
            active: true,
          },
        },
        { upsert: true },
      );
    }

    return {
      success: true,
      message: 'Download link sent to your email',
    };
  } catch (error) {
    console.error('Error in materials request:', error);

    if (error.statusCode) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
    });
  }
});

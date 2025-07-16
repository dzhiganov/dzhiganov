import { MongoClient } from 'mongodb'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// MongoDB connection
let cachedClient: MongoClient | null = null

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient
  }

  const client = new MongoClient(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio')
  await client.connect()
  cachedClient = client
  return client
}

// Email validation
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Send welcome email
async function sendWelcomeEmail(email: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Dmitriy Zhiganov <noreply@zhiganov.dev>',
      to: [email],
      subject: 'Welcome to my newsletter! 🚀',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to the Newsletter</title>
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
            .content {
              margin: 30px 0;
              color: #555;
            }
            .feature {
              display: flex;
              align-items: center;
              margin: 15px 0;
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
            .unsubscribe {
              color: #999;
              text-decoration: none;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">Dmitriy Zhiganov</div>
              <h1 class="title">Welcome to the Newsletter! 🚀</h1>
            </div>

            <div class="content">
              <p>Hi there!</p>
              
              <p>Thank you for subscribing to my newsletter! I'm excited to share my latest content and insights with you.</p>

              <p>Here's what you can expect:</p>

              <div class="feature">
                <span class="checkmark">✓</span>
                Latest coding tutorials and web development tips
              </div>
              <div class="feature">
                <span class="checkmark">✓</span>
                Behind-the-scenes content from my projects
              </div>
              <div class="feature">
                <span class="checkmark">✓</span>
                Early access to new courses and materials
              </div>
              <div class="feature">
                <span class="checkmark">✓</span>
                Industry insights and career advice
              </div>

              <p>I typically send updates 1-2 times per month, so you won't be overwhelmed with emails.</p>

              <p>If you have any questions or suggestions for topics you'd like me to cover, feel free to reply to this email!</p>

              <p>Happy coding!<br>
              <strong>Dmitriy Zhiganov</strong><br>
              Senior Software Engineer</p>
            </div>

            <div class="footer">
              <p>You're receiving this because you subscribed to updates from zhiganov.dev</p>
              <a href="${process.env.NUXT_PUBLIC_BASE_URL}/unsubscribe?email=${encodeURIComponent(email)}" class="unsubscribe">
                Unsubscribe
              </a>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Hi there!

Thank you for subscribing to my newsletter! I'm excited to share my latest content and insights with you.

Here's what you can expect:
• Latest coding tutorials and web development tips
• Behind-the-scenes content from my projects  
• Early access to new courses and materials
• Industry insights and career advice

I typically send updates 1-2 times per month, so you won't be overwhelmed with emails.

If you have any questions or suggestions for topics you'd like me to cover, feel free to reply to this email!

Happy coding!
Dmitriy Zhiganov
Senior Software Engineer

---
You're receiving this because you subscribed to updates from zhiganov.dev
Unsubscribe: ${process.env.NUXT_PUBLIC_BASE_URL}/unsubscribe?email=${encodeURIComponent(email)}
      `
    })

    if (error) {
      console.error('Resend error:', error)
      throw new Error('Failed to send welcome email')
    }

    console.log('Welcome email sent successfully:', data)
    return true
  } catch (error) {
    console.error('Error sending welcome email:', error)
    throw error
  }
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { email } = body

    // Validate input
    if (!email) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Email is required'
      })
    }

    if (!isValidEmail(email)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid email format'
      })
    }

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured')
      throw createError({
        statusCode: 500,
        statusMessage: 'Email service not configured'
      })
    }

    // Connect to database
    const client = await connectToDatabase()
    const db = client.db('portfolio')
    const collection = db.collection('newsletter_subscribers')

    // Check if already subscribed
    const existingSubscriber = await collection.findOne({ email })
    
    if (existingSubscriber && existingSubscriber.active) {
      return {
        success: true,
        message: 'Already subscribed to newsletter',
        alreadySubscribed: true
      }
    }

    // Subscribe or reactivate
    await collection.updateOne(
      { email },
      { 
        $set: { 
          email,
          subscribedAt: new Date(),
          source: 'direct_signup',
          active: true,
          reactivatedAt: existingSubscriber ? new Date() : undefined
        }
      },
      { upsert: true }
    )

    // Send welcome email only for new subscribers
    if (!existingSubscriber) {
      await sendWelcomeEmail(email)
    }

    return {
      success: true,
      message: 'Successfully subscribed to newsletter'
    }

  } catch (error) {
    console.error('Error in newsletter subscription:', error)
    
    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    })
  }
})
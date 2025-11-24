import { NextRequest, NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'

// Initialize SendGrid
const apiKey = process.env.SENDGRID_API_KEY
if (apiKey) {
  sgMail.setApiKey(apiKey)
}

export async function POST(request: NextRequest) {
  try {
    // Check if SendGrid is configured
    if (!apiKey) {
      return NextResponse.json(
        { error: 'SendGrid is not configured' },
        { status: 500 }
      )
    }

    const contactEmail = process.env.CONTACT_EMAIL
    if (!contactEmail) {
      return NextResponse.json(
        { error: 'Contact email is not configured' },
        { status: 500 }
      )
    }

    // Parse request body
    const body = await request.json()
    const { firstname, lastname, phone, email, description } = body

    // Validate required fields
    if (!firstname || !lastname || !phone || !email || !description) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Prepare email
    const msg = {
      to: contactEmail,
      from: process.env.SENDGRID_FROM_EMAIL || contactEmail,
      subject: `Nowa wiadomość kontaktowa od ${firstname} ${lastname}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #253551;">Nowa wiadomość kontaktowa</h2>

          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Imię:</strong> ${firstname}</p>
            <p style="margin: 10px 0;"><strong>Nazwisko:</strong> ${lastname}</p>
            <p style="margin: 10px 0;"><strong>Telefon:</strong> ${phone}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
          </div>

          <div style="margin: 20px 0;">
            <h3 style="color: #253551;">Wiadomość:</h3>
            <p style="white-space: pre-wrap;">${description}</p>
          </div>
        </div>
      `,
      text: `
Nowa wiadomość kontaktowa

Imię: ${firstname}
Nazwisko: ${lastname}
Telefon: ${phone}
Email: ${email}

Wiadomość:
${description}
      `,
    }

    // Send email
    await sgMail.send(msg)

    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('SendGrid error:', error)

    // Return more specific error if available
    if (error.response) {
      console.error('SendGrid response error:', error.response.body)
    }

    return NextResponse.json(
      { error: 'Failed to send email', details: error.message },
      { status: 500 }
    )
  }
}

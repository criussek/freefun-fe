import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Check if Sender.net is configured
    const apiKey = process.env.SENDER_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Sender.net is not configured' },
        { status: 500 }
      )
    }

    const contactEmail = process.env.CONTACT_EMAIL
    const fromEmail = process.env.EMAIL_DEFAULT_FROM || 'services@3fun.pl'
    const replyToEmail = process.env.EMAIL_DEFAULT_REPLYTO || fromEmail

    if (!contactEmail) {
      return NextResponse.json(
        { error: 'Contact email is not configured' },
        { status: 500 }
      )
    }

    // Parse request body
    const body = await request.json()
    const { firstname, lastname, phone, email, description, turnstileToken } = body

    // Validate required fields
    if (!firstname || !lastname || !phone || !email || !description) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Verify Turnstile token
    if (!turnstileToken) {
      return NextResponse.json(
        { error: 'Bot verification required' },
        { status: 400 }
      )
    }

    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY
    if (!turnstileSecret) {
      return NextResponse.json(
        { error: 'Turnstile is not configured' },
        { status: 500 }
      )
    }

    // Verify the token with Cloudflare
    const turnstileResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secret: turnstileSecret,
        response: turnstileToken,
      }),
    })

    const turnstileResult = await turnstileResponse.json()

    if (!turnstileResult.success) {
      return NextResponse.json(
        { error: 'Bot verification failed' },
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

    // Prepare email payload for Sender.net API (transactional email)
    const emailPayload = {
      from: {
        email: fromEmail,
        name: '3FUN - Formularz Kontaktowy'
      },
      to: {
        email: contactEmail,
        name: contactEmail.split('@')[0]
      },
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

          <hr style="margin: 30px 0; border: 0; height: 1px; background: #eee;">
          <p style="color: #999; font-size: 12px; text-align: center;">
            <strong>3FUN</strong><br>
            Wynajem kamperów i pojazdów rekreacyjnych<br>
            kontakt@3fun.pl
          </p>
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
      `
    }

    // Send email via Sender.net transactional API
    const response = await fetch('https://api.sender.net/v2/message/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(emailPayload)
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('Sender.net API error:', response.status, errorData)
      throw new Error(`Sender.net API returned ${response.status}`)
    }

    const result = await response.json()
    console.log('Email sent successfully via Sender.net:', result)

    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Sender.net error:', error)

    return NextResponse.json(
      { error: 'Failed to send email', details: error.message },
      { status: 500 }
    )
  }
}

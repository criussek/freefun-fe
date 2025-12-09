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

    const newsletterGroupId = process.env.NEWSLETTER_GROUP_ID
    if (!newsletterGroupId) {
      return NextResponse.json(
        { error: 'Newsletter group ID is not configured' },
        { status: 500 }
      )
    }

    // Parse request body
    const body = await request.json()
    const { firstname, lastname, email } = body

    // Validate required fields
    if (!firstname || !lastname || !email) {
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

    // Prepare subscriber payload for Sender.net API
    const subscriberPayload = {
      email,
      firstname,
      lastname,
      groups: [newsletterGroupId],
      trigger_automation: false // Don't trigger automation emails on signup
    }

    // Add subscriber via Sender.net API
    const response = await fetch('https://api.sender.net/v2/subscribers', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(subscriberPayload)
    })

    const result = await response.json()

    if (!response.ok) {
      console.error('Sender.net API error:', response.status, result)

      // Check if subscriber already exists (typically 422 error)
      if (response.status === 422 && result.message?.includes('already exists')) {
        return NextResponse.json(
          { success: true, message: 'Already subscribed' },
          { status: 200 }
        )
      }

      throw new Error(`Sender.net API returned ${response.status}`)
    }

    console.log('Newsletter subscriber added successfully:', result)

    return NextResponse.json(
      { success: true, message: 'Successfully subscribed to newsletter' },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Newsletter signup error:', error)

    return NextResponse.json(
      { error: 'Failed to subscribe to newsletter', details: error.message },
      { status: 500 }
    )
  }
}

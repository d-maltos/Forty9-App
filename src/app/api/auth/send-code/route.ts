import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { 
  generateVerificationCode, 
  formatPhoneNumber, 
  isValidPhoneNumber, 
  sendVerificationSMS,
  isAlaskaPhoneNumber 
} from '@/lib/sms'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber, alaskaZipCode } = await request.json()

    if (!phoneNumber) {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      )
    }

    const formattedPhone = formatPhoneNumber(phoneNumber)

    if (!isValidPhoneNumber(formattedPhone)) {
      return NextResponse.json(
        { error: 'Please enter a valid phone number' },
        { status: 400 }
      )
    }

    // Prefer Alaska phone numbers but allow others with zip code verification
    if (!isAlaskaPhoneNumber(formattedPhone)) {
      if (!alaskaZipCode || !/^99[0-9]{3}$/.test(alaskaZipCode)) {
        return NextResponse.json(
          { error: 'Non-Alaska phone numbers require a valid Alaska zip code (99xxx)' },
          { status: 400 }
        )
      }
    }

    // Check if user already exists
    let user = await prisma.user.findUnique({
      where: { phoneNumber: formattedPhone }
    })

    const verificationCode = generateVerificationCode()
    const verificationExpires = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes

    if (user) {
      // Update existing user with new verification code
      await prisma.user.update({
        where: { id: user.id },
        data: {
          verificationCode,
          verificationExpires,
          alaskaZipCode: alaskaZipCode || user.alaskaZipCode,
        }
      })
    } else {
      // Create new user
      const anonymousId = `anon_${Math.random().toString(36).substring(2, 15)}`
      user = await prisma.user.create({
        data: {
          phoneNumber: formattedPhone,
          anonymousId,
          alaskaZipCode,
          verificationCode,
          verificationExpires,
          isVerified: false,
        }
      })
    }

    // Send SMS
    const smsSent = await sendVerificationSMS(formattedPhone, verificationCode)

    if (!smsSent) {
      return NextResponse.json(
        { error: 'Failed to send verification code. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'Verification code sent successfully',
      userId: user.id,
      isAlaskaNumber: isAlaskaPhoneNumber(formattedPhone)
    })

  } catch (error) {
    console.error('Send code error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}

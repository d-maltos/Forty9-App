import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const { userId, verificationCode } = await request.json()

    if (!userId || !verificationCode) {
      return NextResponse.json(
        { error: 'User ID and verification code are required' },
        { status: 400 }
      )
    }

    // Find user with matching verification code
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
        verificationCode: verificationCode.toString(),
        verificationExpires: {
          gt: new Date() // Code hasn't expired
        }
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid or expired verification code' },
        { status: 400 }
      )
    }

    // Verify the user and clear verification code
    const verifiedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        verificationCode: null,
        verificationExpires: null,
        lastActiveAt: new Date(),
      }
    })

    // Return user data (without sensitive info)
    return NextResponse.json({
      user: {
        id: verifiedUser.id,
        anonymousId: verifiedUser.anonymousId,
        isVerified: verifiedUser.isVerified,
        karma: verifiedUser.karma,
        displayName: verifiedUser.displayName,
      }
    })

  } catch (error) {
    console.error('Verify code error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}

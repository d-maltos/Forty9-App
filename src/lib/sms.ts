import twilio from 'twilio'

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER

if (!accountSid || !authToken || !twilioPhoneNumber) {
  console.warn('Twilio credentials not configured. SMS verification will be simulated.')
}

const client = accountSid && authToken ? twilio(accountSid, authToken) : null

export function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export function formatPhoneNumber(phone: string): string {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '')
  
  // Add +1 if it's a 10-digit US number
  if (digits.length === 10) {
    return `+1${digits}`
  }
  
  // Add + if it doesn't start with it
  if (digits.length > 10 && !digits.startsWith('1')) {
    return `+${digits}`
  }
  
  if (digits.length === 11 && digits.startsWith('1')) {
    return `+${digits}`
  }
  
  return `+${digits}`
}

export function isValidPhoneNumber(phone: string): boolean {
  const formatted = formatPhoneNumber(phone)
  // Basic validation for US/Canada numbers (+1 followed by 10 digits)
  return /^\+1[0-9]{10}$/.test(formatted)
}

export async function sendVerificationSMS(phoneNumber: string, code: string): Promise<boolean> {
  try {
    if (!client || !twilioPhoneNumber) {
      // In development/demo mode, just log the code
      console.log(`SMS Verification Code for ${phoneNumber}: ${code}`)
      return true
    }

    const message = await client.messages.create({
      body: `Your Forty9 verification code is: ${code}. This code expires in 10 minutes.`,
      from: twilioPhoneNumber,
      to: phoneNumber,
    })

    console.log(`SMS sent successfully. SID: ${message.sid}`)
    return true
  } catch (error) {
    console.error('Failed to send SMS:', error)
    return false
  }
}

export function isAlaskaPhoneNumber(phoneNumber: string): boolean {
  const formatted = formatPhoneNumber(phoneNumber)
  // Alaska area code is 907
  return formatted.startsWith('+1907')
}

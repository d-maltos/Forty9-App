# Twilio SMS Setup Guide

This guide will help you set up Twilio for SMS verification in your Forty9 app.

## 1. Create a Twilio Account

1. Go to [https://www.twilio.com](https://www.twilio.com)
2. Sign up for a free account
3. Complete the verification process

## 2. Get Your Twilio Credentials

After signing up, you'll need three pieces of information:

1. **Account SID** - Found on your Twilio Console Dashboard
2. **Auth Token** - Found on your Twilio Console Dashboard (click "Show" to reveal)
3. **Phone Number** - You'll need to get a Twilio phone number

## 3. Get a Twilio Phone Number

1. In the Twilio Console, go to **Phone Numbers** > **Manage** > **Buy a number**
2. Choose a number (US numbers work best for Alaska)
3. Make sure the number has **SMS** capability
4. Purchase the number

## 4. Configure Environment Variables

Create a `.env` file in your project root with:

```env
# Twilio Configuration
TWILIO_ACCOUNT_SID="your_account_sid_here"
TWILIO_AUTH_TOKEN="your_auth_token_here"
TWILIO_PHONE_NUMBER="your_twilio_phone_number_here"
```

**Important**: 
- Replace the placeholder values with your actual Twilio credentials
- The phone number should be in E.164 format (e.g., "+15551234567")
- Never commit your `.env` file to version control

## 5. Test Your Setup

1. Start your development server: `npm run dev`
2. Go to the signup page
3. Enter a phone number and try to send a verification code
4. Check the console logs for any errors

## 6. Development vs Production

### Development Mode
- If Twilio credentials are not configured, the app will log verification codes to the console
- This allows you to test the flow without SMS costs

### Production Mode
- Make sure all Twilio environment variables are properly set
- Consider setting up Twilio's Verify service for additional security features
- Monitor your SMS usage and costs

## 7. Troubleshooting

### Common Issues

**"Failed to send SMS" Error**
- Check that your Twilio credentials are correct
- Verify your Twilio phone number is in E.164 format
- Ensure your Twilio account has sufficient balance

**Phone Number Format Issues**
- The app automatically formats US phone numbers
- Alaska numbers should start with (907)
- International numbers should include country code

**Rate Limiting**
- Twilio has rate limits on SMS sending
- Consider implementing your own rate limiting for production

## 8. Security Best Practices

1. **Environment Variables**: Never hardcode credentials in your code
2. **Rate Limiting**: Implement rate limiting to prevent SMS abuse
3. **Phone Validation**: The app validates phone numbers before sending SMS
4. **Code Expiration**: Verification codes expire after 10 minutes
5. **One-Time Use**: Each verification code can only be used once

## 9. Cost Considerations

- Twilio charges per SMS sent (typically $0.0075 per SMS in the US)
- Monitor your usage in the Twilio Console
- Consider implementing daily/monthly limits for cost control
- Free tier includes some free credits to get started

## 10. Alternative for Development

If you don't want to set up Twilio for development, the app will work in "demo mode":
- Verification codes will be logged to the console
- You can copy the code from the terminal to complete verification
- This is perfect for development and testing

---

For more information, visit the [Twilio SMS Documentation](https://www.twilio.com/docs/sms).

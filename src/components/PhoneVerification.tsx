'use client'

import { useState } from 'react'
import { useAuth } from './AuthProvider'
import { Phone, Shield, MessageCircle, ArrowRight } from 'lucide-react'

interface PhoneVerificationProps {
  onComplete?: () => void
}

export function PhoneVerification({ onComplete }: PhoneVerificationProps) {
  const { sendVerificationCode, verifyCode } = useAuth()
  const [step, setStep] = useState<'phone' | 'verify'>('phone')
  const [formData, setFormData] = useState({
    phoneNumber: '',
    alaskaZipCode: '',
  })
  const [verificationData, setVerificationData] = useState({
    userId: '',
    verificationCode: '',
    isAlaskaNumber: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await sendVerificationCode(
        formData.phoneNumber,
        formData.alaskaZipCode || undefined
      )
      
      setVerificationData({
        ...verificationData,
        userId: result.userId,
        isAlaskaNumber: result.isAlaskaNumber,
      })
      setStep('verify')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send verification code')
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      await verifyCode(verificationData.userId, verificationData.verificationCode)
      onComplete?.()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to verify code')
    } finally {
      setIsLoading(false)
    }
  }

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '')
    
    // Format as (XXX) XXX-XXXX
    if (digits.length >= 6) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`
    } else if (digits.length >= 3) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
    }
    return digits
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    setFormData({ ...formData, phoneNumber: formatted })
  }

  if (step === 'phone') {
    return (
      <div className="bg-white/10 backdrop-blur rounded-lg p-6">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Phone className="text-white" size={24} />
          </div>
          <h3 className="text-xl font-semibold mb-2">Verify Your Phone</h3>
          <p className="text-sm opacity-90">
            We'll send you a verification code to confirm your identity
          </p>
        </div>

        <form onSubmit={handleSendCode} className="space-y-4">
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium mb-2">
              Phone Number
            </label>
            <input
              id="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={handlePhoneChange}
              placeholder="(907) 555-0123"
              className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              maxLength={14}
              required
            />
            <p className="text-xs text-white/70 mt-1">
              Alaska numbers (907) are preferred for instant verification
            </p>
          </div>

          <div>
            <label htmlFor="zipCode" className="block text-sm font-medium mb-2">
              Alaska Zip Code {!formData.phoneNumber.startsWith('(907)') && <span className="text-red-200">*</span>}
            </label>
            <input
              id="zipCode"
              type="text"
              value={formData.alaskaZipCode}
              onChange={(e) => setFormData({ ...formData, alaskaZipCode: e.target.value })}
              placeholder="99xxx"
              className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              maxLength={5}
              required={!formData.phoneNumber.startsWith('(907)')}
            />
            <p className="text-xs text-white/70 mt-1">
              {formData.phoneNumber.startsWith('(907)') 
                ? 'Optional for Alaska phone numbers' 
                : 'Required for non-Alaska phone numbers'
              }
            </p>
          </div>

          {error && (
            <div className="text-sm text-red-200 bg-red-500/20 p-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-white text-alaska-600 font-semibold py-3 px-4 rounded-lg hover:bg-white/90 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            <MessageCircle size={18} />
            <span>{isLoading ? 'Sending Code...' : 'Send Verification Code'}</span>
            {!isLoading && <ArrowRight size={18} />}
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="bg-white/10 backdrop-blur rounded-lg p-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="text-white" size={24} />
        </div>
        <h3 className="text-xl font-semibold mb-2">Enter Verification Code</h3>
        <p className="text-sm opacity-90">
          We sent a 6-digit code to {formData.phoneNumber}
        </p>
        {verificationData.isAlaskaNumber && (
          <div className="inline-flex items-center space-x-2 bg-aurora-500/20 text-aurora-200 px-3 py-1 rounded-full text-xs mt-2">
            <Shield size={12} />
            <span>Alaska Number Verified</span>
          </div>
        )}
      </div>

      <form onSubmit={handleVerifyCode} className="space-y-4">
        <div>
          <label htmlFor="verificationCode" className="block text-sm font-medium mb-2">
            Verification Code
          </label>
          <input
            id="verificationCode"
            type="text"
            value={verificationData.verificationCode}
            onChange={(e) => setVerificationData({ 
              ...verificationData, 
              verificationCode: e.target.value.replace(/\D/g, '').slice(0, 6)
            })}
            placeholder="123456"
            className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 text-center text-lg tracking-widest"
            maxLength={6}
            required
          />
          <p className="text-xs text-white/70 mt-1">
            Enter the 6-digit code sent to your phone
          </p>
        </div>

        {error && (
          <div className="text-sm text-red-200 bg-red-500/20 p-3 rounded-lg">
            {error}
          </div>
        )}

        <div className="space-y-3">
          <button
            type="submit"
            disabled={isLoading || verificationData.verificationCode.length !== 6}
            className="w-full bg-white text-alaska-600 font-semibold py-3 px-4 rounded-lg hover:bg-white/90 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            <Shield size={18} />
            <span>{isLoading ? 'Verifying...' : 'Verify & Join Forty9'}</span>
          </button>
          
          <button
            type="button"
            onClick={() => setStep('phone')}
            className="w-full text-white/80 hover:text-white text-sm py-2"
          >
            ← Back to phone number
          </button>
        </div>
      </form>
    </div>
  )
}

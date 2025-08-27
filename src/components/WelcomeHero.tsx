'use client'

import { useAuth } from './AuthProvider'
import { MapPin, Shield, Users, MessageCircle } from 'lucide-react'
import { PhoneVerification } from './PhoneVerification'

export function WelcomeHero() {
  const { user } = useAuth()

  if (user) {
    return (
      <div className="bg-gradient-to-r from-alaska-500 to-aurora-500 rounded-2xl p-8 text-white">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold mb-4">
            Welcome to Forty9 🏔️
          </h1>
          <p className="text-lg opacity-90 mb-6">
            Your anonymous community for real talk about life in Alaska. Share experiences, ask questions, and connect with fellow Alaskans.
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Shield size={16} />
              <span>100% Anonymous</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin size={16} />
              <span>Alaska Residents Only</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users size={16} />
              <span>Community Moderated</span>
            </div>
            <div className="flex items-center space-x-2">
              <MessageCircle size={16} />
              <span>Unfiltered Discussion</span>
            </div>
          </div>
        </div>
      </div>
    )
  }



  return (
    <div className="bg-gradient-to-r from-alaska-500 to-aurora-500 rounded-2xl p-8 text-white">
      <div className="max-w-4xl">
        <h1 className="text-4xl font-bold mb-4">
          Forty9 🏔️
        </h1>
        <p className="text-xl opacity-90 mb-8">
          An anonymous community platform exclusively for Alaska residents. 
          Share your experiences, ask questions, and connect with fellow Alaskans without judgment.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Shield className="text-aurora-200" size={20} />
              <span>100% Anonymous - No personal info required</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="text-aurora-200" size={20} />
              <span>Alaska residents only - Verified by phone</span>
            </div>
            <div className="flex items-center space-x-3">
              <Users className="text-aurora-200" size={20} />
              <span>Community-driven moderation</span>
            </div>
            <div className="flex items-center space-x-3">
              <MessageCircle className="text-aurora-200" size={20} />
              <span>Minimal censorship - Real conversations</span>
            </div>
          </div>
          
          <PhoneVerification />
        </div>
      </div>
    </div>
  )
}

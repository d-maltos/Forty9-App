'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Home, Plus, User, Search } from 'lucide-react'

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-alaska-500 to-aurora-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">49</span>
            </div>
            <span className="font-bold text-xl text-gray-900">Forty9</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="flex items-center space-x-2 text-gray-700 hover:text-alaska-600 transition-colors">
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link href="/communities" className="text-gray-700 hover:text-alaska-600 transition-colors">
              Communities
            </Link>
            <Link href="/create" className="flex items-center space-x-2 btn-primary">
              <Plus size={18} />
              <span>New Post</span>
            </Link>
            <button className="flex items-center space-x-2 text-gray-700 hover:text-alaska-600 transition-colors">
              <User size={18} />
              <span>Anonymous User</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-alaska-600 hover:bg-gray-100"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-3">
              <Link
                href="/"
                className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:text-alaska-600 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                <Home size={18} />
                <span>Home</span>
              </Link>
              <Link
                href="/communities"
                className="block px-3 py-2 text-gray-700 hover:text-alaska-600 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Communities
              </Link>
              <Link
                href="/create"
                className="flex items-center space-x-3 px-3 py-2 text-alaska-600 font-medium hover:bg-alaska-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                <Plus size={18} />
                <span>New Post</span>
              </Link>
              <div className="px-3 py-2 text-sm text-gray-500">
                Signed in as Anonymous User
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

import type { Metadata } from 'next'
import './globals.css'
import { Navigation } from '@/components/Navigation'
import { AuthProvider } from '@/components/AuthProvider'

export const metadata: Metadata = {
  title: 'Forty9 - Anonymous Community for Alaskans',
  description: 'A hyperlocal anonymous community platform exclusively for Alaska residents',
  keywords: ['Alaska', 'community', 'anonymous', 'local', 'forum'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="min-h-screen bg-gray-50">
            <Navigation />
            <main className="max-w-6xl mx-auto px-4 py-8">
              {children}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}

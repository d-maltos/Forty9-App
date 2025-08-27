'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/AuthProvider'
import { ArrowLeft, Send } from 'lucide-react'
import Link from 'next/link'

const communities = [
  { id: 'general', name: 'General Alaska', description: 'All things Alaska' },
  { id: 'anchorage', name: 'Anchorage', description: 'Alaska\'s largest city' },
  { id: 'fairbanks', name: 'Fairbanks', description: 'Golden Heart City' },
  { id: 'juneau', name: 'Juneau', description: 'Alaska\'s capital' },
  { id: 'oil-gas', name: 'Oil & Gas', description: 'Industry discussions' },
  { id: 'fishing', name: 'Fishing & Seafood', description: 'Commercial and sport fishing' },
  { id: 'outdoors', name: 'Outdoors', description: 'Hiking, hunting, adventures' },
]

export default function CreatePostPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    communityId: 'general',
    isAnonymous: true,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Sign in to create a post
          </h1>
          <p className="text-gray-600 mb-6">
            You need to be signed in to create posts and join the conversation.
          </p>
          <Link href="/" className="btn-primary">
            Go to Home
          </Link>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate post creation
    setTimeout(() => {
      setIsSubmitting(false)
      router.push('/')
    }, 1500)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <Link 
          href="/" 
          className="inline-flex items-center space-x-2 text-alaska-600 hover:text-alaska-700 font-medium"
        >
          <ArrowLeft size={20} />
          <span>Back to Feed</span>
        </Link>
      </div>

      <div className="card">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Create a New Post
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Community Selection */}
          <div>
            <label htmlFor="community" className="block text-sm font-medium text-gray-700 mb-2">
              Choose Community
            </label>
            <select
              id="community"
              value={formData.communityId}
              onChange={(e) => setFormData({ ...formData, communityId: e.target.value })}
              className="input-field"
            >
              {communities.map((community) => (
                <option key={community.id} value={community.id}>
                  {community.name} - {community.description}
                </option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="What's on your mind?"
              className="input-field"
              maxLength={200}
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.title.length}/200 characters
            </p>
          </div>

          {/* Content */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Content
            </label>
            <textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Share your thoughts with fellow Alaskans..."
              className="input-field min-h-[150px] resize-y"
              maxLength={5000}
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.content.length}/5000 characters
            </p>
          </div>

          {/* Anonymous Option */}
          <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
            <input
              id="anonymous"
              type="checkbox"
              checked={formData.isAnonymous}
              onChange={(e) => setFormData({ ...formData, isAnonymous: e.target.checked })}
              className="h-4 w-4 text-alaska-600 focus:ring-alaska-500 border-gray-300 rounded"
            />
            <label htmlFor="anonymous" className="text-sm text-gray-700">
              <span className="font-medium">Post anonymously</span>
              <span className="block text-xs text-gray-500 mt-1">
                Your post will show as "Anonymous" (recommended)
              </span>
            </label>
          </div>

          {/* Guidelines */}
          <div className="bg-aurora-50 border border-aurora-200 rounded-lg p-4">
            <h3 className="font-medium text-aurora-800 mb-2">Community Guidelines</h3>
            <ul className="text-sm text-aurora-700 space-y-1">
              <li>• Be respectful to fellow Alaskans</li>
              <li>• No personal information or doxxing</li>
              <li>• Keep it relevant to Alaska and Alaskan experiences</li>
              <li>• Report inappropriate content to help moderate</li>
              <li>• Minimal censorship - but illegal content will be removed</li>
            </ul>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-3">
            <Link href="/" className="btn-secondary">
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting || !formData.title.trim() || !formData.content.trim()}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <Send size={16} />
              <span>{isSubmitting ? 'Posting...' : 'Post to Community'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

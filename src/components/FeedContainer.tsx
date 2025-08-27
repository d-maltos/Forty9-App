'use client'

import { useState, useEffect } from 'react'
import { PostCard } from './PostCard'
import { useAuth } from './AuthProvider'
import Link from 'next/link'
import { Plus, TrendingUp, Clock, MessageCircle } from 'lucide-react'

interface Post {
  id: string
  title: string
  content: string
  communityName: string
  communityDisplayName: string
  createdAt: string
  upvotes: number
  downvotes: number
  commentCount: number
  isAnonymous: boolean
}

// Mock data for demonstration
const mockPosts: Post[] = [
  {
    id: '1',
    title: 'Anyone else dealing with the crazy weather in Anchorage this week?',
    content: 'The temperature swings have been insane. From -10 to 35 degrees in two days. My car is not happy about it.',
    communityName: 'anchorage',
    communityDisplayName: 'Anchorage',
    createdAt: '2024-01-15T10:30:00Z',
    upvotes: 23,
    downvotes: 2,
    commentCount: 12,
    isAnonymous: true,
  },
  {
    id: '2',
    title: 'Best place for fresh seafood in Juneau?',
    content: 'Visiting Juneau next month and looking for recommendations on where to get the freshest local seafood. Any hidden gems?',
    communityName: 'juneau',
    communityDisplayName: 'Juneau',
    createdAt: '2024-01-15T08:15:00Z',
    upvotes: 18,
    downvotes: 0,
    commentCount: 8,
    isAnonymous: true,
  },
  {
    id: '3',
    title: 'PFD check thoughts?',
    content: 'Just curious what everyone thinks about this year\'s PFD amount. Seems like it\'s never enough to keep up with cost of living increases.',
    communityName: 'general',
    communityDisplayName: 'General Alaska',
    createdAt: '2024-01-14T16:45:00Z',
    upvotes: 45,
    downvotes: 12,
    commentCount: 67,
    isAnonymous: true,
  },
  {
    id: '4',
    title: 'Northern Lights were incredible last night!',
    content: 'Did anyone else catch the aurora display around 11 PM? Some of the best I\'ve seen in years. Got some great photos from my backyard in Fairbanks.',
    communityName: 'fairbanks',
    communityDisplayName: 'Fairbanks',
    createdAt: '2024-01-14T12:20:00Z',
    upvotes: 89,
    downvotes: 1,
    commentCount: 23,
    isAnonymous: true,
  }
]

export function FeedContainer() {
  const { user } = useAuth()
  const [posts, setPosts] = useState<Post[]>([])
  const [sortBy, setSortBy] = useState<'hot' | 'new' | 'top'>('hot')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setPosts(mockPosts)
      setIsLoading(false)
    }, 1000)
  }, [])

  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Join Forty9 to see posts
        </h2>
        <p className="text-gray-500">
          Connect with fellow Alaskans and join the conversation
        </p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="card animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
            <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header with sort options */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold text-gray-900">Community Feed</h2>
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setSortBy('hot')}
              className={`flex items-center space-x-2 px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                sortBy === 'hot' 
                  ? 'bg-white text-alaska-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <TrendingUp size={16} />
              <span>Hot</span>
            </button>
            <button
              onClick={() => setSortBy('new')}
              className={`flex items-center space-x-2 px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                sortBy === 'new' 
                  ? 'bg-white text-alaska-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Clock size={16} />
              <span>New</span>
            </button>
            <button
              onClick={() => setSortBy('top')}
              className={`flex items-center space-x-2 px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                sortBy === 'top' 
                  ? 'bg-white text-alaska-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <MessageCircle size={16} />
              <span>Top</span>
            </button>
          </div>
        </div>
        
        <Link href="/create" className="btn-primary">
          <Plus size={18} className="mr-2" />
          New Post
        </Link>
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="text-center py-12 card">
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              No posts yet
            </h3>
            <p className="text-gray-500 mb-6">
              Be the first to start a conversation in your community
            </p>
            <Link href="/create" className="btn-primary">
              Create First Post
            </Link>
          </div>
        ) : (
          posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))
        )}
      </div>
    </div>
  )
}

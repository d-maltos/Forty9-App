'use client'

import { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { ChevronUp, ChevronDown, MessageCircle, Flag, Share2 } from 'lucide-react'

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

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null)
  const [currentUpvotes, setCurrentUpvotes] = useState(post.upvotes)
  const [currentDownvotes, setCurrentDownvotes] = useState(post.downvotes)

  const handleVote = (type: 'up' | 'down') => {
    if (userVote === type) {
      // Remove vote
      if (type === 'up') {
        setCurrentUpvotes(prev => prev - 1)
      } else {
        setCurrentDownvotes(prev => prev - 1)
      }
      setUserVote(null)
    } else {
      // Add or change vote
      if (userVote === 'up') {
        setCurrentUpvotes(prev => prev - 1)
        setCurrentDownvotes(prev => prev + 1)
      } else if (userVote === 'down') {
        setCurrentDownvotes(prev => prev - 1)
        setCurrentUpvotes(prev => prev + 1)
      } else {
        if (type === 'up') {
          setCurrentUpvotes(prev => prev + 1)
        } else {
          setCurrentDownvotes(prev => prev + 1)
        }
      }
      setUserVote(type)
    }
  }

  const netScore = currentUpvotes - currentDownvotes
  const timeAgo = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })

  return (
    <div className="card hover:shadow-md transition-shadow">
      <div className="flex space-x-4">
        {/* Voting */}
        <div className="flex flex-col items-center space-y-1 min-w-[40px]">
          <button
            onClick={() => handleVote('up')}
            className={`p-1 rounded hover:bg-gray-100 transition-colors ${
              userVote === 'up' ? 'text-aurora-600' : 'text-gray-500'
            }`}
          >
            <ChevronUp size={20} />
          </button>
          <span className={`text-sm font-medium ${
            netScore > 0 ? 'text-aurora-600' : netScore < 0 ? 'text-red-500' : 'text-gray-500'
          }`}>
            {netScore}
          </span>
          <button
            onClick={() => handleVote('down')}
            className={`p-1 rounded hover:bg-gray-100 transition-colors ${
              userVote === 'down' ? 'text-red-500' : 'text-gray-500'
            }`}
          >
            <ChevronDown size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
            <span className="bg-alaska-100 text-alaska-700 px-2 py-1 rounded-full text-xs font-medium">
              {post.communityDisplayName}
            </span>
            <span>•</span>
            <span>Posted by Anonymous</span>
            <span>•</span>
            <span>{timeAgo}</span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900 mb-3 hover:text-alaska-600 cursor-pointer">
            {post.title}
          </h3>

          {/* Content */}
          <p className="text-gray-700 mb-4 leading-relaxed">
            {post.content}
          </p>

          {/* Actions */}
          <div className="flex items-center space-x-6 text-sm text-gray-500">
            <button className="flex items-center space-x-2 hover:text-alaska-600 transition-colors">
              <MessageCircle size={16} />
              <span>{post.commentCount} comments</span>
            </button>
            <button className="flex items-center space-x-2 hover:text-alaska-600 transition-colors">
              <Share2 size={16} />
              <span>Share</span>
            </button>
            <button className="flex items-center space-x-2 hover:text-red-500 transition-colors">
              <Flag size={16} />
              <span>Report</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

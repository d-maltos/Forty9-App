export interface User {
  id: string
  anonymousId: string
  phoneNumber?: string
  alaskaZipCode?: string
  isVerified: boolean
  displayName?: string
  karma: number
  createdAt?: Date
  lastActiveAt?: Date
}

export interface Community {
  id: string
  name: string
  displayName: string
  description: string
  type: CommunityType
  location?: string
  isActive: boolean
  createdAt: Date
  memberCount?: number
  postCount?: number
}

export type CommunityType = 'CITY' | 'INDUSTRY' | 'INTEREST' | 'GENERAL'

export interface Post {
  id: string
  title: string
  content: string
  isAnonymous: boolean
  createdAt: Date
  updatedAt: Date
  upvotes: number
  downvotes: number
  commentCount: number
  isReported: boolean
  isHidden: boolean
  authorId: string
  communityId: string
  community: Community
}

export interface Comment {
  id: string
  content: string
  isAnonymous: boolean
  createdAt: Date
  updatedAt: Date
  upvotes: number
  downvotes: number
  parentId?: string
  isReported: boolean
  isHidden: boolean
  authorId: string
  postId: string
  replies?: Comment[]
}

export interface Vote {
  id: string
  type: VoteType
  createdAt: Date
  userId: string
  postId?: string
  commentId?: string
}

export type VoteType = 'UP' | 'DOWN'

export interface Report {
  id: string
  reason: ReportReason
  details?: string
  createdAt: Date
  status: ReportStatus
  reporterId: string
  postId?: string
  commentId?: string
}

export type ReportReason = 'SPAM' | 'HARASSMENT' | 'INAPPROPRIATE_CONTENT' | 'MISINFORMATION' | 'PERSONAL_INFO' | 'OTHER'

export type ReportStatus = 'PENDING' | 'REVIEWED' | 'RESOLVED' | 'DISMISSED'

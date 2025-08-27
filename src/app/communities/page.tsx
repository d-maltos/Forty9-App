'use client'

import Link from 'next/link'
import { MapPin, Briefcase, Heart, MessageSquare, Users, TrendingUp } from 'lucide-react'

interface Community {
  id: string
  name: string
  displayName: string
  description: string
  type: 'CITY' | 'INDUSTRY' | 'INTEREST' | 'GENERAL'
  memberCount: number
  postCount: number
  recentActivity: string
  icon: React.ReactNode
}

const communities: Community[] = [
  {
    id: 'general',
    name: 'general',
    displayName: 'General Alaska',
    description: 'All things Alaska - from PFD discussions to northern lights sightings',
    type: 'GENERAL',
    memberCount: 2156,
    postCount: 1834,
    recentActivity: '5 minutes ago',
    icon: <MessageSquare size={20} />
  },
  {
    id: 'anchorage',
    name: 'anchorage',
    displayName: 'Anchorage',
    description: 'Alaska\'s largest city - local news, events, and community discussions',
    type: 'CITY',
    memberCount: 1247,
    postCount: 967,
    recentActivity: '12 minutes ago',
    icon: <MapPin size={20} />
  },
  {
    id: 'outdoors',
    name: 'outdoors',
    displayName: 'Outdoors Alaska',
    description: 'Hiking, hunting, fishing, camping, and all outdoor adventures',
    type: 'INTEREST',
    memberCount: 1834,
    postCount: 2341,
    recentActivity: '3 minutes ago',
    icon: <Heart size={20} />
  },
  {
    id: 'fishing',
    name: 'fishing',
    displayName: 'Fishing & Seafood',
    description: 'Commercial fishing, sport fishing, and Alaska\'s seafood industry',
    type: 'INDUSTRY',
    memberCount: 789,
    postCount: 654,
    recentActivity: '18 minutes ago',
    icon: <Briefcase size={20} />
  },
  {
    id: 'oil-gas',
    name: 'oil-gas',
    displayName: 'Oil & Gas',
    description: 'Alaska\'s energy industry - jobs, news, and industry discussions',
    type: 'INDUSTRY',
    memberCount: 567,
    postCount: 432,
    recentActivity: '1 hour ago',
    icon: <Briefcase size={20} />
  },
  {
    id: 'fairbanks',
    name: 'fairbanks',
    displayName: 'Fairbanks',
    description: 'Golden Heart City - interior Alaska life and community',
    type: 'CITY',
    memberCount: 432,
    postCount: 298,
    recentActivity: '45 minutes ago',
    icon: <MapPin size={20} />
  },
  {
    id: 'juneau',
    name: 'juneau',
    displayName: 'Juneau',
    description: 'Alaska\'s capital city - politics, tourism, and local life',
    type: 'CITY',
    memberCount: 298,
    postCount: 234,
    recentActivity: '2 hours ago',
    icon: <MapPin size={20} />
  },
  {
    id: 'tourism',
    name: 'tourism',
    displayName: 'Tourism & Hospitality',
    description: 'Alaska\'s tourism industry and hospitality workers',
    type: 'INDUSTRY',
    memberCount: 234,
    postCount: 189,
    recentActivity: '3 hours ago',
    icon: <Briefcase size={20} />
  }
]

export default function CommunitiesPage() {
  const getTypeColor = (type: Community['type']) => {
    switch (type) {
      case 'CITY':
        return 'bg-alaska-100 text-alaska-700 border-alaska-200'
      case 'INDUSTRY':
        return 'bg-orange-100 text-orange-700 border-orange-200'
      case 'INTEREST':
        return 'bg-aurora-100 text-aurora-700 border-aurora-200'
      case 'GENERAL':
        return 'bg-purple-100 text-purple-700 border-purple-200'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getTypeLabel = (type: Community['type']) => {
    switch (type) {
      case 'CITY':
        return 'City'
      case 'INDUSTRY':
        return 'Industry'
      case 'INTEREST':
        return 'Interest'
      case 'GENERAL':
        return 'General'
      default:
        return 'Community'
    }
  }

  // Sort communities by member count
  const sortedCommunities = [...communities].sort((a, b) => b.memberCount - a.memberCount)

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Alaska Communities
        </h1>
        <p className="text-lg text-gray-600">
          Connect with fellow Alaskans in communities that match your interests and location.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card text-center">
          <div className="text-2xl font-bold text-alaska-600 mb-2">
            {communities.length}
          </div>
          <div className="text-sm text-gray-600">Active Communities</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-aurora-600 mb-2">
            {communities.reduce((total, c) => total + c.memberCount, 0).toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Total Members</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-orange-600 mb-2">
            {communities.reduce((total, c) => total + c.postCount, 0).toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Posts Shared</div>
        </div>
      </div>

      {/* Communities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sortedCommunities.map((community) => (
          <Link
            key={community.id}
            href={`/c/${community.name}`}
            className="card hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
          >
            <div className="flex items-start space-x-4">
              <div className={`p-3 rounded-xl ${getTypeColor(community.type)}`}>
                {community.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg text-gray-900 group-hover:text-alaska-600">
                    {community.displayName}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(community.type)}`}>
                    {getTypeLabel(community.type)}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {community.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Users size={14} />
                      <span>{community.memberCount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <TrendingUp size={14} />
                      <span>{community.postCount.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="text-xs">
                    Active {community.recentActivity}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-12 text-center card bg-gradient-to-r from-alaska-50 to-aurora-50 border-alaska-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Don't see your community?
        </h2>
        <p className="text-gray-600 mb-6">
          We're always looking to add new communities that serve Alaska residents. 
          Let us know what communities you'd like to see!
        </p>
        <Link href="/create" className="btn-primary">
          Suggest a Community
        </Link>
      </div>
    </div>
  )
}

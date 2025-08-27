'use client'

import Link from 'next/link'
import { MapPin, Briefcase, Heart, MessageSquare } from 'lucide-react'

interface Community {
  id: string
  name: string
  displayName: string
  description: string
  type: 'CITY' | 'INDUSTRY' | 'INTEREST' | 'GENERAL'
  memberCount: number
  icon: React.ReactNode
}

const communities: Community[] = [
  {
    id: 'anchorage',
    name: 'anchorage',
    displayName: 'Anchorage',
    description: 'Alaska\'s largest city',
    type: 'CITY',
    memberCount: 1247,
    icon: <MapPin size={16} />
  },
  {
    id: 'fairbanks',
    name: 'fairbanks',
    displayName: 'Fairbanks',
    description: 'Golden Heart City',
    type: 'CITY',
    memberCount: 432,
    icon: <MapPin size={16} />
  },
  {
    id: 'juneau',
    name: 'juneau',
    displayName: 'Juneau',
    description: 'Alaska\'s capital',
    type: 'CITY',
    memberCount: 298,
    icon: <MapPin size={16} />
  },
  {
    id: 'oil-gas',
    name: 'oil-gas',
    displayName: 'Oil & Gas',
    description: 'Industry discussions',
    type: 'INDUSTRY',
    memberCount: 567,
    icon: <Briefcase size={16} />
  },
  {
    id: 'fishing',
    name: 'fishing',
    displayName: 'Fishing & Seafood',
    description: 'Commercial and sport fishing',
    type: 'INDUSTRY',
    memberCount: 789,
    icon: <Briefcase size={16} />
  },
  {
    id: 'outdoors',
    name: 'outdoors',
    displayName: 'Outdoors',
    description: 'Hiking, hunting, adventures',
    type: 'INTEREST',
    memberCount: 1834,
    icon: <Heart size={16} />
  },
  {
    id: 'general',
    name: 'general',
    displayName: 'General Alaska',
    description: 'All things Alaska',
    type: 'GENERAL',
    memberCount: 2156,
    icon: <MessageSquare size={16} />
  }
]

export function CommunityList() {
  const getTypeColor = (type: Community['type']) => {
    switch (type) {
      case 'CITY':
        return 'bg-alaska-100 text-alaska-700'
      case 'INDUSTRY':
        return 'bg-orange-100 text-orange-700'
      case 'INTEREST':
        return 'bg-aurora-100 text-aurora-700'
      case 'GENERAL':
        return 'bg-purple-100 text-purple-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg text-gray-900">Communities</h3>
        <Link 
          href="/communities" 
          className="text-sm text-alaska-600 hover:text-alaska-700 font-medium"
        >
          View all
        </Link>
      </div>
      
      <div className="space-y-3">
        {communities.slice(0, 6).map((community) => (
          <Link
            key={community.id}
            href={`/c/${community.name}`}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group"
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${getTypeColor(community.type)}`}>
                {community.icon}
              </div>
              <div>
                <div className="font-medium text-gray-900 group-hover:text-alaska-600">
                  {community.displayName}
                </div>
                <div className="text-xs text-gray-500">
                  {community.memberCount.toLocaleString()} members
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <Link 
          href="/communities"
          className="block text-center text-sm text-alaska-600 hover:text-alaska-700 font-medium"
        >
          Explore all communities →
        </Link>
      </div>
    </div>
  )
}

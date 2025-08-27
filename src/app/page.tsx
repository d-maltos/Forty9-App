import { FeedContainer } from '@/components/FeedContainer'
import { CommunityList } from '@/components/CommunityList'
import { WelcomeHero } from '@/components/WelcomeHero'

export default function HomePage() {
  return (
    <div className="space-y-8">
      <WelcomeHero />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Feed */}
        <div className="lg:col-span-3">
          <FeedContainer />
        </div>
        
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <CommunityList />
          
          {/* Alaska Info Card */}
          <div className="card">
            <h3 className="font-semibold text-lg mb-3 text-alaska-800">
              Welcome to Forty9
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              A safe space for Alaskans to share experiences, ask questions, and connect anonymously.
            </p>
            <div className="text-xs text-gray-500 space-y-1">
              <p>• Anonymous by default</p>
              <p>• Alaska residents only</p>
              <p>• Community moderated</p>
              <p>• Minimal censorship</p>
            </div>
          </div>
          
          {/* Weather/Local Info */}
          <div className="card">
            <h3 className="font-semibold text-lg mb-3 text-aurora-700">
              ❄️ Alaska Today
            </h3>
            <p className="text-sm text-gray-600">
              Connect with fellow Alaskans about local events, weather, and community happenings.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

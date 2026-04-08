import Hope from '@/components/sections/Hope'
import TrustMarquee from '@/components/ui/TrustMarquee'
import Offers from '@/components/sections/Offers'
import CommunityUpdates from '@/components/sections/CommunityUpdates'
import Initiatives from '@/components/sections/Initiatives'
import ShopNow from '@/components/sections/ShopNow'

export default function HomePage() {
  return (
    <>
      <Hope />
      <Offers />
      <TrustMarquee />
      <CommunityUpdates />
      <Initiatives />
      <ShopNow />
    </>
  )
}

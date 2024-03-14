import Feed from '@/screens/feed/Feed'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Feed',
  description: `Check out what other users of Social publish!`
}

export default function Page() {
  return <Feed />
}

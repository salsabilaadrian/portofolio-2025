import { getOrCreateUserId } from './userId'

export async function trackEvent(type, url) {
  try {
    const user_id = getOrCreateUserId()

    await fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, url, user_id }),
    })
  } catch (err) {
    console.error('Track failed:', err)
  }
}

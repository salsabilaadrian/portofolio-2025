export async function trackEvent(type, url) {
  try {
    await fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, url })
    })
  } catch (e) {
    console.error('Track failed:', e)
  }
}
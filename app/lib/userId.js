import { v4 as uuidv4 } from 'uuid'

export function getOrCreateUserId() {
  if (typeof window === 'undefined') return null

  let userId = localStorage.getItem('anonymous_user_id')
  if (!userId) {
    userId = uuidv4()
    localStorage.setItem('anonymous_user_id', userId)
  }

  return userId
}

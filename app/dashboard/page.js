'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import supabase from '../lib/supabaseClient'

export default function DashboardPage() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [sessionChecked, setSessionChecked] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const getSessionAndData = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()

      if (!session || error) {
        router.push('/login')
        return
      }

      setSessionChecked(true)

      const { data, error: eventError } = await supabase
        .from('click_events')
        .select('*')
        .order('created_at', { ascending: false })

      if (eventError) {
        console.error('Supabase event error:', eventError)
      } else {
        setEvents(data)
      }

      setLoading(false)
    }

    getSessionAndData()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (!sessionChecked || loading) {
    return <p className="p-8">Loading dashboard...</p>
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">📈 Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <table className="w-full border text-left rounded">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Type</th>
            <th className="p-2">URL</th>
            <th className="p-2">Time (UTC)</th>
          </tr>
        </thead>
        <tbody>
          {events.length > 0 ? (
            events.map(e => (
              <tr key={e.id} className="border-t">
                <td className="p-2">{e.type}</td>
                <td className="p-2">{e.url}</td>
                <td className="p-2">
                  {e.created_at
                    ? new Date(e.created_at).toUTCString()
                    : '—'}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="p-4 text-center text-gray-500">
                No events found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

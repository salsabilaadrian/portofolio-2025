import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function POST(req) {
  try {
    const body = await req.json()
    const { type, url, user_id } = body

    if (!type || !url || !user_id) {
      return NextResponse.json({ error: 'Missing type, url, or user_id' }, { status: 400 })
    }

    const { error } = await supabase
      .from('click_events')
      .insert([{ type, url, user_id }])

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json({ error: error.message, details: error }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Unexpected API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

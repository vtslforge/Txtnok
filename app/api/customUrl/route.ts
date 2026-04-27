import { NextResponse } from 'next/server'
import { supabase } from '@/utils/supabase'

export async function POST(req: Request) {
    try {
        const { slug, content } = await req.json()

        if (!slug || !content) {
            return NextResponse.json({ error: 'slug and content are required' }, { status: 400 })
        }

        const { data, error } = await supabase
            .from('clientData')
            .upsert([{ slug, content }], { onConflict: 'slug' })  // update + insert = upsert

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({ data }, { status: 201 })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }
}

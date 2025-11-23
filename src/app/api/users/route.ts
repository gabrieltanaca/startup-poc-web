import { supabase } from '@/lib/supabase/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const { data: users, error } = await supabase
    .from('users')
    .select('*')
    .order('createdAt', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 401 });
  return NextResponse.json(users, { status: 200 });
}

export async function POST(req: NextRequest) {
  const content = req.body;

  const { data, error } = await supabase.from('users').insert([{ content }]).select();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data[0], { status: 201 });
}

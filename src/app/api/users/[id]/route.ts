import { supabase } from '@/lib/supabase/client';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const { data: user, error } = await supabase.from('users').select('*').eq('id', id).single();

  if (error) return NextResponse.json({ error: error.message }, { status: 401 });
  return NextResponse.json(user, { status: 200 });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const content = req.body;

  const { data: user, error } = await supabase
    .from('users')
    .update(content)
    .eq('id', id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 401 });
  return NextResponse.json(user, { status: 200 });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const { error } = await supabase.from('users').delete().match({ id });

  if (error) return NextResponse.json({ error: error.message }, { status: 401 });
  return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
}

import { createSession } from '@/lib/session';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { userId } = await request.json();

        if (!userId) {
            return NextResponse.json(
                { error: 'userId é obrigatório' },
                { status: 400 }
            );
        }

        await createSession(userId);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Erro ao criar sessão:', error);
        return NextResponse.json(
            { error: 'Erro ao criar sessão' },
            { status: 500 }
        );
    }
}

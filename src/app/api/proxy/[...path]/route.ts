import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    const { path } = await params;
    return proxyRequest(request, path, 'GET');
}

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    const { path } = await params;
    return proxyRequest(request, path, 'POST');
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    const { path } = await params;
    return proxyRequest(request, path, 'PUT');
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    const { path } = await params;
    return proxyRequest(request, path, 'PATCH');
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    const { path } = await params;
    return proxyRequest(request, path, 'DELETE');
}

async function proxyRequest(
    request: NextRequest,
    pathSegments: string[],
    method: string
) {
    try {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

        if (!apiBaseUrl) {
            return NextResponse.json(
                { error: 'API_BASE_URL não configurada' },
                { status: 500 }
            );
        }

        // Reconstrói o path
        const path = pathSegments.join('/');

        // Adiciona query params
        const searchParams = request.nextUrl.searchParams.toString();
        const url = `${apiBaseUrl}/${path}${searchParams ? `?${searchParams}` : ''}`;

        // Prepara headers
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        };

        // Copia headers de autenticação se existirem
        const authHeader = request.headers.get('authorization');
        if (authHeader) {
            headers.Authorization = authHeader;
        }

        // Prepara body para métodos que aceitam
        let body: string | undefined;
        if (['POST', 'PUT', 'PATCH'].includes(method)) {
            try {
                const requestBody = await request.json();
                body = JSON.stringify(requestBody);
            } catch (e) {
                // Body vazio ou inválido
            }
        }

        // Faz a requisição para o backend
        const response = await fetch(url, {
            method,
            headers,
            body,
            cache: 'no-store',
        });

        // Pega a resposta
        const data = await response.json().catch(() => null);

        // Retorna a resposta com o mesmo status code
        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        console.error('Erro no proxy:', error);
        return NextResponse.json(
            { error: 'Erro ao processar requisição' },
            { status: 500 }
        );
    }
}

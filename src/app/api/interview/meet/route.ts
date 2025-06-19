import { NextRequest, NextResponse } from 'next/server';
import { openai } from '@/configs/openai'; // kalau kamu pakai SDK OpenAI

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { messages } = body;

    try {
        const chat = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: messages || [{ role: 'user', content: 'Halo' }],
        });

        return NextResponse.json(chat.choices[0].message);
    } catch (error) {
        console.error('Interview API Error:', error);
        return NextResponse.json({ error: 'Terjadi kesalahan' }, { status: 500 });
    }
}

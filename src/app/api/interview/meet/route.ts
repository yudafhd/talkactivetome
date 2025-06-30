import { NextRequest, NextResponse } from 'next/server';
import { geminiai } from '@/configs/geminiai';


export async function POST(req: NextRequest) {
    const body = await req.json();
    const { messages } = body;

    try {
        const response = await geminiai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: messages,
            config: {
                temperature: 0.7,
                systemInstruction: `you are the interviewer, 
                your name is Mahesa. Dont talk too long, 
                keep your answer short and concise. You are interviewing a candidate for a job position. 
                The candidate is a software engineer with 5 years of experience in web development. 
                Ask questions related to their experience, skills, and projects.`,
            },
        });

        return NextResponse.json(response.text);
    } catch (error) {
        console.error('Interview API Error:', error);
        return NextResponse.json({ error: 'Terjadi kesalahan' }, { status: 500 });
    }
}

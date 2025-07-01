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
                systemInstruction: `I want you to act as an interviewer. 
                I will be the candidate and you will ask me the interview 
                questions for the Software Engineer position. I want you 
                to only reply as the interviewer. Do not write all the 
                conversation at once. I want you to only do the interview 
                with me. Ask me the questions and wait for my answers. 
                Do not write explanations. Ask me the questions one by one 
                like an interviewer does and wait for my answers. My first 
                sentence is "Hi"`,
            },
        });
        return NextResponse.json(response.text);
    } catch (error) {
        console.error('Interview API Error:', error);
        return NextResponse.json({ error: 'Terjadi kesalahan' }, { status: 500 });
    }
}

'use client';

import { useEffect, useRef, useState } from 'react';
import { Mic, MicOff, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function MeetPage() {
    const [micOn, setMicOn] = useState(false);
    const [messages, setMessages] = useState<{ sender: string, text: string }[]>([])
    const recognitionRef = useRef<any>(null);
    const toggleMic = () => setMicOn(!micOn);
    const router = useRouter();

    const exitRoom = () => {
        router.push("/")
    }
    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert('Browser kamu tidak mendukung Speech Recognition!');
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = 'id-ID';
        recognition.interimResults = false;
        recognition.continuous = false;

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            const transcript = event.results[0][0].transcript;
            setMessages((prev) => {
                return [...prev, { sender: "yuda", text: transcript }]
            });
            setMicOn(false)
        };

        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
            console.error('Error:', event.error);
        };

        recognition.continuous = true;

        recognitionRef.current = recognition;
    }, []);

    useEffect(() => {
        if (micOn) {
            recognitionRef.current?.start()
        } else {
            recognitionRef.current?.stop()
        }
    }, [micOn])

    return (
        <main className="min-h-screen bg-black text-white flex items-center justify-center p-4">
            <div className="flex w-full max-w-6xl h-[80vh] gap-4">
                {/* Layar video */}
                <div className="flex-1 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 text-xl">
                    [ Video Call Placeholder ]
                </div>

                {/* Panel Chat */}
                <div className="w-80 bg-gray-900 rounded-lg flex flex-col p-4">
                    <h2 className="text-lg font-semibold mb-2">Chat</h2>
                    <div className="flex-1 overflow-y-auto space-y-3">
                        {messages.map((msg, index) => (
                            <div key={index} className="bg-gray-800 p-3 rounded-md">
                                <p className="text-sm font-bold">{msg.sender}</p>
                                <p className="text-sm">{msg.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tombol Mic */}
            <div className="absolute bottom-10 flex gap-4">
                <button
                    onClick={toggleMic}
                    className={`w-14 h-14 rounded-full flex items-center justify-center transition
            ${micOn ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}
          `}
                >
                    {micOn ? <Mic size={28} /> : <MicOff size={28} />}
                </button>
                <button
                    onClick={exitRoom}
                    className={`w-14 h-14 rounded-full flex items-center justify-center transition
            ${micOn ? 'bg-red-600 hover:bg-red-700' : 'bg-red-600 hover:bg-red-700'}
          `}
                >
                    <X size={28} />
                </button>
            </div>
        </main>
    );
}

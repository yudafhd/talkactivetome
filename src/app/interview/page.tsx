"use client";

import { useRouter } from "next/navigation";

export default function MeetPage() {

    const router = useRouter();

    return (
        <main className="min-h-screen flex items-center justify-center bg-[#0f172a] text-white p-4">
            <div className="bg-white/10 backdrop-blur-md rounded-md p-10 text-center shadow-xl w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4">Bersiap Memulai Interview</h1>
                <p className="text-sm text-gray-200 mb-6">
                    Silakan tunggu, interviewer akan segera masuk ke ruang ini.
                </p>
                <button onClick={() => router.push("/interview/meet")} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium transition">
                    Mulai Sekarang
                </button>
            </div>
        </main>
    );
}

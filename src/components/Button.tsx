"use client";

import { useRouter } from "next/navigation";

export default function Button({
    label,
    url,
    disabled = false,
}: {
    label: string;
    url?: string;
    disabled?: boolean;
}) {
    const router = useRouter();

    return (
        <button
            disabled={disabled}
            onClick={() => {
                router.push(url || "/")
            }}
            className={`w-full py-4 px-4 rounded-md font-medium text-base transition-all duration-300
        ${disabled
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-[#294e8e] hover:bg-[#1f3c71] text-white shadow-sm hover:shadow-md cursor-pointer"
                }
      `}
        >
            {label}
        </button>
    );
}

"use client";

import { useState } from "react";
import { uploadCSV } from "../lib/api";
import type { CSVResponse } from "../types/csv";
import type { Status } from "../types/status";

type Props = {
  onSuccess: (data: CSVResponse) => void;
  onError: (error: string) => void;
  setStatus: (status: Status) => void;
};

export default function UploadForm({ onSuccess, onError, setStatus }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpload = async () => {
    if (!file || isLoading) return;

    try {
      setIsLoading(true);
      setStatus("uploading");

      const res = await uploadCSV(file);

      onSuccess(res);
    } catch (e: unknown) {
      if (e instanceof Error) {
        onError(e.message);
      } else {
        onError("Unexpected error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative group flex flex-col items-center justify-center w-full p-10 border border-[#30363D] rounded-xl bg-[#161B22] transition-colors duration-200">
      <div className="flex flex-col items-center pointer-events-none">
        <svg
          className="w-12 h-12 mb-4 text-gray-500 group-hover:text-blue-500 transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <p className="text-base font-medium text-gray-200">
          Select CSV file to analyze
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Maximum size: 10MB
        </p>
      </div>

      <input
        type="file"
        accept=".csv"
        disabled={isLoading}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setFile(e.target.files?.[0] || null)
        }
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />

      <button
        onClick={handleUpload}
        disabled={isLoading}
        className={`relative z-10 mt-6 px-10 py-2.5 text-white text-sm font-semibold rounded-lg transition-all active:scale-95
          ${isLoading ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-500"}
        `}
      >
        {isLoading ? "Uploading..." : "Upload"}
      </button>

      {file && !isLoading && (
        <p className="absolute bottom-4 text-xs text-blue-400 font-mono">
          Selected: {file.name}
        </p>
      )}
    </div>
  );
}

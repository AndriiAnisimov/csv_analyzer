"use client";

import { useState } from "react";
import type { CSVStats, CSVRow, CSVResponse } from "../types/csv";
import type { Status } from "../types/status";

import DataDistribution from "../components/DataDistribution";
import DatasetOverview from "../components/DatasetOverview";
import UploadForm from "../components/UploadForm";

export default function Page() {
  const [data, setData] = useState<CSVRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<CSVStats | null>(null);
  const [status, setStatus] = useState<Status>("idle");

  const hasData = !!stats || data.length > 0;

  return (
    <div className="min-h-screen bg-[#0D1117] text-white py-12 px-4">
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left">
        <h1 className="text-4xl font-extrabold tracking-tight text-white">CSV Analyzer</h1>
        <p className="text-gray-400 mt-2 text-lg">Upload, analyze and visualize your data</p>
      </header>

      <main className="max-w-6xl mx-auto space-y-8">
        <UploadForm
          setStatus={setStatus}
          onSuccess={(res: CSVResponse) => {
            setStats(res.stats);
            setData(res.data);
            setError("");
          }}
          onError={(err: string) => {
            setError(err);
            setStatus("error");
          }}
        />

        <div className="flex flex-col items-center justify-center min-h-[24px]">
          {status !== "idle" && (
            <p className="text-blue-400 animate-pulse font-medium">{status}</p>
          )}
          {error && (
            <p className="text-red-500 bg-red-500/10 px-4 py-2 rounded-lg border border-red-500/20">
              {error}
            </p>
          )}
        </div>

        {hasData && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <DatasetOverview stats={stats} />
            {data.length > 0 && <DataDistribution data={data} />}
          </div>
        )}
      </main>
    </div>
  );
}

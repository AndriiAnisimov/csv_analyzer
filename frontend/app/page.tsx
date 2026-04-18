"use client";

import { useState } from "react";
import type { CSVStats, CSVRow, CSVResponse } from "../types/csv";
import type { Status } from "../types/status";

import DataDistribution from "../components/DataDistribution";
import DatasetOverview from "../components/DatasetOverview";
import UploadForm from "../components/UploadForm";

const steps = [
  { key: "uploading", label: "Uploading file" },
  { key: "processing", label: "Processing file" },
  { key: "calculating", label: "Calculating statistics" },
  { key: "rendering", label: "Rendering results" },
];

function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

function StatusSteps({ current }: { current: Status }) {
  return (
    <div className="space-y-2">
      {steps.map((step, index) => {
        const currentIndex = steps.findIndex((s) => s.key === current);
        const isActive = step.key === current;
        const isDone = currentIndex > index;

        return (
          <div
            key={step.key}
            className={`flex items-center gap-2 text-sm transition-all ${
              isDone ? "text-gray-500" : isActive ? "text-blue-400 font-medium" : "text-gray-400"
            }`}
          >
            <span>
              {isDone ? "✔" : isActive ? "⏳" : "•"}
            </span>
            {step.label}
          </div>
        );
      })}
    </div>
  );
}

function ProgressBar({ current }: { current: Status }) {
  const index = steps.findIndex((s) => s.key === current);
  const percent = index === -1 ? 0 : ((index + 1) / steps.length) * 100;

  return (
    <div className="w-full bg-gray-800 h-1.5 rounded overflow-hidden">
      <div
        className="h-full bg-blue-500 transition-all duration-300"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}

export default function Page() {
  const [data, setData] = useState<CSVRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<CSVStats | null>(null);
  const [status, setStatus] = useState<Status>("idle");

  const hasData = !!stats || data.length > 0;

  const handleSuccess = async (res: CSVResponse) => {
    try {
      setError(null);

      setStatus("processing");
      await delay(1000);

      setStatus("calculating");
      await delay(1000);

      setStatus("rendering");
      await delay(1000);

      setStats(res.stats);
      setData(res.data);

      setStatus("done");
    } catch (e) {
      setStatus("error");
      setError("Unexpected error during processing");
    }
  };

  return (
    <div className="min-h-screen bg-[#0D1117] text-white py-12 px-4">
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left">
        <h1 className="text-4xl font-extrabold tracking-tight">CSV Analyzer</h1>
        <p className="text-gray-400 mt-2 text-lg">
          Upload, analyze and visualize your data
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-8">
        <UploadForm
          setStatus={setStatus}
          onSuccess={handleSuccess}
          onError={(err: string) => {
            setError(err);
            setStatus("error");
          }}
        />

        {(status !== "idle" || error) && (
          <div className="max-w-xl mx-auto space-y-4">
            {status !== "idle" && status !== "done" && status !== "error" && (
              <>
                <StatusSteps current={status} />
                <ProgressBar current={status} />
              </>
            )}

            {status === "done" && (
              <p className="text-green-400 font-medium">✔ Processing completed</p>
            )}

            {status === "error" && error && (
              <p className="text-red-500 bg-red-500/10 px-4 py-2 rounded-lg border border-red-500/20">
                {error}
              </p>
            )}
          </div>
        )}

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

"use client";

export default function DatasetOverview({ datasetOverview }: any) {
  if (!datasetOverview) return null;

  return (
    <div className="flex flex-col w-full p-8 border border-[#30363D] rounded-xl bg-[#161B22] transition-colors duration-200">
      <div className="flex items-center mb-6">
        <svg
          className="w-6 h-6 mr-3 text-blue-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M4 7v10c0 1.1.9 2 2 2h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2zM9 5v4m6-4v4M4 11h16"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h3 className="text-lg font-semibold text-gray-200">Dataset Overview</h3>
      </div>

      <div className="relative overflow-hidden rounded-lg border border-[#30363D] bg-[#0D1117]">
        <pre className="p-4 text-xs sm:text-sm text-blue-400 font-mono overflow-x-auto leading-relaxed">
          {JSON.stringify(datasetOverview, null, 2)}
        </pre>
      </div>

      <div className="mt-4 flex justify-end">
        <span className="text-[10px] uppercase tracking-wider text-gray-500 font-medium">
          Source: CSV Analysis
        </span>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import DataDistribution from "../components/DataDistribution";
import DatasetOverview from "../components/DatasetOverview";
import UploadForm from "../components/UploadForm";

export default function Page() {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [datasetOverview, setDatasetOverview] = useState<any>(null);
  const [status, setStatus] = useState("");

  return (
    <div className="my-12 mx-auto">
      <header className="max-w-6xl mx-auto mb-10">
        <h1 className="text-3xl font-bold">CSV Analyzer</h1>
        <p className="text-gray-400 mt-2">Upload, analyze and visualize your data</p>
      </header>

      <main className="max-w-6xl mx-auto space-y-8">
        <UploadForm
          setStatus={setStatus}
          onSuccess={(res: any) => {
            setDatasetOverview(res.datasetOverview);
            setData(res.data);
            setError("");
          }}
          onError={(err: string) => {
            setError(err);
            setStatus("");
          }}
        />

        {status && <p>{status}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <DatasetOverview datasetOverview={datasetOverview} />

        {data.length > 0 && <DataDistribution data={data} />}
      </main>
    </div>
  );
}

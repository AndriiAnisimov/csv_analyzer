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
    <div style={{ padding: 40 }}>
      <h1>CSV Analyzer</h1>

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
    </div>
  );
}

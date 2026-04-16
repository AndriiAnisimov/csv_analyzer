
"use client";

import { useState } from "react";
import UploadForm from "../components/UploadForm";
import Stats from "../components/Stats";
import Chart from "../components/Chart";

export default function Page() {
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [stats, setStats] = useState<any>(null);
  const [data, setData] = useState<any[]>([]);

  return (
    <div style={{ padding: 40 }}>
      <h1>CSV Analyzer</h1>

      <UploadForm
        setStatus={setStatus}
        onSuccess={(res: any) => {
          setStats(res.stats);
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

      <Stats stats={stats} />

      {data.length > 0 && <Chart data={data} />}
    </div>
  );
}

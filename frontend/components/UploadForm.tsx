
"use client";

import { useState } from "react";
import { uploadCSV } from "../lib/api";

export default function UploadForm({ onSuccess, onError, setStatus }: any) {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) return;

    try {
      setStatus("Uploading...");
      const res = await uploadCSV(file);

      setTimeout(() => setStatus("Processing..."), 800);
      setTimeout(() => setStatus("Rendering..."), 1600);

      setTimeout(() => {
        onSuccess(res);
        setStatus("");
      }, 2200);
    } catch (e: any) {
      onError(e.message);
    }
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

import type { CSVResponse, APIError } from "../types/csv";

export async function uploadCSV(file: File): Promise<CSVResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("http://localhost:8000/api/upload/", {
    method: "POST",
    body: formData,
  });

  const data: unknown = await res.json();

  if (!res.ok) {
    const err = data as APIError;
    throw new Error(err.error || "Upload failed");
  }

  return data as CSVResponse;
}

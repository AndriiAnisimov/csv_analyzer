
export async function uploadCSV(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("http://localhost:8000/api/upload/", {
    method: "POST",
    body: formData
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.error || "Upload failed");
  return data;
}

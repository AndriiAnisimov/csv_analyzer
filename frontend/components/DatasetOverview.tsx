export default function DatasetOverview({ datasetOverview }: any) {
  if (!datasetOverview) return null;

  return (
    <div>
      <h3>Dataset Overview</h3>
      <pre>{JSON.stringify(datasetOverview, null, 2)}</pre>
    </div>
  );
}

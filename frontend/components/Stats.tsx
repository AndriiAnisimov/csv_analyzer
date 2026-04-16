
export default function Stats({ stats }: any) {
  if (!stats) return null;

  return (
    <div>
      <h3>Stats</h3>
      <pre>{JSON.stringify(stats, null, 2)}</pre>
    </div>
  );
}

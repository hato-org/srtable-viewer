
export async function fetchScienceroomTable({
  y,
  m,
  d,
  key,
}: {
  y: string;
  m: string;
  d: string;
  key: string;
}) {
  return fetch(
    `${process.env.API_URL}/scienceroom?${new URLSearchParams({ y, m, d }).toString()}`,
    {
      headers: { "X-APIKEY": key },
    }
  );
}

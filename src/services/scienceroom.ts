import { ScienceRoom } from "@/types/hato";

export async function fetchScienceroomTable({
  date,
  key,
}: {
  date: Date;
  key?: string;
}): Promise<ScienceRoom> {
  return (
    await fetch(
      `https://api.hato.cf/scienceroom?${new URLSearchParams({
        y: date.getFullYear().toString(),
        m: (date.getMonth() + 1).toString(),
        d: date.getDate().toString(),
      }).toString()}`,
      { headers: { "X-APIKEY": key ?? "" } }
    )
  ).json();
}

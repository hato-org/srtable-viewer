import { fetchScienceroomTable } from "@/services/scienceroom";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const apiKey = cookies().get("hatoapi-key")?.value;

  if (!apiKey) return new Response("Unauthorized", { status: 401 });

  const { searchParams } = new URL(request.url);

  return fetchScienceroomTable({
    y: searchParams.get("y") ?? "",
    m: searchParams.get("m") ?? "",
    d: searchParams.get("d") ?? "",
    key: apiKey,
  });
}

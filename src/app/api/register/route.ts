import { cookies } from "next/headers";

export async function POST(request: Request) {
  const cookieStore = cookies();
  const { apiKey } = (await request.json()) as { apiKey: string };

  cookieStore.set({
    name: 'hatoapi-key',
    value: apiKey,
    secure: true,
    httpOnly: true,
    sameSite: 'lax'
  })

  return new Response("OK", {
    headers: {
      "Set-Cookie": cookieStore.toString()
    },
  });
}

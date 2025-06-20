export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const targetUrl = searchParams.get("url");

  if (!targetUrl) {
    return new Response("Missing `url` query parameter", { status: 400 });
  }

  try {
    const resp = await fetch(targetUrl);
    const body = await resp.text();

    return new Response(body, {
      status: resp.status,
      headers: {
        "Content-Type": resp.headers.get("content-type") || "text/plain",
      },
    });
  } catch (err) {
    return new Response("Fetch error: " + err.message, { status: 500 });
  }
}

const PHIVOLCS_URL = "https://earthquake.phivolcs.dost.gov.ph/";

export default async function handler(req, res) {
  if (req.method && req.method !== "GET") {
    res.setHeader("Allow", "GET");
    res.status(405).send("Method Not Allowed");
    return;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(PHIVOLCS_URL, {
      signal: controller.signal,
      headers: {
        "User-Agent": "LinogTracker/1.0",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
    });

    if (!response.ok) {
      res.status(502).send(`PHIVOLCS upstream returned ${response.status}`);
      return;
    }

    const html = await response.text();

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=600");
    res.status(200).send(html);
  } catch (error) {
    const message =
      error?.name === "AbortError"
        ? "PHIVOLCS request timed out"
        : "Failed to fetch PHIVOLCS data";

    res.status(502).send(message);
  } finally {
    clearTimeout(timeoutId);
  }
}

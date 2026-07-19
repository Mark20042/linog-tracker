import axios from "axios";
import https from "node:https";

const PHIVOLCS_URL = "https://earthquake.phivolcs.dost.gov.ph/";
const httpsAgent = new https.Agent({ rejectUnauthorized: false });

export default async function handler(req, res) {
  if (req.method && req.method !== "GET") {
    res.setHeader("Allow", "GET");
    res.status(405).send("Method Not Allowed");
    return;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await axios.get(PHIVOLCS_URL, {
      httpsAgent,
      signal: controller.signal,
      timeout: 15000,
      responseType: "text",
      headers: {
        "User-Agent": "LinogTracker/1.0",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      validateStatus: () => true,
    });

    if (response.status < 200 || response.status >= 300) {
      res.status(502).send(`PHIVOLCS upstream returned ${response.status}`);
      return;
    }

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=600");
    res.status(200).send(response.data);
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

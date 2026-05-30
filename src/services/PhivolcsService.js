import axios from "axios";

const API_URL = "/api/phivolcs";

export const PhivolcsService = {
  async getEarthquakes() {
    try {
      const response = await axios.get(API_URL);
      const html = response.data;
      return this.parseHtml(html);
    } catch (error) {
      console.error("Error fetching earthquake data:", error);
      return [];
    }
  },

  parseHtml(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const earthquakes = [];

    const tables = doc.querySelectorAll("table");
    let targetTable = null;

    for (const table of tables) {
      if (table.textContent.includes("Date - Time")) {
        targetTable = table;
        break;
      }
    }

    if (!targetTable) return [];

    const rows = targetTable.querySelectorAll("tr");

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      const cells = row.querySelectorAll("td");

      if (cells.length >= 5) {
        const dateTime = cells[0]?.textContent?.trim();
        const lat = parseFloat(cells[1]?.textContent?.trim());
        const long = parseFloat(cells[2]?.textContent?.trim());
        const depth = cells[3]?.textContent?.trim();
        const mag = parseFloat(cells[4]?.textContent?.trim());
        const location = cells[5]?.textContent?.trim();

        if (dateTime && !isNaN(lat) && !isNaN(long)) {
          earthquakes.push({
            id: i,
            dateTime,
            lat,
            long,
            depth,
            mag,
            location,
          });
        }
      }
    }

    return earthquakes;
  },
};

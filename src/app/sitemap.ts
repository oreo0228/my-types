import type { MetadataRoute } from "next";

const BASE_URL = "https://my-types.pages.dev";

const SNS_BRAIN_TYPE_CODES = [
  "CRPO", "CRLO", "CRPX", "CRLX",
  "CMPO", "CMLO", "CMPX", "CMLX",
  "WRPO", "WRLO", "WRPX", "WRLX",
  "WMPO", "WMLO", "WMPX", "WMLX",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: MetadataRoute.Sitemap = [
    // Top page
    { url: `${BASE_URL}/ja`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    // Diagnostic top
    { url: `${BASE_URL}/ja/sns-brain-type`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    // Types gallery
    { url: `${BASE_URL}/ja/sns-brain-type/types`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];

  // Result pages for all 16 types
  for (const code of SNS_BRAIN_TYPE_CODES) {
    pages.push({
      url: `${BASE_URL}/ja/sns-brain-type/result/${code}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  return pages;
}

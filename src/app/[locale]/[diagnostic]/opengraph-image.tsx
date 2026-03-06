import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { loadDiagnostic, getAllDiagnosticSlugs } from "@/engine/loader";

export const alt = "My Types 診断";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllDiagnosticSlugs().map((diagnostic) => ({ diagnostic }));
}

async function loadImageAsDataUri(relativePath: string): Promise<string> {
  const filePath = join(process.cwd(), "public", relativePath);
  const buf = await readFile(filePath);
  const ext = relativePath.endsWith(".webp") ? "webp" : "png";
  return `data:image/${ext};base64,${buf.toString("base64")}`;
}

async function loadFont(): Promise<ArrayBuffer> {
  const res = await fetch(
    "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@700&display=swap"
  );
  const css = await res.text();
  const match = css.match(/src:\s*url\(([^)]+)\)/);
  if (!match) throw new Error("Font URL not found");
  const fontRes = await fetch(match[1]);
  return fontRes.arrayBuffer();
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ diagnostic: string }>;
}) {
  const { diagnostic } = await params;
  const config = loadDiagnostic(diagnostic);
  if (!config) return new Response("Not found", { status: 404 });

  const [from, to] = config.meta.theme.gradient;

  // Load up to 6 character images for the banner
  const typesWithImages = config.types.filter((t) => t.image);
  const selected = typesWithImages.slice(0, 6);
  const images = await Promise.all(
    selected.map(async (t) => {
      try {
        return await loadImageAsDataUri(t.image!);
      } catch {
        return null;
      }
    })
  );

  const font = await loadFont();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: `linear-gradient(135deg, ${from}, ${to})`,
          fontFamily: '"Noto Sans JP"',
        }}
      >
        {/* Character images row */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            gap: "8px",
            marginBottom: "32px",
          }}
        >
          {images.map(
            (src, i) =>
              src && (
                <img
                  key={i}
                  src={src}
                  width={140}
                  height={140}
                  style={{ objectFit: "contain" }}
                />
              )
          )}
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              color: "white",
              textShadow: "0 2px 8px rgba(0,0,0,0.3)",
              textAlign: "center",
              lineHeight: 1.2,
            }}
          >
            {config.meta.title}
          </div>
          <div
            style={{
              fontSize: 28,
              color: "rgba(255,255,255,0.85)",
              marginTop: "12px",
            }}
          >
            全{config.types.length}タイプ
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            position: "absolute",
            bottom: "24px",
            right: "32px",
            fontSize: 24,
            color: "rgba(255,255,255,0.7)",
          }}
        >
          My Types
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Noto Sans JP",
          data: font,
          style: "normal",
          weight: 700,
        },
      ],
    }
  );
}

import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { loadDiagnostic, getAllDiagnosticSlugs } from "@/engine/loader";

export const alt = "My Types 診断結果";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  const params: { diagnostic: string; slug: string }[] = [];
  for (const diagnostic of getAllDiagnosticSlugs()) {
    const config = loadDiagnostic(diagnostic);
    if (!config) continue;
    for (const type of config.types) {
      params.push({ diagnostic, slug: type.slug });
    }
  }
  return params;
}

async function loadImageAsDataUri(relativePath: string): Promise<string> {
  const filePath = join(process.cwd(), "public", relativePath);
  const buf = await readFile(filePath);
  const ext = relativePath.endsWith(".webp") ? "webp" : "png";
  return `data:image/${ext};base64,${buf.toString("base64")}`;
}

async function loadFont(): Promise<ArrayBuffer> {
  const res = await fetch(
    "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap"
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
  params: Promise<{ diagnostic: string; slug: string }>;
}) {
  const { diagnostic, slug } = await params;
  const config = loadDiagnostic(diagnostic);
  if (!config) return new Response("Not found", { status: 404 });

  const type = config.types.find((t) => t.slug === slug);
  if (!type) return new Response("Not found", { status: 404 });

  const group = config.groups.find((g) => g.key === type.groupKey);
  const groupColor = group?.color ?? "#9333ea";

  // Load character image
  let imageDataUri: string | null = null;
  if (type.image) {
    try {
      imageDataUri = await loadImageAsDataUri(type.image);
    } catch {
      // no image fallback
    }
  }

  const font = await loadFont();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: `linear-gradient(135deg, ${groupColor}22, ${groupColor}44)`,
          fontFamily: '"Noto Sans JP"',
          position: "relative",
        }}
      >
        {/* Left accent bar */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "8px",
            background: groupColor,
          }}
        />

        {/* Character image (right side) */}
        {imageDataUri && (
          <div
            style={{
              position: "absolute",
              right: "40px",
              bottom: "0px",
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <img
              src={imageDataUri}
              width={360}
              height={480}
              style={{ objectFit: "contain" }}
            />
          </div>
        )}

        {/* Text content (left side) */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "48px 60px",
            maxWidth: imageDataUri ? "720px" : "100%",
          }}
        >
          {/* Diagnostic title label */}
          <div
            style={{
              fontSize: 22,
              color: groupColor,
              fontWeight: 700,
              marginBottom: "8px",
            }}
          >
            {config.meta.title}
          </div>

          {/* Headline */}
          <div
            style={{
              fontSize: 28,
              color: "#374151",
              marginBottom: "16px",
            }}
          >
            私の結果は…
          </div>

          {/* Type name */}
          <div
            style={{
              fontSize: 48,
              fontWeight: 700,
              color: "#111827",
              lineHeight: 1.2,
              marginBottom: "16px",
            }}
          >
            {type.emoji} {type.name}
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: 22,
              color: "#6B7280",
              lineHeight: 1.5,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {type.description}
          </div>

          {/* Group badge */}
          <div
            style={{
              display: "flex",
              marginTop: "24px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: `${groupColor}20`,
                borderRadius: "9999px",
                padding: "8px 20px",
                fontSize: 18,
                color: groupColor,
                fontWeight: 700,
              }}
            >
              {group?.emoji} {group?.label}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "60px",
            fontSize: 20,
            color: "#9CA3AF",
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

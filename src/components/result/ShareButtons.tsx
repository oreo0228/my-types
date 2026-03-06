"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

interface ShareButtonsProps {
  shareText: string;
  heading?: string;
  subtext?: string;
}

export default function ShareButtons({
  shareText,
  heading,
  subtext,
}: ShareButtonsProps) {
  const t = useTranslations();
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
  const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      alert(t("share.copied"));
    } catch {
      alert(t("share.copyFailed"));
    }
  }

  return (
    <div className="flex flex-col gap-3 w-full max-w-lg mx-auto mt-6">
      <p className="text-center text-sm font-medium text-gray-500">
        {heading ?? t("result.shareHeading")}
      </p>
      {subtext && (
        <p className="text-center text-xs text-gray-400">
          {subtext}
        </p>
      )}
      <div className="flex gap-3">
        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-black text-white font-medium text-sm hover:bg-gray-800 transition-colors"
        >
          {t("share.twitter")}
        </a>
        <a
          href={lineUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#06C755] text-white font-medium text-sm hover:bg-[#05b34c] transition-colors"
        >
          {t("share.line")}
        </a>
      </div>
      <button
        onClick={handleCopy}
        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-medium text-sm hover:bg-gray-50 transition-colors"
      >
        {t("share.copyLink")}
      </button>
    </div>
  );
}

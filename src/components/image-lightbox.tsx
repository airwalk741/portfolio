"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type ImageLightboxProps = {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
};

export function ImageLightbox({
  src,
  alt,
  className = "",
  aspectRatio = "aspect-[16/9]",
}: ImageLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={() => setIsOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsOpen(true);
          }
        }}
        className={`group relative cursor-zoom-in overflow-hidden rounded-lg transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${className}`}
        aria-label={`${alt} 크게 보기`}
      >
        <div className={`relative w-full ${aspectRatio} overflow-hidden rounded-lg bg-surface`}>
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-contain transition-transform duration-200 group-hover:scale-[1.01]"
          />
        </div>
        {/* Hover hint badge */}
        <div className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-foreground/80 px-3 py-1 text-xs font-medium text-background opacity-0 shadow-lg backdrop-blur-sm transition-opacity group-hover:opacity-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="11" y1="8" x2="11" y2="14" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
          <span>클릭하여 전체화면</span>
        </div>
      </div>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm animate-in fade-in duration-150"
          onClick={() => setIsOpen(false)}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute right-4 top-4 z-10 flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="닫기"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Fullscreen image container */}
          <div
            className="relative flex h-full max-h-[92vh] w-full max-w-[95vw] items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={src}
              alt={alt}
              className="max-h-[92vh] max-w-[95vw] rounded-lg object-contain shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  );
}

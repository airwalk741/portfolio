"use client";

import { useEffect, useRef, useState } from "react";
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
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, posX: 0, posY: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // 모달 오픈/클로즈 시 상태 리셋 및 ESC 키/스크롤 차단
  useEffect(() => {
    if (!isOpen) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
      setIsDragging(false);
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      } else if (e.key === "+" || e.key === "=") {
        setScale((prev) => Math.min(prev + 0.25, 5));
      } else if (e.key === "-" || e.key === "_") {
        setScale((prev) => {
          const next = Math.max(prev - 0.25, 1);
          if (next === 1) setPosition({ x: 0, y: 0 });
          return next;
        });
      } else if (e.key === "0") {
        setScale(1);
        setPosition({ x: 0, y: 0 });
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

  // 마우스 휠 스크롤 줌 핸들링 (non-passive 이벤트)
  useEffect(() => {
    if (!isOpen) return;

    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const zoomFactor = e.deltaY < 0 ? 0.25 : -0.25;
      setScale((prevScale) => {
        const nextScale = Math.min(Math.max(Number((prevScale + zoomFactor).toFixed(2)), 1), 5);
        if (nextScale === 1) {
          setPosition({ x: 0, y: 0 });
        }
        return nextScale;
      });
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [isOpen]);

  // 마우스 드래그 이동 (Pan)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      posX: position.x,
      posY: position.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || scale <= 1) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    setPosition({
      x: dragStartRef.current.posX + dx,
      y: dragStartRef.current.posY + dy,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // 더블 클릭 시 줌 토글
  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (scale > 1) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    } else {
      setScale(2);
    }
  };

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale((prev) => Math.min(prev + 0.3, 5));
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale((prev) => {
      const next = Math.max(prev - 0.3, 1);
      if (next === 1) setPosition({ x: 0, y: 0 });
      return next;
    });
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <>
      {/* 썸네일/인라인 뷰 */}
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
          <span>클릭하여 전체화면 (휠 줌 지원)</span>
        </div>
      </div>

      {/* 전체화면 줌/팬 모달 */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md animate-in fade-in duration-150 select-none"
          onClick={() => setIsOpen(false)}
        >
          {/* 상단 툴바 / 컨트롤 */}
          <div
            className="absolute top-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-black/60 px-4 py-2 text-white shadow-2xl backdrop-blur-md"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={handleZoomOut}
              disabled={scale <= 1}
              className="flex size-8 items-center justify-center rounded-full transition hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-transparent"
              aria-label="축소"
              title="축소 (-)"
            >
              <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="px-2 text-xs font-semibold tabular-nums hover:text-primary transition"
              title="클릭 시 100%로 초기화"
            >
              {Math.round(scale * 100)}%
            </button>

            <button
              type="button"
              onClick={handleZoomIn}
              disabled={scale >= 5}
              className="flex size-8 items-center justify-center rounded-full transition hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-transparent"
              aria-label="확대"
              title="확대 (+)"
            >
              <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>

            <div className="h-4 w-px bg-white/20 mx-1" />

            <button
              type="button"
              onClick={handleReset}
              className="px-2 py-1 text-xs rounded hover:bg-white/20 transition text-zinc-300 hover:text-white"
            >
              초기화
            </button>
          </div>

          {/* 닫기 버튼 */}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute right-5 top-5 z-20 flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="닫기 (ESC)"
            title="닫기 (ESC)"
          >
            <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* 하단 단축키/조작 가이드 */}
          <div className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-4 py-1.5 text-xs text-zinc-300 backdrop-blur-md">
            마우스 휠: 확대/축소 · 드래그: 이동 · 더블클릭: 확대/리셋 · ESC: 닫기
          </div>

          {/* 뷰포트 컨테이너 */}
          <div
            ref={containerRef}
            className={`relative flex h-full w-full items-center justify-center overflow-hidden p-6 ${
              scale > 1
                ? isDragging
                  ? "cursor-grabbing"
                  : "cursor-grab"
                : "cursor-zoom-in"
            }`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onDoubleClick={handleDoubleClick}
            onClick={(e) => {
              // 배경 클릭 시에만 닫힘
              if (e.target === containerRef.current) {
                setIsOpen(false);
              }
            }}
          >
            <div
              className="relative flex items-center justify-center transition-transform duration-75 ease-out will-change-transform"
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              }}
            >
              <img
                src={src}
                alt={alt}
                draggable={false}
                className="max-h-[88vh] max-w-[92vw] select-none rounded-lg object-contain shadow-2xl"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

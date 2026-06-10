"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CarouselItem {
  id: string;
  title: string;
  category: string;
  description?: string;
}

interface RotatingCarouselProps {
  items: CarouselItem[];
  className?: string;
}

export function RotatingCarousel({ items, className }: RotatingCarouselProps) {
  const [rotation, setRotation] = useState(0);
  const [selectedItem, setSelectedItem] = useState<CarouselItem | null>(null);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const [radius, setRadius] = useState(320);

  const count = items.length;
  const angleStep = 360 / count;

  // Responsive radius
  useEffect(() => {
    const updateRadius = () => {
      setRadius(window.innerWidth < 640 ? 180 : 320);
    };
    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  // Animation loop — only pauses when modal is open
  useEffect(() => {
    const animate = (time: number) => {
      if (lastTimeRef.current === 0) lastTimeRef.current = time;
      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;

      if (!selectedItem) {
        // Positive = counter-clockwise (items move left-to-right in front)
        setRotation((prev) => (prev + delta * 0.012) % 360);
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [selectedItem]);

  const handleItemClick = useCallback((item: CarouselItem) => {
    setSelectedItem(item);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedItem(null);
    lastTimeRef.current = 0; // Reset so delta doesn't jump
  }, []);

  return (
    <>
      <div
        className={cn("relative mx-auto", className)}
        style={{ height: radius * 2 + 100, perspective: "1200px" }}
      >
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          {items.map((item, i) => {
            const angle = angleStep * i + rotation;
            const rad = (angle * Math.PI) / 180;
            const x = Math.sin(rad) * radius;
            const z = Math.cos(rad) * radius;
            const scale = (z + radius) / (2 * radius); // 0..1
            const opacity = 0.3 + scale * 0.7;
            const zIndex = Math.round(scale * 100);

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleItemClick(item)}
                className="absolute flex cursor-pointer flex-col items-center transition-none"
                style={{
                  transform: `translateX(${x}px) scale(${0.55 + scale * 0.45})`,
                  opacity,
                  zIndex,
                  willChange: "transform, opacity",
                }}
              >
                <div className="w-44 overflow-hidden rounded-2xl bg-muted shadow-lg ring-1 ring-black/5 sm:w-56">
                  <div className="aspect-[4/5] flex items-center justify-center text-muted-foreground text-sm">
                    Foto real
                  </div>
                </div>
                <div className="mt-3 text-center">
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                    {item.category}
                  </p>
                  <p className="mt-0.5 text-sm font-medium">{item.title}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Polaroid Modal ── */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-5"
          onClick={handleCloseModal}
        >
          <div
            className="relative w-full max-w-sm animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Polaroid card */}
            <div className="overflow-hidden rounded-2xl bg-white p-4 shadow-2xl">
              {/* Photo area */}
              <div className="aspect-[4/5] overflow-hidden rounded-xl bg-muted">
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  Foto real: {selectedItem.title}
                </div>
              </div>

              {/* Caption area — like a polaroid bottom strip */}
              <div className="mt-4 space-y-1 px-1 pb-2">
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                  {selectedItem.category}
                </p>
                <h3 className="font-display text-xl font-light tracking-tight">
                  {selectedItem.title}
                </h3>
                {selectedItem.description && (
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {selectedItem.description}
                  </p>
                )}
              </div>
            </div>

            {/* Close button */}
            <button
              type="button"
              onClick={handleCloseModal}
              className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md transition-transform hover:scale-110"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

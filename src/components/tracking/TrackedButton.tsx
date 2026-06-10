"use client";

import { type ButtonHTMLAttributes } from "react";
import { trackEvent, type TrackingEvent } from "@/lib/tracking";
import { cn } from "@/lib/utils";

interface TrackedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  trackingEvent: TrackingEvent;
  asChild?: boolean;
}

export function TrackedButton({
  trackingEvent,
  onClick,
  children,
  className,
  ...props
}: TrackedButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    trackEvent(trackingEvent);
    onClick?.(e);
  };

  return (
    <button
      className={cn(className)}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}

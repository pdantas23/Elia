"use client";

import { type AnchorHTMLAttributes } from "react";
import { trackEvent, type TrackingEvent } from "@/lib/tracking";
import { cn } from "@/lib/utils";

interface TrackedLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  trackingEvent: TrackingEvent;
}

export function TrackedLink({
  trackingEvent,
  onClick,
  children,
  className,
  ...props
}: TrackedLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    trackEvent(trackingEvent);
    onClick?.(e);
  };

  return (
    <a className={cn(className)} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}

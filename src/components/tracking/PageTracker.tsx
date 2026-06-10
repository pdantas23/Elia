"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/tracking";
import { captureUtms } from "@/lib/tracking/utms";

export function PageTracker() {
  const pathname = usePathname();

  useEffect(() => {
    captureUtms();
    trackEvent({ name: "page_view", page: pathname });
  }, [pathname]);

  return null;
}

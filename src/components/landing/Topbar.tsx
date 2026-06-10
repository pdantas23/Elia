"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { assetPath } from "@/lib/utils";

type TopbarProps = {
  /** Where the logo links to. Defaults to `/links`. */
  homeHref?: string;
};

export function Topbar({ homeHref = "/links" }: TopbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-scrolled={scrolled || undefined}
      className="sticky top-0 z-50 bg-[rgba(244,240,235,0.78)] [backdrop-filter:blur(14px)_saturate(160%)] [-webkit-backdrop-filter:blur(14px)_saturate(160%)] border-b border-transparent data-[scrolled]:border-[rgba(42,38,34,0.10)] transition-[border-color,background-color] duration-200"
    >
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 max-w-[1200px] mx-auto px-[clamp(20px,5vw,56px)] py-4">
        <Link
          href={homeHref}
          aria-label="Eliá, voltar à página inicial"
          className="col-start-2 justify-self-center inline-flex"
        >
          <Image
            src={assetPath("/images/brand/elia-logotipo.png")}
            alt="Eliá"
            width={1261}
            height={531}
            style={{ height: 48, width: "auto" }}
            priority
          />
        </Link>
        <div className="col-start-3 justify-self-end flex items-center gap-2" />
      </div>
    </header>
  );
}

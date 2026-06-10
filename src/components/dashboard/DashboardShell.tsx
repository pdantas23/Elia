"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { assetPath, cn } from "@/lib/utils";

interface DashboardShellProps {
  user: {
    id: string;
    email: string;
    fullName: string;
    role: "marketing" | "comercial";
  };
  children: React.ReactNode;
}

const NAV_ITEMS = [
  { href: "/dashboard", label: "Visão Geral", icon: LayoutDashboard },
  { href: "/dashboard/leads", label: "Leads", icon: Users },
];

const ROLE_LABELS: Record<string, string> = {
  marketing: "Marketing",
  comercial: "Comercial",
};

export function DashboardShell({ user, children }: DashboardShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/login");
  }

  const logo = (
    <Image
      src={assetPath("/images/brand/elia-logotipo.png")}
      alt="Eliá"
      width={1261}
      height={531}
      priority
      className="h-9 w-auto"
    />
  );

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar — left on desktop, slides from right on mobile */}
      <aside
        className={cn(
          "fixed inset-y-0 right-0 z-40 w-64 transform border-l border-muted bg-white transition-transform",
          "md:relative md:right-auto md:left-0 md:translate-x-0 md:border-l-0 md:border-r",
          sidebarOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex h-full flex-col">
          <div className="relative flex h-16 items-center justify-center border-b border-muted px-5">
            {logo}
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="absolute right-4 top-1/2 -translate-y-1/2 md:hidden"
              aria-label="Fechar menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 space-y-1 px-3 py-4">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active =
                item.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname?.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-foreground/5 text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {active && (
                    <span
                      aria-hidden
                      className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-foreground"
                    />
                  )}
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-muted p-4">
            <div className="mb-3">
              <p className="text-sm font-medium truncate">{user.fullName || user.email}</p>
              <span className="inline-block mt-1 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                {ROLE_LABELS[user.role]}
              </span>
            </div>
            <button
              type="button"
              onClick={handleSignOut}
              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Sair
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="relative flex h-14 items-center justify-center border-b border-muted bg-white px-5 md:hidden">
          {logo}
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="absolute right-4 top-1/2 -translate-y-1/2"
            aria-label="Abrir menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </header>
        <main className="flex-1 overflow-y-auto p-5 md:p-8">{children}</main>
      </div>
    </div>
  );
}

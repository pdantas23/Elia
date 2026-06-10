"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useId,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

/* ──────────────────── Types ──────────────────── */

export interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  className?: string;
  id?: string;
  name?: string;
  /** Variante compacta (pílula) para uso em células de tabela. */
  compact?: boolean;
  /** Classes extras aplicadas ao botão gatilho (ex.: cor do status). */
  triggerClassName?: string;
}

/* ──────────────────── Component ──────────────────── */

export function Dropdown({
  options,
  value,
  onChange,
  placeholder = "Selecione",
  label,
  error,
  className,
  id: externalId,
  name,
  compact = false,
  triggerClassName,
}: DropdownProps) {
  const internalId = useId();
  const id = externalId ?? internalId;

  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
  const [mounted, setMounted] = useState(false);

  const selectedOption = options.find((o) => o.value === value);

  // Portal mount guard
  useEffect(() => setMounted(true), []);

  // Calculate position when opening
  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const dropdownHeight = Math.min(options.length * 44 + 16, 264); // max ~6 items

    const goUp = spaceBelow < dropdownHeight && rect.top > spaceBelow;

    setPosition({
      top: goUp ? rect.top - dropdownHeight - 4 : rect.bottom + 4,
      left: rect.left,
      width: rect.width,
    });
  }, [options.length]);

  const openDropdown = useCallback(() => {
    updatePosition();
    setOpen(true);
    setHighlightedIndex(
      value ? options.findIndex((o) => o.value === value) : 0
    );
  }, [updatePosition, value, options]);

  const closeDropdown = useCallback(() => {
    setOpen(false);
    setHighlightedIndex(-1);
    triggerRef.current?.focus();
  }, []);

  const selectOption = useCallback(
    (opt: DropdownOption) => {
      onChange?.(opt.value);
      closeDropdown();
    },
    [onChange, closeDropdown]
  );

  // Reposition on scroll / resize while open
  useEffect(() => {
    if (!open) return;
    const handler = () => updatePosition();
    window.addEventListener("scroll", handler, true);
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("scroll", handler, true);
      window.removeEventListener("resize", handler);
    };
  }, [open, updatePosition]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        !triggerRef.current?.contains(target) &&
        !listRef.current?.contains(target)
      ) {
        closeDropdown();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, closeDropdown]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDropdown();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, closeDropdown]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!open) {
        if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openDropdown();
        }
        return;
      }

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev < options.length - 1 ? prev + 1 : 0
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev > 0 ? prev - 1 : options.length - 1
          );
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          if (highlightedIndex >= 0 && options[highlightedIndex]) {
            selectOption(options[highlightedIndex]);
          }
          break;
        case "Escape":
          e.preventDefault();
          closeDropdown();
          break;
      }
    },
    [open, openDropdown, highlightedIndex, options, selectOption, closeDropdown]
  );

  // Scroll highlighted into view
  useEffect(() => {
    if (!open || highlightedIndex < 0 || !listRef.current) return;
    const items = listRef.current.querySelectorAll("[data-dropdown-item]");
    items[highlightedIndex]?.scrollIntoView({ block: "nearest" });
  }, [highlightedIndex, open]);

  return (
    <div className={cn(compact ? "relative inline-block" : "relative", className)}>
      {/* Hidden native input for form compatibility */}
      {name && <input type="hidden" name={name} value={value ?? ""} />}

      {/* Trigger */}
      <button
        ref={triggerRef}
        type="button"
        id={id}
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-labelledby={label ? `${id}-label` : undefined}
        onClick={() => (open ? closeDropdown() : openDropdown())}
        onKeyDown={handleKeyDown}
        className={cn(
          "flex items-center justify-between outline-none transition-all",
          compact
            ? "h-7 cursor-pointer rounded-full pl-2.5 pr-2 text-xs font-medium"
            : cn(
                "w-full rounded-xl border-2 bg-white px-4 text-left text-[15px]",
                "h-[54px] pb-3 pt-6",
                open ? "border-foreground" : "border-muted/80",
                error ? "border-red-400" : ""
              ),
          triggerClassName
        )}
      >
        <span
          className={cn(
            "truncate",
            !compact && (selectedOption ? "text-foreground" : "text-muted-foreground")
          )}
        >
          {selectedOption?.label ?? placeholder}
        </span>
        <ChevronDown
          className={cn(
            "ml-1.5 shrink-0 transition-transform",
            compact ? "h-3.5 w-3.5" : "ml-2 h-4 w-4 text-muted-foreground",
            open && "rotate-180"
          )}
        />
      </button>

      {/* Floating label */}
      {label && !compact && (
        <span
          id={`${id}-label`}
          className="pointer-events-none absolute left-4 top-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground"
        >
          {label}
        </span>
      )}

      {/* Error */}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}

      {/* Portal dropdown list */}
      {open &&
        mounted &&
        createPortal(
          <div
            ref={listRef}
            role="listbox"
            aria-labelledby={label ? `${id}-label` : undefined}
            className="fixed z-[9999] overflow-hidden rounded-xl border border-muted/60 bg-white shadow-xl shadow-black/10"
            style={{
              top: position.top,
              left: position.left,
              width: compact ? "auto" : position.width,
              minWidth: compact ? Math.max(position.width, 168) : undefined,
            }}
          >
            <div className="max-h-[248px] overflow-y-auto py-1.5">
              {options.map((opt, i) => {
                const isSelected = opt.value === value;
                const isHighlighted = i === highlightedIndex;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    role="option"
                    data-dropdown-item
                    aria-selected={isSelected}
                    onClick={() => selectOption(opt)}
                    onMouseEnter={() => setHighlightedIndex(i)}
                    className={cn(
                      "flex w-full items-center gap-3 px-4 py-2.5 text-left text-[15px] transition-colors",
                      isHighlighted && "bg-foreground/5",
                      isSelected && "font-medium"
                    )}
                  >
                    <span className="flex-1 truncate">{opt.label}</span>
                    {isSelected && (
                      <Check className="h-4 w-4 shrink-0 text-foreground" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}

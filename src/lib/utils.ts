import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatPercent(value: number): string {
  return `${Math.round(value)}%`;
}

export function formatDate(value: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export function formatRelativeTime(value: string): string {
  const deltaMs = new Date(value).getTime() - Date.now();
  const deltaHours = Math.round(deltaMs / 3_600_000);
  if (Math.abs(deltaHours) < 24) {
    return `${Math.abs(deltaHours)}h ${deltaHours < 0 ? "ago" : "from now"}`;
  }

  const deltaDays = Math.round(deltaHours / 24);
  return `${Math.abs(deltaDays)}d ${deltaDays < 0 ? "ago" : "from now"}`;
}

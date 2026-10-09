
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 2,
  }).format(price);
}

export function getUnitLabel(unit: string): string {
  const units: Record<string, string> = {
    kg: "প্রতি কেজি",
    litre: "প্রতি লিটার",
    dozen: "প্রতি ডজন",
    piece: "প্রতি পিস",
  };

  return units[unit] ?? `প্রতি ${unit}`;
}

export function getChangeLabel(pct: number): string {
  const formatted = new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 1,
  }).format(Math.abs(pct));

  if (pct > 0) {
    return `▲ ${formatted}%`;
  }

  if (pct < 0) {
    return `▼ ${formatted}%`;
  }

  return "— ০.০%";
}

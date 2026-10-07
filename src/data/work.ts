export interface WorkLink {
  label: string;
  href: string;
}

export interface WorkEntry {
  title: string;
  description: string;
  area: string;
  // Use only for entries that explicitly still need factual details.
  draftNote?: string;
  links?: WorkLink[];
}

// Add real projects here when ready. An empty list shows "Coming soon".
// Each entry can include a specific contribution and optional public links.
export const work: WorkEntry[] = [];

"use client";

export interface ProjectItem {
  id: string;
  clientEmail: string;
  clientName: string;
  clientPhone?: string;
  name: string;
  type: "Website" | "Custom Software" | "AI Automation";
  scale: "Startup" | "Growth Enterprise" | "Custom Agency";
  totalQuotation: number;
  priceFixedByAdmin?: boolean;
  progressPercent: number;
  status:
    | "Quotation Under Discussion"
    | "Quotation Requested"
    | "Architecture & Setup"
    | "In Development"
    | "In QA & Testing"
    | "Awaiting 90% Payment"
    | "Deployed (100%)";
  assignedTeam: {
    architect: string;
    qaLead: string;
    designer: string;
  };
  payments: {
    downPayment40: { amount: number; status: "PAID" | "PENDING" };
    midPayment50: { amount: number; status: "PAID" | "DUE" | "PENDING" };
    finalPayment10: { amount: number; status: "PAID" | "PENDING" };
  };
  updatesWarranty: {
    active: boolean;
    validUntil: string;
  };
  testDetails: {
    passedSuites: number;
    totalSuites: number;
    lastAudit: string;
  };
  createdAt: string;
  notes?: string;
}

const STORAGE_KEY = "cortex_client_projects_v2";
const BACKEND_API = process.env.NEXT_PUBLIC_API || "http://localhost:4000/";

export function getAllProjects(): ProjectItem[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

export function getProjectsByClientEmail(email: string): ProjectItem[] {
  if (!email) return [];
  const all = getAllProjects();
  const normalized = email.toLowerCase().trim();
  return all.filter((p) => p.clientEmail.toLowerCase().trim() === normalized);
}

export function saveAllProjects(projects: ProjectItem[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  window.dispatchEvent(new Event("cortex_projects_updated"));
}

export function createProject(newProj: Omit<ProjectItem, "id" | "createdAt">): ProjectItem {
  const all = getAllProjects();
  const id = `CTX-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  const created: ProjectItem = {
    ...newProj,
    id,
    createdAt: new Date().toISOString(),
  };
  const updated = [created, ...all];
  saveAllProjects(updated);

  // Sync to PostgreSQL backend asynchronously
  fetch(`${BACKEND_API}api/projects`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(created),
  }).catch((err) => console.log("Backend DB sync notice:", err));

  return created;
}

export function updateProject(id: string, updates: Partial<ProjectItem>): ProjectItem | null {
  const all = getAllProjects();
  const idx = all.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  const updatedItem = { ...all[idx], ...updates };
  all[idx] = updatedItem;
  saveAllProjects(all);

  // Sync to PostgreSQL backend asynchronously
  fetch(`${BACKEND_API}api/projects`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedItem),
  }).catch((err) => console.log("Backend DB sync notice:", err));

  return updatedItem;
}

export function deleteProject(id: string): void {
  const all = getAllProjects();
  const updated = all.filter((p) => p.id !== id);
  saveAllProjects(updated);

  // Sync delete to PostgreSQL backend asynchronously
  fetch(`${BACKEND_API}api/projects/${id}`, {
    method: "DELETE",
  }).catch((err) => console.log("Backend DB sync notice:", err));
}

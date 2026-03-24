import { createClient } from "@supabase/supabase-js";

const supabaseUrl     = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ─── TYPES ────────────────────────────────────────────────────────────────────
export type Project = {
  id:           string;
  title:        string;
  category:     "Network" | "Web Dev" | "IT Support" | "Cybersecurity";
  description:  string;
  cover_image_url: string | null;
  images:       string[];        // array of Supabase Storage URLs
  live_url:     string | null;
  tags:         string[];
  featured:     boolean;
  order:        number;
  created_at:   string;
};

// ─── QUERIES ──────────────────────────────────────────────────────────────────
export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("order", { ascending: true });

  if (error) {
    console.error("Error fetching projects:", error.message);
    return [];
  }
  return data as Project[];
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("featured", true)
    .order("order", { ascending: true });

  if (error) {
    console.error("Error fetching featured projects:", error.message);
    return [];
  }
  return data as Project[];
}

export async function getProjectById(id: string): Promise<Project | null> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data as Project;
}
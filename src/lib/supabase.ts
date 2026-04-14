import { createClient } from "@supabase/supabase-js";

const supabaseUrl     = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Public client — read only, used everywhere on the site
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client — uses service role key, only used in admin pages/API routes
export function getAdminClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) throw new Error("SUPABASE_SERVICE_ROLE_KEY not set");
  return createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

// ─── TYPES ────────────────────────────────────────────────────────────────────
export type Project = {
  id:              string;
  title:           string;
  category:        "Network" | "Web Dev" | "IT Support" | "Cybersecurity";
  description:     string;
  cover_image_url: string | null;
  images:          string[];
  live_url:        string | null;
  tags:            string[];
  featured:        boolean;
  order:           number;
  created_at:      string;
};

export type CourseBadge = {
  id:           string;
  name:         string;
  issuer:       string;
  parent_cert:  string;
  badge_url:    string | null;
  image_url:    string | null;
  completed_at: string | null;
  order:        number;
  created_at:   string;
};

// ─── PUBLIC QUERIES ───────────────────────────────────────────────────────────
export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("order", { ascending: true });

  if (error) { console.error("Error fetching projects:", error.message); return []; }
  return data as Project[];
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("featured", true)
    .order("order", { ascending: true });

  if (error) { console.error("Error fetching featured projects:", error.message); return []; }
  return data as Project[];
}

export async function getCourseBadges(parentCert?: string): Promise<CourseBadge[]> {
  let query = supabase
    .from("course_badges")
    .select("*")
    .order("order", { ascending: true });

  if (parentCert) query = query.eq("parent_cert", parentCert);

  const { data, error } = await query;
  if (error) { console.error("Error fetching badges:", error.message); return []; }
  return data as CourseBadge[];
}
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

// Service-role client for server-only privileged reads — currently just
// looking up a user's email by id, since auth.users isn't reachable
// through the regular RLS-scoped client. Never import this from a
// client component.
export function createAdminClient() {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
}

export async function getUserEmail(userId: string): Promise<string | null> {
  // Notifications are a progressive enhancement — a missing/invalid
  // service role key should never take down the flow that triggers them.
  try {
    const admin = createAdminClient();
    const { data, error } = await admin.auth.admin.getUserById(userId);
    if (error || !data.user) return null;
    return data.user.email ?? null;
  } catch (err) {
    console.error("getUserEmail failed:", err);
    return null;
  }
}

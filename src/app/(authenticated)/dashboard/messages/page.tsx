import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function MessagesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const role = user.user_metadata?.role;
  type ConversationRow = {
    id: string;
    updated_at: string;
    name: string;
    avatarUrl: string | null;
  };
  let conversations: ConversationRow[] = [];

  if (role === "studio_owner") {
    const { data: studio } = await supabase
      .from("studios")
      .select("id")
      .eq("owner_id", user.id)
      .maybeSingle();

    if (studio) {
      const { data } = await supabase
        .from("conversations")
        .select("id, updated_at, profiles(full_name, avatar_url)")
        .eq("studio_id", studio.id)
        .order("updated_at", { ascending: false });

      conversations = (data ?? []).map((c) => ({
        id: c.id,
        updated_at: c.updated_at,
        name: c.profiles?.full_name ?? "Instructor",
        avatarUrl: c.profiles?.avatar_url ?? null,
      }));
    }
  } else if (role === "instructor") {
    const { data } = await supabase
      .from("conversations")
      .select("id, updated_at, studios(name, profiles(avatar_url))")
      .eq("instructor_id", user.id)
      .order("updated_at", { ascending: false });

    conversations = (data ?? []).map((c) => ({
      id: c.id,
      updated_at: c.updated_at,
      name: c.studios?.name ?? "Studio",
      avatarUrl: c.studios?.profiles?.avatar_url ?? null,
    }));
  }

  return (
    <main className="flex flex-1 flex-col px-6 py-12">
      <h1 className="font-heading text-2xl font-extrabold text-ink">
        Messages
      </h1>
      <p className="mt-2 text-sm font-light text-ink/60">
        Conversations between you and{" "}
        {role === "studio_owner" ? "instructors" : "studios"}.
      </p>

      <div className="mt-8 max-w-xl divide-y divide-mauve/10 rounded-2xl border border-mauve/20 bg-white shadow-sm">
        {conversations.map((c) => (
          <Link
            key={c.id}
            href={`/dashboard/messages/${c.id}`}
            className="flex items-center gap-3 px-6 py-4 transition-colors hover:bg-mist"
          >
            <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-mist">
              {c.avatarUrl ? (
                <Image
                  src={c.avatarUrl}
                  alt={c.name}
                  width={40}
                  height={40}
                  unoptimized
                  className="h-full w-full object-cover"
                />
              ) : null}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-ink">{c.name}</p>
              <p className="text-xs text-ink/50">
                {new Date(c.updated_at).toLocaleString()}
              </p>
            </div>
          </Link>
        ))}

        {conversations.length === 0 && (
          <p className="px-6 py-8 text-sm text-ink/60">
            No conversations yet.
          </p>
        )}
      </div>
    </main>
  );
}

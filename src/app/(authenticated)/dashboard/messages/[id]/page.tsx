import Image from "next/image";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { sendMessage } from "../actions";

export default async function ConversationPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const { error: errorParam } = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: conversation } = await supabase
    .from("conversations")
    .select(
      "*, profiles(full_name, avatar_url), studios(name, profiles(full_name, avatar_url))",
    )
    .eq("id", id)
    .maybeSingle();

  if (!conversation) {
    redirect("/dashboard/messages");
  }

  const role = user.user_metadata?.role;
  const otherParty =
    role === "studio_owner"
      ? {
          name: conversation.profiles?.full_name ?? "Instructor",
          avatarUrl: conversation.profiles?.avatar_url ?? null,
        }
      : {
          name: conversation.studios?.name ?? "Studio",
          avatarUrl: conversation.studios?.profiles?.avatar_url ?? null,
        };

  const { data: messages } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", id)
    .order("created_at", { ascending: true });

  return (
    <main className="flex flex-1 flex-col px-6 py-12">
      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-mist">
            {otherParty.avatarUrl ? (
              <Image
                src={otherParty.avatarUrl}
                alt={otherParty.name}
                width={40}
                height={40}
                unoptimized
                className="h-full w-full object-cover"
              />
            ) : null}
          </div>
          <h1 className="font-heading text-xl font-extrabold text-ink">
            {otherParty.name}
          </h1>
        </div>

        <div className="mt-6 flex flex-1 flex-col gap-3 rounded-2xl border border-mauve/20 bg-white p-6 shadow-sm">
          {messages?.map((message) => {
            const isMine = message.sender_id === user.id;
            return (
              <div
                key={message.id}
                className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${
                  isMine
                    ? "self-end bg-mauve text-sand"
                    : "self-start bg-mist text-ink"
                }`}
              >
                <p>{message.body}</p>
                <p
                  className={`mt-1 text-xs ${isMine ? "text-sand/70" : "text-ink/50"}`}
                >
                  {new Date(message.created_at).toLocaleString()}
                </p>
              </div>
            );
          })}

          {messages && messages.length === 0 && (
            <p className="text-sm text-ink/60">
              Say hello to start the conversation.
            </p>
          )}
        </div>

        {errorParam && (
          <p className="mt-4 rounded-lg bg-rose/10 px-3 py-2 text-sm text-rose">
            {errorParam}
          </p>
        )}

        <form action={sendMessage} className="mt-4 flex gap-2">
          <input type="hidden" name="conversationId" value={id} />
          <input
            type="text"
            name="body"
            required
            placeholder="Write a message..."
            className="flex-1 rounded-full border border-mauve/30 px-4 py-2 text-sm focus:border-mauve focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-full bg-mauve px-6 py-2 text-sm font-medium text-sand transition-colors hover:bg-rose"
          >
            Send
          </button>
        </form>
      </div>
    </main>
  );
}

"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function startConversation(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  if (user.user_metadata?.role !== "studio_owner") {
    redirect("/dashboard");
  }

  const instructorId = String(formData.get("instructorId") ?? "").trim();
  if (!instructorId) {
    redirect("/dashboard/instructors");
  }

  const { data: studio } = await supabase
    .from("studios")
    .select("id")
    .eq("owner_id", user.id)
    .maybeSingle();

  if (!studio) {
    redirect("/onboarding/studio");
  }

  const { data: existing } = await supabase
    .from("conversations")
    .select("id")
    .eq("studio_id", studio.id)
    .eq("instructor_id", instructorId)
    .maybeSingle();

  if (existing) {
    redirect(`/dashboard/messages/${existing.id}`);
  }

  const { data: created, error } = await supabase
    .from("conversations")
    .insert({ studio_id: studio.id, instructor_id: instructorId })
    .select("id")
    .single();

  if (error || !created) {
    redirect(
      `/dashboard/instructors?error=${encodeURIComponent(
        error?.message ?? "Could not start a conversation.",
      )}`,
    );
  }

  redirect(`/dashboard/messages/${created.id}`);
}

export async function sendMessage(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const conversationId = String(formData.get("conversationId") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();

  if (!conversationId || !body) {
    redirect(`/dashboard/messages/${conversationId}`);
  }

  const { error } = await supabase.from("messages").insert({
    conversation_id: conversationId,
    sender_id: user.id,
    body,
  });

  if (error) {
    redirect(
      `/dashboard/messages/${conversationId}?error=${encodeURIComponent(error.message)}`,
    );
  }

  redirect(`/dashboard/messages/${conversationId}`);
}

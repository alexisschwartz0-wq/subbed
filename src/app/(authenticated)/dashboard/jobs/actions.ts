"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getUserEmail } from "@/lib/supabase/admin";
import { sendJobApplicationNotification } from "@/lib/email";
import type { Database } from "@/types/database";

type Discipline = Database["public"]["Enums"]["job_discipline"];
type ListingType = Database["public"]["Enums"]["job_listing_type"];

const DISCIPLINES = new Set<Discipline>([
  "yoga",
  "pilates",
  "sound_bath",
  "barre",
  "cycle",
  "group_fitness",
]);
const LISTING_TYPES = new Set<ListingType>([
  "last_minute_sub",
  "part_time",
  "full_time",
]);

export async function createJobListing(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");
  if (user.user_metadata?.role !== "studio_owner") redirect("/dashboard");

  const { data: studio } = await supabase
    .from("studios")
    .select("id")
    .eq("owner_id", user.id)
    .maybeSingle();

  if (!studio) redirect("/onboarding/studio");

  const title = String(formData.get("title") ?? "").trim();
  const discipline = String(formData.get("discipline") ?? "") as Discipline;
  const listingType = String(formData.get("listingType") ?? "") as ListingType;
  const neededAt = String(formData.get("neededAt") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const payRateDollars = String(formData.get("payRate") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const requirements = String(formData.get("requirements") ?? "").trim();

  if (!title || !DISCIPLINES.has(discipline) || !LISTING_TYPES.has(listingType)) {
    redirect(
      `/dashboard/jobs/new?error=${encodeURIComponent("Please fill in the required fields.")}`,
    );
  }

  const { error } = await supabase.from("job_listings").insert({
    studio_id: studio!.id,
    title,
    discipline,
    listing_type: listingType,
    needed_at: neededAt ? new Date(neededAt).toISOString() : null,
    location: location || null,
    pay_rate_cents: payRateDollars ? Math.round(parseFloat(payRateDollars) * 100) : null,
    description: description || null,
    requirements: requirements || null,
  });

  if (error) {
    redirect(`/dashboard/jobs/new?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/dashboard/jobs");
}

export async function updateJobListingStatus(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const jobListingId = String(formData.get("jobListingId") ?? "").trim();
  const status = String(formData.get("status") ?? "").trim();

  if (!jobListingId || !["active", "filled", "closed"].includes(status)) {
    redirect("/dashboard/jobs");
  }

  await supabase
    .from("job_listings")
    .update({ status: status as Database["public"]["Enums"]["job_listing_status"] })
    .eq("id", jobListingId);

  redirect("/dashboard/jobs");
}

async function expressInterest(
  formData: FormData,
  kind: Database["public"]["Enums"]["job_interest_kind"],
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");
  if (user.user_metadata?.role !== "instructor") redirect("/dashboard");

  const jobListingId = String(formData.get("jobListingId") ?? "").trim();
  const messageBody = String(formData.get("message") ?? "").trim();

  if (!jobListingId) redirect("/dashboard/browse-jobs");

  const { data: listing } = await supabase
    .from("job_listings")
    .select("id, title, studio_id")
    .eq("id", jobListingId)
    .maybeSingle();

  if (!listing) redirect("/dashboard/browse-jobs");

  const { data: existingConversation } = await supabase
    .from("conversations")
    .select("id")
    .eq("studio_id", listing!.studio_id)
    .eq("instructor_id", user.id)
    .maybeSingle();

  let conversationId = existingConversation?.id;

  if (!conversationId) {
    const { data: created, error } = await supabase
      .from("conversations")
      .insert({ studio_id: listing!.studio_id, instructor_id: user.id })
      .select("id")
      .single();

    if (error || !created) {
      redirect(
        `/dashboard/browse-jobs?error=${encodeURIComponent(error?.message ?? "Could not start a conversation.")}`,
      );
    }
    conversationId = created!.id;
  }

  await supabase.from("job_applications").upsert(
    {
      job_listing_id: listing!.id,
      instructor_id: user.id,
      conversation_id: conversationId,
      kind,
    },
    { onConflict: "job_listing_id,instructor_id", ignoreDuplicates: true },
  );

  const defaultBody =
    kind === "application"
      ? `Applied to: ${listing!.title}`
      : messageBody || `I have a question about: ${listing!.title}`;

  await supabase.from("messages").insert({
    conversation_id: conversationId!,
    sender_id: user.id,
    body: defaultBody,
    job_listing_id: listing!.id,
  });

  const { data: studio } = await supabase
    .from("studios")
    .select("owner_id")
    .eq("id", listing!.studio_id)
    .maybeSingle();

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .maybeSingle();

  if (studio && kind === "application") {
    const ownerEmail = await getUserEmail(studio.owner_id);
    if (ownerEmail) {
      await sendJobApplicationNotification(
        ownerEmail,
        profile?.full_name ?? "An instructor",
        listing!.title,
      );
    }
  }

  redirect(`/dashboard/messages/${conversationId}`);
}

export async function applyToListing(formData: FormData) {
  await expressInterest(formData, "application");
}

export async function sendJobInquiry(formData: FormData) {
  await expressInterest(formData, "inquiry");
}

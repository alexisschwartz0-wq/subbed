"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";

type Specialty = Database["public"]["Enums"]["specialty"];
const SPECIALTIES: Specialty[] = ["yoga", "pilates", "sound_bath", "fitness"];

export async function saveInstructorProfile(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const fullName = String(formData.get("fullName") ?? "").trim();
  const bio = String(formData.get("bio") ?? "").trim();
  const city = String(formData.get("city") ?? "").trim();
  const zip = String(formData.get("zip") ?? "").trim();
  const certifications = String(formData.get("certifications") ?? "")
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean);
  const specialties = formData
    .getAll("specialties")
    .map(String)
    .filter((s): s is Specialty => (SPECIALTIES as string[]).includes(s));
  const acceptsSubs = formData.get("acceptsSubs") === "on";
  const acceptsLongTerm = formData.get("acceptsLongTerm") === "on";
  const hourlyRateDollars = formData.get("hourlyRate");
  const hourlyRateCents =
    hourlyRateDollars && String(hourlyRateDollars).trim() !== ""
      ? Math.round(Number(hourlyRateDollars) * 100)
      : null;

  const photo = formData.get("photo");
  let avatarUrl: string | undefined;

  if (photo instanceof File && photo.size > 0) {
    const ext = photo.name.split(".").pop() || "jpg";
    const path = `${user.id}/avatar-${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(path, photo, { contentType: photo.type, upsert: true });

    if (uploadError) {
      redirect(
        `/onboarding/instructor?error=${encodeURIComponent(uploadError.message)}`,
      );
    }

    avatarUrl = supabase.storage.from("avatars").getPublicUrl(path).data
      .publicUrl;
  }

  const { error: profileError } = await supabase
    .from("profiles")
    .update({
      full_name: fullName,
      ...(avatarUrl ? { avatar_url: avatarUrl } : {}),
    })
    .eq("id", user.id);

  if (profileError) {
    redirect(
      `/onboarding/instructor?error=${encodeURIComponent(profileError.message)}`,
    );
  }

  const { error: instructorError } = await supabase.from("instructors").upsert({
    profile_id: user.id,
    bio: bio || null,
    city: city || null,
    zip: zip || null,
    certifications,
    specialties,
    accepts_subs: acceptsSubs,
    accepts_long_term: acceptsLongTerm,
    hourly_rate_cents: hourlyRateCents,
  });

  if (instructorError) {
    redirect(
      `/onboarding/instructor?error=${encodeURIComponent(instructorError.message)}`,
    );
  }

  redirect("/dashboard");
}

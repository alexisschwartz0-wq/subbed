"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function saveStudioProfile(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const studioId = String(formData.get("studioId") ?? "").trim();
  const contactName = String(formData.get("contactName") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const addressLine1 = String(formData.get("addressLine1") ?? "").trim();
  const addressLine2 = String(formData.get("addressLine2") ?? "").trim();
  const city = String(formData.get("city") ?? "").trim();
  const state = String(formData.get("state") ?? "").trim() || "CA";
  const zip = String(formData.get("zip") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const websiteUrl = String(formData.get("websiteUrl") ?? "").trim();

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
        `/onboarding/studio?error=${encodeURIComponent(uploadError.message)}`,
      );
    }

    avatarUrl = supabase.storage.from("avatars").getPublicUrl(path).data
      .publicUrl;
  }

  const { error: profileError } = await supabase
    .from("profiles")
    .update({
      full_name: contactName,
      ...(avatarUrl ? { avatar_url: avatarUrl } : {}),
    })
    .eq("id", user.id);

  if (profileError) {
    redirect(
      `/onboarding/studio?error=${encodeURIComponent(profileError.message)}`,
    );
  }

  const studioFields = {
    owner_id: user.id,
    name,
    description: description || null,
    address_line1: addressLine1 || null,
    address_line2: addressLine2 || null,
    city: city || null,
    state,
    zip: zip || null,
    phone: phone || null,
    website_url: websiteUrl || null,
  };

  const { error: studioError } = studioId
    ? await supabase.from("studios").update(studioFields).eq("id", studioId)
    : await supabase.from("studios").insert(studioFields);

  if (studioError) {
    redirect(
      `/onboarding/studio?error=${encodeURIComponent(studioError.message)}`,
    );
  }

  redirect("/dashboard");
}

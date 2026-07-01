import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { StudioProfileForm } from "@/components/studio-profile-form";

export default async function StudioOnboardingPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
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

  const [{ data: profile }, { data: studio }] = await Promise.all([
    supabase
      .from("profiles")
      .select("full_name, avatar_url")
      .eq("id", user.id)
      .single(),
    supabase
      .from("studios")
      .select("*")
      .eq("owner_id", user.id)
      .maybeSingle(),
  ]);

  return (
    <main className="flex flex-1 flex-col items-center bg-sand px-6 py-16">
      <div className="w-full max-w-xl">
        <h1 className="font-heading text-2xl font-extrabold text-ink">
          Set up your studio profile
        </h1>
        <p className="mt-2 text-sm font-light text-ink/60">
          Instructors will see this when they&apos;re looking for studios to
          sub at.
        </p>

        {params.error && (
          <p className="mt-4 rounded-lg bg-rose/10 px-3 py-2 text-sm text-rose">
            {params.error}
          </p>
        )}
      </div>

      <StudioProfileForm
        studioId={studio?.id ?? null}
        contactName={profile?.full_name ?? ""}
        avatarUrl={profile?.avatar_url ?? null}
        name={studio?.name ?? ""}
        description={studio?.description ?? ""}
        addressLine1={studio?.address_line1 ?? ""}
        addressLine2={studio?.address_line2 ?? ""}
        city={studio?.city ?? ""}
        state={studio?.state ?? "CA"}
        zip={studio?.zip ?? ""}
        phone={studio?.phone ?? ""}
        websiteUrl={studio?.website_url ?? ""}
      />
    </main>
  );
}

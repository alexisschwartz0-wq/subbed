"use client";

import { useState } from "react";
import Image from "next/image";
import { saveInstructorProfile } from "@/app/(authenticated)/onboarding/instructor/actions";

const DISCIPLINES: { value: string; label: string }[] = [
  { value: "yoga", label: "Yoga" },
  { value: "pilates", label: "Pilates" },
  { value: "sound_bath", label: "Sound Bath" },
  { value: "fitness", label: "Fitness" },
];

export function InstructorProfileForm({
  fullName,
  avatarUrl,
  bio,
  city,
  zip,
  certifications,
  specialties,
  acceptsSubs,
  acceptsLongTerm,
  hourlyRateDollars,
}: {
  fullName: string;
  avatarUrl: string | null;
  bio: string;
  city: string;
  zip: string;
  certifications: string;
  specialties: string[];
  acceptsSubs: boolean;
  acceptsLongTerm: boolean;
  hourlyRateDollars: string;
}) {
  const [preview, setPreview] = useState<string | null>(avatarUrl);

  function onPhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  }

  return (
    <form
      action={saveInstructorProfile}
      className="mt-8 w-full max-w-xl space-y-6 rounded-2xl border border-mauve/20 bg-white p-8 shadow-sm"
    >
      <div className="flex items-center gap-4">
        <div className="h-20 w-20 overflow-hidden rounded-full bg-sand">
          {preview ? (
            <Image
              src={preview}
              alt="Profile preview"
              width={80}
              height={80}
              unoptimized
              className="h-full w-full object-cover"
            />
          ) : null}
        </div>
        <div>
          <label htmlFor="photo" className="block text-sm font-medium text-ink">
            Photo
          </label>
          <input
            id="photo"
            name="photo"
            type="file"
            accept="image/*"
            onChange={onPhotoChange}
            className="mt-1 text-sm text-ink/70 file:mr-3 file:rounded-full file:border-0 file:bg-mauve file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-sand hover:file:bg-rose"
          />
        </div>
      </div>

      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-ink">
          Full name
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          required
          defaultValue={fullName}
          className="mt-1 w-full rounded-lg border border-mauve/30 px-3 py-2 text-sm focus:border-mauve focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="bio" className="block text-sm font-medium text-ink">
          Bio
        </label>
        <textarea
          id="bio"
          name="bio"
          rows={4}
          defaultValue={bio}
          placeholder="Tell studios about your teaching style and experience."
          className="mt-1 w-full rounded-lg border border-mauve/30 px-3 py-2 text-sm focus:border-mauve focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-ink">
            City
          </label>
          <input
            id="city"
            name="city"
            type="text"
            defaultValue={city}
            className="mt-1 w-full rounded-lg border border-mauve/30 px-3 py-2 text-sm focus:border-mauve focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="zip" className="block text-sm font-medium text-ink">
            Zip code
          </label>
          <input
            id="zip"
            name="zip"
            type="text"
            defaultValue={zip}
            className="mt-1 w-full rounded-lg border border-mauve/30 px-3 py-2 text-sm focus:border-mauve focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label htmlFor="certifications" className="block text-sm font-medium text-ink">
          Certifications
        </label>
        <input
          id="certifications"
          name="certifications"
          type="text"
          defaultValue={certifications}
          placeholder="RYT-200, NASM-CPT, ..."
          className="mt-1 w-full rounded-lg border border-mauve/30 px-3 py-2 text-sm focus:border-mauve focus:outline-none"
        />
        <p className="mt-1 text-xs text-ink/50">Separate multiple certifications with commas.</p>
      </div>

      <div>
        <span className="block text-sm font-medium text-ink">Disciplines</span>
        <div className="mt-2 flex flex-wrap gap-3">
          {DISCIPLINES.map((d) => (
            <label
              key={d.value}
              className="flex items-center gap-2 rounded-full border border-mauve/30 px-3 py-1.5 text-sm text-ink/70 has-checked:border-mauve has-checked:bg-mauve/10 has-checked:text-ink"
            >
              <input
                type="checkbox"
                name="specialties"
                value={d.value}
                defaultChecked={specialties.includes(d.value)}
                className="accent-mauve"
              />
              {d.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <span className="block text-sm font-medium text-ink">Availability</span>
        <div className="mt-2 space-y-2">
          <label className="flex items-center gap-2 text-sm text-ink/70">
            <input
              type="checkbox"
              name="acceptsSubs"
              defaultChecked={acceptsSubs}
              className="accent-mauve"
            />
            Available for last-minute subs
          </label>
          <label className="flex items-center gap-2 text-sm text-ink/70">
            <input
              type="checkbox"
              name="acceptsLongTerm"
              defaultChecked={acceptsLongTerm}
              className="accent-mauve"
            />
            Available for long-term placements
          </label>
        </div>
      </div>

      <div>
        <label htmlFor="hourlyRate" className="block text-sm font-medium text-ink">
          Hourly rate ($)
        </label>
        <input
          id="hourlyRate"
          name="hourlyRate"
          type="number"
          min={0}
          step={1}
          defaultValue={hourlyRateDollars}
          className="mt-1 w-full rounded-lg border border-mauve/30 px-3 py-2 text-sm focus:border-mauve focus:outline-none"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-full bg-mauve px-6 py-2 text-sm font-medium text-sand transition-colors hover:bg-rose"
      >
        Save profile
      </button>
    </form>
  );
}

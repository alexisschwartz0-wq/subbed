"use client";

import { useState } from "react";
import Image from "next/image";
import { saveStudioProfile } from "@/app/(authenticated)/onboarding/studio/actions";

const STATES = ["CA", "AZ", "NV", "OR", "WA"];

export function StudioProfileForm({
  studioId,
  contactName,
  avatarUrl,
  name,
  description,
  addressLine1,
  addressLine2,
  city,
  state,
  zip,
  phone,
  websiteUrl,
}: {
  studioId: string | null;
  contactName: string;
  avatarUrl: string | null;
  name: string;
  description: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  websiteUrl: string;
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
      action={saveStudioProfile}
      className="mt-8 w-full max-w-xl space-y-6 rounded-2xl border border-mauve/20 bg-white p-6 shadow-sm sm:p-8"
    >
      {studioId && <input type="hidden" name="studioId" value={studioId} />}

      <div className="flex flex-wrap items-center gap-3 sm:flex-nowrap sm:gap-4">
        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full bg-mist sm:h-20 sm:w-20">
          {preview ? (
            <Image
              src={preview}
              alt="Studio logo preview"
              width={80}
              height={80}
              unoptimized
              className="h-full w-full object-cover"
            />
          ) : null}
        </div>
        <div className="min-w-0 flex-1">
          <label htmlFor="photo" className="block text-sm font-medium text-ink">
            Logo or photo
          </label>
          <input
            id="photo"
            name="photo"
            type="file"
            accept="image/*"
            onChange={onPhotoChange}
            className="mt-1 w-full text-sm text-ink/70 file:mr-3 file:rounded-full file:border-0 file:bg-mauve file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-white hover:file:bg-rose"
          />
        </div>
      </div>

      <div>
        <label htmlFor="contactName" className="block text-sm font-medium text-ink">
          Contact name
        </label>
        <input
          id="contactName"
          name="contactName"
          type="text"
          required
          defaultValue={contactName}
          className="mt-1 w-full rounded-lg border border-mauve/30 px-3 py-2 text-sm focus:border-mauve focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-ink">
          Studio name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          defaultValue={name}
          className="mt-1 w-full rounded-lg border border-mauve/30 px-3 py-2 text-sm focus:border-mauve focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-ink">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          defaultValue={description}
          placeholder="Tell instructors about your studio and the classes you offer."
          className="mt-1 w-full rounded-lg border border-mauve/30 px-3 py-2 text-sm focus:border-mauve focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="addressLine1" className="block text-sm font-medium text-ink">
          Address line 1
        </label>
        <input
          id="addressLine1"
          name="addressLine1"
          type="text"
          defaultValue={addressLine1}
          className="mt-1 w-full rounded-lg border border-mauve/30 px-3 py-2 text-sm focus:border-mauve focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="addressLine2" className="block text-sm font-medium text-ink">
          Address line 2
        </label>
        <input
          id="addressLine2"
          name="addressLine2"
          type="text"
          defaultValue={addressLine2}
          className="mt-1 w-full rounded-lg border border-mauve/30 px-3 py-2 text-sm focus:border-mauve focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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
          <label htmlFor="state" className="block text-sm font-medium text-ink">
            State
          </label>
          <select
            id="state"
            name="state"
            defaultValue={state || "CA"}
            className="mt-1 w-full rounded-lg border border-mauve/30 px-3 py-2 text-sm focus:border-mauve focus:outline-none"
          >
            {STATES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-ink">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            defaultValue={phone}
            className="mt-1 w-full rounded-lg border border-mauve/30 px-3 py-2 text-sm focus:border-mauve focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="websiteUrl" className="block text-sm font-medium text-ink">
            Website
          </label>
          <input
            id="websiteUrl"
            name="websiteUrl"
            type="url"
            placeholder="https://"
            defaultValue={websiteUrl}
            className="mt-1 w-full rounded-lg border border-mauve/30 px-3 py-2 text-sm focus:border-mauve focus:outline-none"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full rounded-full bg-mauve px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-rose"
      >
        Save profile
      </button>
    </form>
  );
}

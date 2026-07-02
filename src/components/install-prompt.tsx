"use client";

import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const DISMISSED_KEY = "subbed-install-dismissed";

function isIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
}

function isStandalone() {
  const nav = navigator as Navigator & { standalone?: boolean };
  return window.matchMedia("(display-mode: standalone)").matches || nav.standalone === true;
}

type PromptState =
  | { kind: "hidden" }
  | { kind: "ios" }
  | { kind: "android"; event: BeforeInstallPromptEvent };

export function InstallPrompt() {
  const [state, setState] = useState<PromptState>({ kind: "hidden" });

  useEffect(() => {
    if (isStandalone() || localStorage.getItem(DISMISSED_KEY) === "1") {
      return;
    }

    if (isIOS()) {
      // One-time capability check on mount — there's no browser event to
      // subscribe to for "is this iOS Safari" the way there is for
      // beforeinstallprompt below.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setState({ kind: "ios" });
      return;
    }

    function handler(e: Event) {
      e.preventDefault();
      setState({ kind: "android", event: e as BeforeInstallPromptEvent });
    }

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  function dismiss() {
    setState({ kind: "hidden" });
    localStorage.setItem(DISMISSED_KEY, "1");
  }

  async function install() {
    if (state.kind !== "android") return;
    await state.event.prompt();
    dismiss();
  }

  if (state.kind === "hidden") return null;

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 flex items-center justify-between gap-3 rounded-2xl border border-mauve/20 bg-white p-4 shadow-lg sm:hidden">
      <div className="min-w-0">
        <p className="font-heading text-sm font-extrabold text-ink">
          Add Subbed to your Home Screen
        </p>
        <p className="mt-0.5 text-xs font-light text-ink/60">
          {state.kind === "ios"
            ? 'Tap the Share icon, then "Add to Home Screen."'
            : "Get quick access, right from your home screen."}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {state.kind === "android" && (
          <button
            onClick={install}
            className="rounded-full bg-mauve px-3 py-1.5 text-xs font-medium text-sand transition-colors hover:bg-rose"
          >
            Install
          </button>
        )}
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="rounded-full px-2 py-1.5 text-xs font-medium text-ink/50 hover:text-ink"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

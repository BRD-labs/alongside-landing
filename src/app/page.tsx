import { WaitlistDialog } from "@/components/waitlist-dialog";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-24">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-8 text-center">
        <span className="text-sm font-medium tracking-wide text-muted-foreground">
          Alongside
        </span>

        <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          Work alongside an AI. No scheduling, no camera.
        </h1>

        <div className="flex flex-col gap-4 text-base text-muted-foreground sm:text-lg">
          <p>
            Body doubling works — sitting with someone while you focus keeps
            you honest. But platforms like Focusmate make you book a slot and
            turn your camera on, and that friction is exactly why most people
            quit before it becomes a habit.
          </p>
          <p>
            Alongside is different: an AI focus partner that&apos;s always
            available. Start a short text or voice check-in whenever you sit
            down to work — no calendar, no camera, no waiting for a stranger
            to show up.
          </p>
        </div>

        <WaitlistDialog triggerClassName="mt-2" />
      </div>
    </main>
  );
}

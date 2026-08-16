"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Status = "idle" | "loading" | "success" | "error";

export function WaitlistDialog({ triggerClassName }: { triggerClassName?: string }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  }

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) {
      setTimeout(() => {
        setStatus("idle");
        setErrorMessage("");
        setEmail("");
      }, 200);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger render={<Button size="lg" className={triggerClassName} />}>
        Join the waitlist
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        {status === "success" ? (
          <>
            <DialogHeader>
              <DialogTitle>You&apos;re on the list</DialogTitle>
              <DialogDescription>
                We&apos;ll email you as soon as Alongside is ready to try.
              </DialogDescription>
            </DialogHeader>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Join the waitlist</DialogTitle>
              <DialogDescription>
                Be the first to know when Alongside is ready. No spam, just one email.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "loading"}
                />
                {status === "error" && (
                  <p className="text-sm text-destructive">{errorMessage}</p>
                )}
              </div>
              <Button type="submit" disabled={status === "loading"} className="w-full">
                {status === "loading" ? "Joining..." : "Join the waitlist"}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

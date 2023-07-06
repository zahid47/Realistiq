"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "@/lib/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/Icons";
import { ToastAction } from "@/components/ui/toast";

export default function SignIn() {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      signIn("github", {
        callbackUrl: "/",
      });
    } catch {
      toast({
        variant: "destructive",
        title: "Something went wrong!",
        description: "There was an error while signing in. Please try again.",
        action: (
          <ToastAction altText="Retry" onClick={handleLogin}>
            Retry
          </ToastAction>
        ),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Button
        variant="outline"
        onClick={handleLogin}
        disabled={loading}
        isLoading={loading}
        className="flex items-center gap-2"
      >
        <Icons.Github size={20} className="text-slate-700" />
        <span>Continue with Github</span>
      </Button>
    </div>
  );
}

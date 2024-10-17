"use client";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    // TODO(omer): Make a reusable component out of these, too much repetition..
    <div className="flex w-full justify-center">
      <Button
        onClick={() => router.push("/dashboard")}
        variant="link"
        className={cn({
          underline: pathname === "/dashboard",
        })}
      >
        Dashboard
      </Button>
      <Button
        onClick={() => router.push("/manage")}
        variant="link"
        className={cn({
          underline: pathname === "/manage",
        })}
      >
        Manage
      </Button>
    </div>
  );
}

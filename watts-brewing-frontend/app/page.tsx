"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { getUser } from "@/lib/api";

export default function Main() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await getUser();

        if (res?.success) {
          router.replace("/dashboard");
        } else {
          router.replace("/login");
        }
      } catch (err) {
        router.replace("/login");
      }
    };

    checkAuth();
  }, []);

  return (
    <div className="h-screen flex gap-2 items-center justify-center">
      <Spinner /> Loading...
    </div>
  );
}

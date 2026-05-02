"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "@/lib/api";

export default function AuthGuard({ children }: { children: ReactNode }) {
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

  return children;
}

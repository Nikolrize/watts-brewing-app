"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Spinner } from "@/components/ui/spinner";

export default function Main() {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      router.replace("/dashboard");
    } else {
      router.replace("/login");
    }
  }, []);

  return (
    <div className="h-screen flex gap-2 items-center justify-center">
      <Spinner /> Loading...
    </div>
  );
}

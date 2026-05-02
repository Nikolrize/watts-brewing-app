"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { login } from "@/lib/api";
import { loginCredential } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState<loginCredential>({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setLoading(true);

      const data = await login(form);

      if (!data || !data.success) {
        throw new Error(data?.message || "Login failed");
      }

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-100 space-y-1">
        <CardHeader>
          <CardTitle className="text-center text-xl font-bold text-brand">
            Login to Watt's Brewing
          </CardTitle>
          <CardDescription>
            Enter admin credentials to gain access to the admin panel
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Label>Username:</Label>
            <Input
              placeholder="Enter username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Password:</Label>

            <div className="relative">
              <Input
                type={showPass ? "text" : "password"}
                placeholder="Enter password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="pr-10"
              />

              <Button
                type="button"
                variant={"ghost"}
                onClick={() => setShowPass(!showPass)}
                className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </Button>
            </div>
          </div>

          {error && <Badge variant={"destructive"}>{error}</Badge>}

          <Button onClick={handleLogin} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

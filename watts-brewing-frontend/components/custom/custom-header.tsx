"uce client";

import {
  LayoutDashboard,
  LogOut,
  Search,
  Settings,
  UserCircle,
} from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { SidebarTrigger } from "../ui/sidebar";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command";
import Link from "next/link";
import { useEffect, useState } from "react";
import { logoutUser } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function CustomHeader() {
  return (
    <header className="w-full flex border-b-1 border-muted p-4 items-center justify-between">
      <div className="flex gap-4 items-center">
        <SidebarTrigger />
        <Separator orientation="vertical" />
        <h1 className="font-bold text-brand-primary">Dashboard</h1>
      </div>
      <div className="flex gap-4 items-center">
        <SearchCommandDialog />
      </div>
    </header>
  );
}

export function SearchCommandDialog() {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logoutUser();

      router.push("/login");
      router.refresh();
    } catch (err) {
      console.log("Logout failed");
    }
  };

  return (
    <div>
      <Button
        variant="default"
        className="text-xs"
        onClick={() => setOpen(true)}
      >
        <Search /> Run Command or Search
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Navigation">
              <Link href="/dashboard">
                <CommandItem>
                  <LayoutDashboard />
                  <span>Dashboard</span>
                </CommandItem>
              </Link>
            </CommandGroup>

            <CommandSeparator />

            <CommandGroup heading="Profile">
              {/* <Link href="/">
                <CommandItem>
                  <UserCircle />
                  <span>Account</span>
                </CommandItem>
              </Link>
              <Link href="/">
                <CommandItem>
                  <Settings />
                  <span>Settings</span>
                </CommandItem>
              </Link> */}
              <CommandItem>
                <Button
                  variant={"ghost"}
                  size={"xs"}
                  onClick={handleLogout}
                  className="p-0 gap-2 text-sm w-full justify-start"
                >
                  <LogOut />
                  <span>Log out</span>
                </Button>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  );
}

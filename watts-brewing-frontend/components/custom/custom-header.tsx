"uce client";

import { LayoutDashboard, Search, Settings, UserCircle } from "lucide-react";
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
import { useState } from "react";

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
              <Link href="/">
                <CommandItem>
                  <LayoutDashboard />
                  <span>Dashboard</span>
                </CommandItem>
              </Link>
            </CommandGroup>

            <CommandSeparator />

            <CommandGroup heading="Profile">
              <Link href="/">
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
              </Link>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  );
}

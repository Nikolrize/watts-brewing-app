"use client";

import {
  CircleUser,
  Coffee,
  EllipsisVertical,
  LayoutDashboard,
  LogOut,
  Settings,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { useEffect, useState } from "react";
import { getUser, logoutUser } from "@/lib/api";
import { loginCredential } from "@/lib/types";

export default function CustomSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="flex flex-row items-center text-xl font-bold p-4 text-brand gap-2">
        <Button size={"icon-lg"}>
          <Coffee />
        </Button>
        Watt's Brewing
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href={"/"}>
                  <SidebarMenuButton>
                    <LayoutDashboard />
                    Dashboard
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <ProfilePopover />
      </SidebarFooter>
    </Sidebar>
  );
}

export function ProfilePopover() {
  const [user, setUser] = useState<loginCredential | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUser();
        if (!data) return null;
        
        setUser(data.data);
      } catch (err) {
        console.log("Not logged in");
      }
    };

    fetchUser();
  }, []);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <SidebarMenuButton
          size={"lg"}
          className="bg-muted hover:ring-1 hover:ring-muted-foreground"
        >
          <div className="flex flex-1 items-center gap-2">
            <Avatar>
              <AvatarImage src={"/icons/user.png"} alt="user-png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            {user?.username}
          </div>
          <EllipsisVertical />
        </SidebarMenuButton>
      </PopoverTrigger>

      <PopoverContent side="right" className="w-[30vh]">
        <PopoverHeader>
          <PopoverTitle className="text-muted-foreground text-xs">
            Profile
          </PopoverTitle>
        </PopoverHeader>

        {/* <Link href={"/"}>
          <Button variant={"ghost"} className="flex gap-2 justify-start w-full">
            <CircleUser className="text-muted-foreground" /> Account
          </Button>
        </Link> */}

        <Separator />
        <Button
          variant={"ghost"}
          onClick={() => logoutUser()}
          className="flex gap-2 justify-start w-full"
        >
          <LogOut className="text-muted-foreground" /> Log out
        </Button>
      </PopoverContent>
    </Popover>
  );
}

"use client";
import * as React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LuMenu } from "react-icons/lu";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { UserButton, useUser } from "@clerk/nextjs";
import { ClipboardList, Layout, Phone } from "lucide-react";

export function Navbar() {
  const { user } = useUser();

  return (
    <nav className="h-[80px] w-full flex items-center justify-between px-8 gap-10 border-b border-gray-100 dark:border-none z-50">
      <div className="items-center gap-4 hidden sm:flex">
        <Link href={"/"} className="flex items-center gap-4">
          <Image
            src={"/logo.png"}
            alt="logo"
            width={70}
            height={70}
            className="rounded-lg"
          />
          <h2 className="text-3xl font-semibold">Pizzeria Nad Łęgiem</h2>
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/menu" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <ClipboardList className="w-4 h-4 mr-2" />
                  Menu
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/contact" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <Phone className="w-4 h-4 mr-2" />
                  Kontakt
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            {user?.publicMetadata.role === "admin" ? (
              <NavigationMenuItem>
                <Link href="/dashboard" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <Layout className="w-4 h-4 mr-2" />
                    Dashboard
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ) : null}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex items-center sm:hidden">
        <Sheet>
          <SheetTrigger>
            <LuMenu className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>SM Ogród</SheetTitle>
            </SheetHeader>
            <NavigationMenu>
              <ul className="grid w-[400px] gap-1 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                TODO
              </ul>
            </NavigationMenu>
          </SheetContent>
        </Sheet>
      </div>

      <div className="gap-4 flex items-center">
        <UserButton />
        <ThemeSwitcher />
      </div>
    </nav>
  );
}

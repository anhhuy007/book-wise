"use client";

import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import appLogo from "../../assets/icons/logo.png";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SearchBar from "@/components/(home-page)/SearchBar";
import {
  BellRing,
  User,
  Heart,
  HelpCircle,
  LogOut,
  CircleHelp,
} from "lucide-react";
import React from "react";
import { usePathname } from "next/navigation";
import Notification from "@/components/(home-page)/Notification";
import { Separator } from "@/components/ui/separator";

export default function TopNav() {
  const userItems = [
    {
      name: "Cài đặt tài khoản",
      link: "/account",
      icon: <User />,
    },
    {
      name: "Thư viện yêu thích",
      link: "/favorite",
      icon: <Heart />,
    },
    {
      name: "Hỗ trợ",
      link: "/support",
      icon: <HelpCircle />,
    },
    {
      name: "Đăng xuất",
      link: "/sign-out",
      icon: <LogOut />,
    },
  ];

  const pathname = usePathname();
  const [searchType, setSearchType] = useState("");

  const handleChangeSearchType = (value) => {
    setSearchType(value);
  };

  return (
    <div className="w-full h-24 bg-background text-foreground sticky top-0 flex gap-10 md:justify-between pt-4 px-12">
      <Link href="/" className="border-collapse">
        <div className="flex items-center gap-3">
          <Image src={appLogo} alt="Logo" className="w-9" />
          <p className="mx-auto text-foreground text-2xl font-bold ">
            Book Wise
          </p>
        </div>
      </Link>
      <SearchBar onSearchTypeChange={handleChangeSearchType} />
      <div className="gap-6 flex items-center ">
        <Notification />
        <Separator orientation="vertical" className="h-10" />
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Thông tin tài khoản</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {userItems.map((item) => (
              <React.Fragment key={item.name}>
                <DropdownMenuItem
                  className={`${
                    pathname === item.link
                      ? "bg-primary text-primary-foreground"
                      : ""
                  } py-2 flex items-center`}
                >
                  <Link
                    href={item.link}
                    className={`${
                      pathname === item.link ? "" : ""
                    } py-2 flex items-center`}
                  >
                    <span className="text-xl mr-2 ml-2">{item.icon}</span>
                    <p className="ml-3 text-base">{item.name}</p>
                  </Link>
                </DropdownMenuItem>
              </React.Fragment>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

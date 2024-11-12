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
  SearchIcon,
} from "lucide-react";
import React from "react";
import { usePathname } from "next/navigation";
import Notification from "@/components/(home-page)/Notification";
import SearchButton from "@/components/(home-page)/SearchButton";
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
    <div className="w-full bg-background text-foreground sticky top-0">
      <div className="w-full h-20 md:h-24 flex items-center justify-between">
        <div className="w-full mx-auto px-6 md:px-12 flex items-center justify-between xl:gap-10">
          <Link href="/" className="border-collapse flex">
            <div className="flex items-center gap-3">
              <Image src={appLogo} alt="Logo" className="w-9" />
              <p className="text-foreground text-xl md:text-2xl font-bold">
                Book Wise
              </p>
            </div>
          </Link>

          <div className="hidden lg:block">
            <SearchBar onSearchTypeChange={handleChangeSearchType} />
          </div>

          <div className="gap-4 md:gap-6 flex items-end">
            <div className="flex items-center justify-center gap-2 md:gap-6 lg:hidden">
              <SearchButton />
              <Separator orientation="vertical" className="h-10" />
            </div>
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
                        className="py-2 flex items-center w-full"
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
      </div>
    </div>
  );
}

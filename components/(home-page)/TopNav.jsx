"use client";

import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import appLogo from "../../assets/icons/logo.png";
import { useState } from "react";
import useSWR from 'swr';
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
  User,
  Heart,
  HelpCircle,
  LogOut
} from "lucide-react";
import React from "react";
import { usePathname } from "next/navigation";
import Notification from "@/components/(home-page)/Notification";
import SearchButton from "@/components/(home-page)/SearchButton";
import { Separator } from "@/components/ui/separator";
import { authorizeUser } from "@/app/services/Services";

const userFetcher = async() => {
    const isUser = await authorizeUser();
    console.log(isUser);
    return isUser;
}

export default function TopNav() {
  const userItems = [
    {
      name: "Hồ sơ người dùng",
      link: "/profile",
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
      link: "/logout",
      icon: <LogOut />,
    },
  ];

  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const {data: isUser, error, isLoading} = useSWR('user', userFetcher);

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
            <SearchBar />
          </div>

          <div className="gap-4 md:gap-6 flex items-end">
            <div className="flex items-center justify-center gap-2 md:gap-6 lg:hidden">
              <SearchButton />
              <Separator orientation="vertical" className="h-10" />
            </div>
            <Notification />
            <Separator orientation="vertical" className="h-10" />
            {isUser? (
              <button className="mt-4 bg-black text-white p-2 rounded self-end"><Link href='/signin'>Đăng nhập</Link></button>
            ) : (
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
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
                      onClick={() => {setIsOpen(false);}}
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
            </DropdownMenu>)}
          </div>
        </div>
      </div>
    </div>
  );
}

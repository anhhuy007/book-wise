"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { BellRing, User, Heart, HelpCircle, LogOut } from "lucide-react";
import React from "react";
import { usePathname } from "next/navigation";

export default function TopNav() {
  // return (
  //   <div className="w-full h-24 bg-background text-foreground sticky top-0 flex justify-end pt-4 px-12">
  //     <div className="gap-8 flex items-center">
  //       <Link href="/sign-up" className="font-bold text-base">
  //         Đăng ký
  //       </Link>
  //       <Link
  //         href="/sign-in"
  //         className="font-bold text-base bg-primary text-primary-foreground px-7 py-3 rounded-3xl shadow-2xl"
  //       >
  //         Đăng nhập
  //       </Link>
  //     </div>
  //   </div>
  // );
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

  return (
    <div className="w-full h-24 bg-background text-foreground sticky top-0 flex gap-10 md:justify-between pt-4 px-12">
      <Link href="/" className="border-collapse">
        <p className="mx-auto md:mt-7 md:mb-10 text-foreground text-base md:text-2xl font-bold ">
          Book Wise
        </p>
      </Link>
      <div className="gap-6 flex items-center ">
        <Link href="/notification" className="font-bold text-xl">
          <BellRing className="h-8 w-8" />
        </Link>
        <Separator orientation="vertical" className="h-10" />
        <DropdownMenu>
          <DropdownMenuTrigger className="font-bold text-base py-3">
            Tên người dùng
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
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}

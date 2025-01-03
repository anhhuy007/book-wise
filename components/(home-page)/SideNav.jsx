"use client";

import {
  BookCheck,
  BookHeart,
  Bot,
  CircleHelp,
  Library,
  Settings,
  UserRound,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { ChevronsLeft } from "lucide-react";
import { useSideNav } from "@/contexts/SideNavContext";

const links = [
  { 
    name: "Thể loại", 
    href: "/category", 
    icon: Library, 
    category: "KHÁM PHÁ" },
  {
    name: "Tác giả",
    href: "/author",
    icon: BookCheck,
    category: "KHÁM PHÁ",
  },
  {
    name: "Tìm với AI",
    href: "/ai-search",
    icon: Bot,
    category: "KHÁM PHÁ",
  },
  {
    name: "Sách yêu thích",
    href: "/favorite-books",
    icon: BookHeart,
    category: "BẠN",
  },
  {
    name: "Tác giả đang theo dõi",
    href: "/following-auth",
    icon: Library,
    category: "BẠN",
  },
  { 
    name: "Cài đặt", 
    href: "/setting", 
    icon: Settings, 
    category: "KHÁC" 
  },
  { 
    name: "Trợ giúp", 
    href: "/help", 
    icon: CircleHelp, 
    category: "KHÁC" 
  },
  { 
    name: "Về chúng tôi", 
    href: "/about", 
    icon: UserRound, 
    category: "KHÁC" 
  },
];

export function ExpandedButton() {
  const { expanded, setExpanded } = useSideNav();

  return (
    <div
      className={`flex fixed flex-col md:shadow-sm z-50 transition-[width] duration-300 ${
        expanded ? "w-64" : "w-20"
      }`}
    >
      <button
        onClick={() => setExpanded((curr) => !curr)}
        className="p-1.5 z-50 bg-background border-2 rounded-lg hover:bg-accent "
      >
        <ChevronsLeft
          size={28}
          className="transition-transform duration-300 mx-auto"
          style={{ transform: expanded ? "rotate(0deg)" : "rotate(180deg)" }}
        />
      </button>
    </div>
  );
}
function SideNav() {
  const pathName = usePathname();
  const { expanded } = useSideNav();

  const groupedLinks = links.reduce((acc, link) => {
    if (!acc[link.category]) {
      acc[link.category] = [];
    }
    acc[link.category].push(link);
    return acc;
  }, {});

  return (
    <nav
      className={`h-full fixed top-5 mt-24 md:mt-32 md:shadow-lg bg-background overflow-x-hidden transition-[width] duration-300 ${
        expanded ? "w-64 z-0" : "-z-50 md:z-0 w-20"
      }`}
    >
      <div
        className={`${
          expanded ? "flex flex-col" : "hidden md:flex md:flex-col"
        }`}
      >
        {Object.entries(groupedLinks).map(([category, categoryLinks]) => (
          <div key={category} className="flex flex-col gap-1">
            <h3
              className={`ml-4 mt-5 font-bold text-base text-foreground transition-opacity duration-300 whitespace-nowrap ${
                expanded ? "opacity-100" : "opacity-0"
              }`}
            >
              {category}
            </h3>
            {categoryLinks.map((link) => {
              const isActive = pathName === link.href;
              const Icon = link.icon;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch={true}
                  className={`relative flex items-center p-3 ${
                    isActive
                      ? "bg-primary text-primary-foreground font-bold"
                      : "bg-background text-foreground hover:bg-primary/20 "
                  }`}
                >
                  <div
                    className={`min-w-[28px] transition-all duration-300 ${
                      expanded ? "ml-5" : "mx-auto"
                    }`}
                  >
                    <Icon size={28} aria-hidden="true" />
                  </div>
                  <span
                    className="absolute left-[75px] whitespace-nowrap"
                    style={{
                      opacity: expanded ? 1 : 0,
                      visibility: expanded ? "visible" : "hidden",
                    }}
                  >
                    {link.name}
                  </span>
                </Link>
              );
            })}
            {category !== "KHÁC" && (
              <Separator
                orientation="horizontal"
                className={`w-10/12 mx-auto my-2`}
              />
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}

export default SideNav;

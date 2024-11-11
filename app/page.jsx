"use client";

import BookBannerCarousel from "@/components/(home-page)/BookBannerCarousel";
import BookCarousel from "@/components/(home-page)/BookCarousel";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col w-full items-center">
      <Link href="/signin" className="self-end mr-4 mt-4 text-blue-500 hover:text-blue-800">
        Signin
      </Link>
      <Link href="/profile-setup" className="self-end mr-4 mt-4 text-blue-500 hover:text-blue-800">
        a
      </Link>
      <BookBannerCarousel />

      <h2 className="text-2xl font-bold self-start mt-10 mb-5">Best Seller</h2>
      <BookCarousel />

      <h2 className="text-2xl font-bold self-start mt-10 mb-5">Có thể bạn sẽ thích</h2>
      <BookCarousel />

      <h2 className="text-2xl font-bold self-start mt-10 mb-5">Mọi người cũng đang xem</h2>
      <BookCarousel />
    </div>
  );
}

"use server";

import BookCarousel from "@/components/(home-page)/BookCarousel";
import BookBannerCarousel from "@/components/(home-page)/BookBannerCarousel";
import { getBestSeller, getYouMightLike, getPeopleAlsoViewed } from "@/app/services/Services";
import Link from "next/link";
import React from "react";
import SignInPopup from "@/components/(auth)/SignInPopup";

const MyButton = React.forwardRef(({onClick, href}, ref) => {
  return (
    <a href={href} onClick={onClick} ref={ref}>b</a>
  )
})

MyButton.displayName='MyBtn';

export default async function Page() {
  const best_seller = await getBestSeller();
  const you_might_like = await getYouMightLike();
  const people_also_viewed = await getPeopleAlsoViewed();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex flex-col w-full items-center">
      <Link href="/signin" className="self-end mr-4 mt-4 text-blue-500 hover:text-blue-800">
        Signin
      </Link>
      <Link href="/profile-setup" className="self-end mr-4 mt-4 text-blue-500 hover:text-blue-800">
        a
      </Link>

      <Link href="/profile" className="self-end mr-4 mt-4 text-blue-500 hover:text-blue-800">
      b
      </Link>
      
      <BookBannerCarousel />

      <h2 className="text-2xl font-bold self-start mt-10 mb-5">Best Seller</h2>
      <BookCarousel book_data={best_seller} />

      <h2 className="text-2xl font-bold self-start mt-10 mb-5">
        Có thể bạn sẽ thích
      </h2>
      <BookCarousel book_data={you_might_like} />

      <h2 className="text-2xl font-bold self-start mt-10 mb-5">
        Mọi người cũng đang xem
      </h2>
      <BookCarousel book_data={people_also_viewed} />
    </div>
  );
}

"use server";

import BookCarousel from "@/components/(home-page)/BookCarousel";
import BookBannerCarousel from "@/components/(home-page)/BookBannerCarousel";
import { getBestSeller, getYouMightLike, getPeopleAlsoViewed } from "@/app/services/Services";

export default async function Page() {
  const best_seller = await getBestSeller();
  const you_might_like = await getYouMightLike();
  const people_also_viewed = await getPeopleAlsoViewed();

  return (
    <div className="flex flex-col w-full items-center">
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

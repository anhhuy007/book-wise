"use client";

import BookCarousel from "@/components/(home-page)/BookCarousel";

export default function CategoryList({ categories = [] }) {
  return (
    <div className="flex flex-col w-full items-center">
      {categories.map((item) => (
        <div key={item.category} className="w-full">
          <div className="flex justify-between items-center w-full">
            <h2 className="text-5xl font-bold mt-20 mb-10">{item.category}</h2>
            <span className="text-2xl font-bold mb-10">
              <a
                href={`/category/${item.category}`}
                className="hover:underline"
              >
                Xem thêm
              </a>
            </span>
          </div>
          <BookCarousel book_data={item.books} />
        </div>
      ))}
    </div>
  );
}

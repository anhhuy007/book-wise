"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const categoriesData = {
  book: [
    { name: "Khoa Học Viễn Tưởng", link: "/books/science-fiction" },
    { name: "Tiểu Thuyết Lãng Mạn", link: "/books/romantic-novel" },
    { name: "Sách Kinh Doanh", link: "/books/business" },
    { name: "Tự Truyện", link: "/books/autobiography" },
    { name: "Sách Thiếu Nhi", link: "/books/children" },
    { name: "Khác", link: "/books/other" },
  ],
  auth: [
    { name: "J.K. Rowling", link: "/authors/jk-rowling" },
    { name: "George R.R. Martin", link: "/authors/george-rr-martin" },
    { name: "Agatha Christie", link: "/authors/agatha-christie" },
    { name: "Mark Twain", link: "/authors/mark-twain" },
    { name: "Haruki Murakami", link: "/authors/haruki-murakami" },
    { name: "Khác", link: "/authors/other" },
  ],
  pub: [
    { name: "Nhà Xuất Bản Kim Đồng", link: "/publishers/kim-dong" },
    { name: "Nhà Xuất Bản Trẻ", link: "/publishers/tre" },
    { name: "Nhà Xuất Bản Đà Nẵng", link: "/publishers/da-nang" },
    { name: "Khác", link: "/publishers/other" },
  ],
};

function Category({ searchType }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setCategories(categoriesData[searchType] || []);
  }, [searchType]);

  return (
    <>
      <ul className="flex gap-20 font-bold text-lg">
        {categories.map((category, index) => (
          <li
            key={index}
            className={
              "group relative transition duration-300 ease-in-out hover:scale-125"
            }
          >
            <Link href={category.link}>{category.name}</Link>
            <div className="bg-accent-foreground h-[2px] w-0 mt-1 group-hover:w-full transition-all duration-500"></div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Category;

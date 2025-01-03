"use client";

import React from "react";
import Link from "next/link";
import useSWR from "swr";
import LoadingAnimation from "@/components/ui/loading";
import { AuthorGrid } from "@/components/author/AuthorList";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function FollowingAuthors() {
  const {
    data: authorsData,
    error,
    isLoading,
  } = useSWR("/api/following-authors/1", fetcher);

  console.log(authorsData);

  if (error) {
    return (
      <div className="text-center p-4 text-red-500">
        Không thể tải tác giả bạn đang theo dõi. Vui lòng thử lại sau.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <LoadingAnimation />
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-bold text-2xl mb-3">Tác giả bạn đang theo dõi</h1>
      <AuthorGrid authors={authorsData} />
    </div>
  );
}

export default FollowingAuthors;

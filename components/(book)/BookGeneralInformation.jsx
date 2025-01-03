import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import {
  Star,
  StarHalf,
  Eye,
  Heart,
  UserPlus,
  BookmarkPlus,
  UserMinus,
  HeartOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import LoadingAnimation from "../ui/loading";
import toast from "react-hot-toast";

const handleApiRequest = async (url, method, body = null) => {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (body) options.body = JSON.stringify(body);

  const response = await fetch(url, options);
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "API request failed");
  }
  return response.json ? response.json() : null;
};

const handleAddToFavorite = async (bookId, userId) => {
  try {
    await handleApiRequest(`/api/favourites/${userId}`, "POST", { bookId });
    toast.success("Đã thêm vào danh sách yêu thích");
  } catch (error) {
    console.error(error);
    toast.error("Đã xảy ra lỗi khi thêm vào danh sách yêu thích");
  }
};

const handleDeleteToFavorite = async (bookId, userId) => {
  try {
    await handleApiRequest(`/api/favourites/${userId}`, "DELETE", { bookId });
    toast.success("Đã xóa khỏi danh sách yêu thích");
  } catch (error) {
    console.error(error);
    toast.error("Đã xảy ra lỗi khi xóa khỏi danh sách yêu thích");
  }
};

const handleAddToFollowingAuthors = async (authorId, userId) => {
  try {
    await handleApiRequest(`/api/following-authors/${userId}`, "POST", {
      authorId,
    });
    toast.success("Đã theo dõi tác giả");
  } catch (error) {
    console.error(error);
    toast.error("Đã xảy ra lỗi khi theo dõi tác giả");
  }
};

const handleDeleteToFollowingAuthors = async (authorId, userId) => {
  try {
    await handleApiRequest(`/api/following-authors/${userId}`, "DELETE", {
      authorId,
    });
    toast.success("Đã hủy theo dõi tác giả");
  } catch (error) {
    console.error(error);
    toast.error("Đã xảy ra lỗi khi hủy theo dõi tác giả");
  }
};

const checkFavourite = async (bookId, userId) => {
  console.log(bookId, userId);
  try {
    const data = await handleApiRequest(`/api/favourites/${userId}`, "GET");
    return data.some((book) => book.id === bookId);
  } catch (error) {
    console.error(error);
    return false;
  }
};

const checkFollowingAuthors = async (authorId, userId) => {
  try {
    const data = await handleApiRequest(
      `/api/following-authors/${userId}`,
      "GET"
    );
    return data.some((author) => author.id === authorId);
  } catch (error) {
    console.error(error);
    return false;
  }
};

const handleFavourite = async (bookId, userId, setIsFavourite, isFavourite) => {
  try {
    if (!isFavourite) {
      await handleAddToFavorite(bookId, userId);
    } else {
      await handleDeleteToFavorite(bookId, userId);
    }
    setIsFavourite(!isFavourite);
  } catch (error) {
    console.error(error);
    toast.error("Đã xảy ra lỗi, vui lòng thử lại.");
  }
};

const handleFollowingAuthors = async (
  authorId,
  userId,
  setIsFollowing,
  isFollowing
) => {
  try {
    if (!isFollowing) {
      await handleAddToFollowingAuthors(authorId, userId);
    } else {
      await handleDeleteToFollowingAuthors(authorId, userId);
    }
    setIsFollowing(!isFollowing);
  } catch (error) {
    console.error(error);
    toast.error("Đã xảy ra lỗi, vui lòng thử lại.");
  }
};

function BookGeneralInformation({ bookData }) {
  const userId = 1;
  if (!bookData) {
    return (
      <div className="flex items-center justify-center">
        <LoadingAnimation />
      </div>
    );
  }

  const [isFavourite, setIsFavourite] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchInitialStates = async () => {
      const favourite = await checkFavourite(bookData.id, userId);
      setIsFavourite(favourite);

      const following = await checkFollowingAuthors(bookData.author_id, userId);
      setIsFollowing(following);
    };

    fetchInitialStates();
  }, [bookData.id, bookData.author_id, userId]);

  const fullStars = Math.floor(bookData.avg_rating);
  const hasHalfStar = bookData.avg_rating % 1 !== 0;

  return (
    <>
      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Book Cover */}
        <div className="relative aspect-[3/4] max-h-[650px] items-center overflow-hidden rounded-lg border bg-muted">
          <Image
            src={bookData.img_url}
            alt={bookData.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Book Details */}
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h1 className="text-4xl font-bold tracking-tight max-w-[500px]">
                {bookData.title}
              </h1>
              <div className="text-sm text-muted-foreground space-x-2">
                <span>ISBN: {bookData.isbn13}</span>
                <span>•</span>
                <span>{bookData.page_count} trang</span>
                <span>•</span>
                <span>
                  Ngôn ngữ: {bookData.language == "en" ? "English" : "Other"}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex gap-10 items-center">
              <Link href={`/author/${bookData.author_id}`}>
                <h2 className="text-xl font-semibold hover:underline">
                  viết bởi {bookData.authors}
                </h2>
              </Link>
              {/* Follow button */}
              <Button
                size="sm"
                variant="outline"
                className="flex items-center gap-2"
                onClick={() =>
                  handleFollowingAuthors(
                    bookData.author_id,
                    userId,
                    setIsFollowing,
                    isFollowing
                  )
                }
              >
                {isFollowing ? (
                  <>
                    <UserMinus className="w-4 h-4" />
                    Hủy theo dõi
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    Theo dõi
                  </>
                )}
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                Thể loại: {bookData.category}
              </span>
              <span>•</span>
              <span className="text-sm text-muted-foreground">
                Sản xuất: {bookData.published_date}
              </span>
            </div>
          </div>

          <Card className="p-4 bg-muted/50 flex flex-col">
            <p className="text-sm leading-relaxed line-clamp-[8]">
              {bookData.description}
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="link" className="text-foreground/50 underline">
                  Đọc thêm
                </Button>
              </DialogTrigger>
              <DialogContent className="text-pretty">
                <DialogHeader>
                  <DialogTitle>Mô tả</DialogTitle>
                </DialogHeader>
                {bookData.description}
              </DialogContent>
            </Dialog>
          </Card>

          <div className="space-y-4">
            <div className="flex items-center space-x-4 ">
              <div className="text-2xl font-bold">
                <div className="flex">
                  {[...Array(5)].map((_, index) => {
                    if (index < fullStars) {
                      return (
                        <Star
                          key={index}
                          size={16}
                          className="text-yellow-400 fill-current"
                        />
                      );
                    } else if (index === fullStars && hasHalfStar) {
                      return (
                        <StarHalf
                          key={index}
                          size={16}
                          className="text-yellow-400 fill-current"
                        />
                      );
                    } else {
                      return (
                        <Star key={index} size={16} className="text-gray-300" />
                      );
                    }
                  })}
                </div>{" "}
              </div>
              <div className="text-sm text-muted-foreground">
                ({bookData.rating_count} đánh giá)
              </div>
            </div>

            <div className="flex items-center space-x-4"></div>
            <div className="flex flex-1 items-center w-full space-x-4">
              <Button size="lg" className="flex-1">
                Đọc <Eye className="w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="flex-1"
                onClick={() =>
                  handleFavourite(
                    bookData.id,
                    userId,
                    setIsFavourite,
                    isFavourite
                  )
                }
              >
                {isFavourite ? "Hủy thêm vào yêu thích" : "Thêm vào yêu thích"}
                <BookmarkPlus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookGeneralInformation;

export function BookSearchResult({ bookData }) {
  const userId = 1;
  const [isFavourite, setIsFavourite] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchInitialStates = async () => {
      const favourite = await checkFavourite(bookData.id, userId);
      setIsFavourite(favourite);

      const following = await checkFollowingAuthors(bookData.author_id, userId);
      setIsFollowing(following);
    };

    fetchInitialStates();
  }, [bookData.id, bookData.author_id, userId]);

  const fullStars = Math.floor(bookData.avg_rating);
  const hasHalfStar = bookData.avg_rating % 1 >= 0.5;
  const publishedYear = new Date(bookData.published_year).getFullYear();
  return (
    <>
      <div className="flex gap-5 md:gap-10">
        {/* Book cover */}
        <Image
          src={bookData.img_url}
          alt={bookData.title}
          width={300}
          height={400}
          className="
            w-full h-auto object-cover
            max-w-[120px]
            md:w-1/3 md:max-w-[150px]
            lg:w-1/4 lg:max-w-[170px]
            xl:w-1/3 xl:max-w-[200px]
          "
        />
        {/* Book Information */}
        <div className="flex flex-col gap-1 md:gap-2 lg:gap-3 xl:gap-5">
          <Link href={`/book/${bookData.id}`}>
            <h1 className="text-lg md:text-xl xl:text-2xl font-semibold hover:underline">
              {bookData.title}
            </h1>
          </Link>
          <Link href={`/author/${bookData.authors}`}>
            <h2 className="text-lg md:text-xl font-semibold text-blue-500 hover:underline">
              Viết bởi: {bookData.authors}
            </h2>
          </Link>
          <Link href={`/category/${bookData.category}`}>
            <p className="text-lg md:text-xl text-blue-500 hover:underline">
              {bookData.category}
            </p>
          </Link>
          <div className="flex gap-2 items-center md:space-x-2 ">
            <div className="flex">
              {[...Array(5)].map((_, index) => {
                if (index < fullStars) {
                  return (
                    <Star
                      key={index}
                      size={16}
                      className="text-yellow-400 fill-current"
                    />
                  );
                } else if (index === fullStars && hasHalfStar) {
                  return (
                    <StarHalf
                      key={index}
                      size={16}
                      className="text-yellow-400 fill-current"
                    />
                  );
                } else {
                  return (
                    <Star key={index} size={16} className="text-gray-300" />
                  );
                }
              })}
            </div>
            <div className="flex gap-2 ">
              <span className=" text-lg">{bookData.avg_rating}</span>
              <span className=" text-lg">({bookData.rating_count})</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
            <Link href={`/book/${bookData.id}`}>
              <Button
                variant="outline"
                className="flex items-center gap-2 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl py-1 sm:py-2 md:py-3 lg:py-4 px-2 sm:px-3 md:px-4 lg:px-5"
              >
                <Eye className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                Xem
              </Button>
            </Link>
            <Button
              variant="outline"
              className="flex items-center gap-2 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl py-1 sm:py-2 md:py-3 lg:py-4 px-2 sm:px-3 md:px-4 lg:px-5"
              onClick={() => {
                handleFollowingAuthors(
                  bookData.author_id,
                  userId,
                  setIsFollowing,
                  isFollowing
                );
              }}
            >
              {isFollowing ? (
                <>
                  <UserMinus className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                  Hủy theo dõi
                </>
              ) : (
                <>
                  <UserPlus className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                  Theo dõi
                </>
              )}
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl py-1 sm:py-2 md:py-3 lg:py-4 px-2 sm:px-3 md:px-4 lg:px-5"
              onClick={() => {
                handleFavourite(
                  bookData.id,
                  userId,
                  setIsFavourite,
                  isFavourite
                );
              }}
            >
              {isFavourite ? (
                <>
                  <HeartOff className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                  Bỏ yêu thích
                </>
              ) : (
                <>
                  <Heart className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                  Yêu thích
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

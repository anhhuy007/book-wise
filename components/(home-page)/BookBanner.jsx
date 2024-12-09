import Image from "next/image";
import {
  Bookmark,
  Share2,
  Download,
  Badge,
  Star,
  BookOpen,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function BookBanner({
  id,
  title,
  author,
  description,
  avg_rating,
  rating_count,
  published_at,
  page_count,
  language,
  book_cover,
  author_avatar,
}) {
  // format published date to year-month-day
  const published = new Date(published_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Card className="overflow-hidden bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 max-w-screen-lg rounded-lg">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="aspect-[3/4] overflow-hidden rounded-lg w-[300px] shadow-2xl">
            <img
              src={book_cover}
              alt="Book Banner"
              width={300}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:w-2/3 flex flex-col justify-between mt-7">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {title}
                  </h2>
                  <p className="text-xl text-yellow-100 mb-2 font-semibold">
                    {author}
                  </p>
                </div>
                <img
                  src={author_avatar}
                  alt="Author"
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white"
                />
              </div>
              <p className="text-white mb-4 mt-8">{description}</p>
              <div className="flex items-center mb-4 mt-7">
                <div className="flex items-center mr-4">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={`h-5 w-5 ${
                        index < Math.floor(avg_rating)
                          ? "text-yellow-300"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-white font-semibold">
                    ({avg_rating.toFixed(1)})
                  </span>
                </div>
                <span className="text-white">{rating_count} ratings</span>
              </div>
              <div className="flex flex-wrap gap-4 mb-4">
                <div>
                  <span className="font-semibold text-yellow-200">
                    Published:
                  </span>
                  <span className="ml-2 text-white">{published}</span>
                </div>
                <div>
                  <span className="font-semibold text-yellow-200">Pages:</span>
                  <span className="ml-2 text-white">{page_count}</span>
                </div>
                <div>
                  <span className="font-semibold text-yellow-200">
                    Language:
                  </span>
                  <span className="ml-2 text-white">{language}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 mb-4">
              <Link href={`/book/${id}`}>
                <Button className="bg-white text-purple-700 hover:bg-yellow-100 transition-colors">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Read Now
                </Button>
              </Link>
              <Button
                variant="outline"
                className="bg-white text-purple-700 hover:bg-yellow-100 transition-colors"
              >
                <Heart className="mr-2 h-4 w-4" />
                Add to Wishlist
              </Button>
              <Button
                variant="outline"
                className="bg-white text-purple-700 hover:bg-yellow-100 transition-colors"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Sample
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

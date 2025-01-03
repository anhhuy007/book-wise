import { Card, CardContent } from "@/components/ui/card";
import { Eye } from "lucide-react";
import Link from "next/link";

export function AuthorGrid({ authors }) {
  return (
    <div className="flex flex-col mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {authors.map((author) => (
          <Link href={`/author/${author.id}`} key={author.id}>
            <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                    <img
                      src={author.avatar_url}
                      alt={author.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{author.name}</h3>
                    <p className="text-sm text-gray-600 flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {(author.view_count || 0).toLocaleString()} lượt xem
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 line-clamp-3">
                  {author.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

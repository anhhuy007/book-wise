import Image from "next/image"
import Link from "next/link"
import { Eye } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

function getRandomPics() {
    const id = Math.floor(Math.random() * 1000);
    return `https://picsum.photos/id/${id}/1024/576`;
}

export function CategoriesGrid({ categories }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Book Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link href={`/category/${category.name}`} key={category.name}>
            <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <CardHeader className="p-0">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={category?.imageUrl || getRandomPics()}
                    alt={category.name}
                    fill
                    className="object-cover rounded-t-lg transition-transform duration-300 hover:scale-110"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-xl mb-2">{category.name}</CardTitle>
                <p className="text-sm text-gray-600 mb-4">{category.description}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between items-center">
                <div className="flex items-center text-sm text-gray-500">
                  <Eye className="w-4 h-4 mr-1" />
                  <span>{(category.view_count || 0).toLocaleString()} views</span>
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
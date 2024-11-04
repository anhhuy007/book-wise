import { StarFilledIcon } from "@radix-ui/react-icons";

const BookCard = ({ img_url, title, author, avg_rating, rating_count, category }) => {
  return (
    <div className="flex flex-col items-start w-full max-w-[200px]">
      {/* Image container with fixed dimensions */}
      <div className="w-full aspect-[3/4] overflow-hidden rounded-lg">
        <img 
          src={img_url} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Rating section */}
      <div className="flex flex-row gap-2 pt-3 items-center w-full">
        <StarFilledIcon size={16} color="#FFD700" />
        <span className="text-xs font-semibold text-gray-600">
          {(avg_rating % 5 + Math.random()).toFixed(1)}
        </span>
        <span className="text-xs font-bold text-yellow-300"> · </span>
        <span className="text-xs font-semibold text-gray-500 overflow-hidden">
          {(rating_count % 1000).toLocaleString()} reviews
        </span>
      </div>

      {/* Book info section */}
      <div className="flex flex-col items-start w-full">
        <span className="font-bold text-sm text-purple-600 pt-3 w-full truncate">
          {category}
        </span>
        <h3 className="text-lg font-bold text-black pt-2 w-full truncate hover:text-clip hover:whitespace-normal hover:overflow-visible">
          {title}
        </h3>
        <span className="text-sm text-gray-500 w-full truncate">
          {author}
        </span>
      </div>
    </div>
  );
};

export default BookCard;
import { StarFilledIcon } from "@radix-ui/react-icons";

const BookCard = ({
  img_url,
  title,
  author,
  avg_rating,
  rating_count,
  category,
}) => {
  return (
    <div className="flex flex-col items-start w-full max-w-[210px] group">
      {/* Card container with hover effects */}
      <div
        className="w-full transition-all duration-300 ease-in-out transform 
                      group-hover:scale-105 group-hover:-translate-y-2 
                      group-hover:shadow-lg rounded-lg overflow-hidden
                      group-hover:border-2"
      >
        {/* Image container with fixed dimensions */}
        <div className="w-full aspect-[5/7.7] overflow-hidden">
          <img
            src={img_url}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Book info section */}
        <div className="p-3 bg-white">
          {/* Rating section */}
          <div className="flex flex-row gap-2 items-center w-full">
            <StarFilledIcon size={16} color="#FFD700" />
            <span className="text-xs font-semibold text-gray-600">
              {((avg_rating % 5) + Math.random()).toFixed(1)}
            </span>
            <span className="text-xs font-bold text-yellow-300"> · </span>
            <span className="text-xs font-semibold text-gray-500 overflow-hidden">
              {(rating_count % 1000).toLocaleString()} reviews
            </span>
          </div>

          <span className="font-bold text-sm text-purple-600 pt-3 block truncate">
            {category}
          </span>
          <h3 className="text-lg font-bold text-black pt-2 line-clamp-2 overflow-hidden text-clip">
            {title}
          </h3>
          <span className="text-sm text-gray-500 block truncate">{author}</span>
        </div>
      </div>
    </div>
  );
};

export default BookCard;

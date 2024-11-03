import React from "react";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";

function BookCard({
  img_url,
  title,
  author,
  publisher,
  publishedDate,
  description,
}) {
  return (
    <Card className="flex aspect-square border-2 border-accent rounded-lg shadow-lg">
      <img
        src={img_url}
        alt={`Book cover: ${title}`}
        className="w-5/12 h-full object-cover mr-4"
      />
      <div className="flex-1 flex flex-col text-start">
        <h3 className="text-lg font-bold text-foreground my-3">{title}</h3>
        <Separator className="mb-3" />
        <div className="flex flex-col gap-4 justify-between">
          <p className="text-sm text-foreground">Author: {author}</p>
          <p className="text-sm text-foreground">Publisher: {publisher}</p>
          <p className="text-sm text-foreground">
            Published Date: {publishedDate}
          </p>
        </div>
        <p className="text-sm mt-4">{description}</p>
      </div>
    </Card>
  );
}

export default BookCard;

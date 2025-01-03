"use client";

import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";

export default function PaginationControls({
  totalPages,
  currentPage,
  baseUrl,
}) {
  const router = useRouter();
  const pathname = usePathname();

  const handlePageChange = (page) => {
    router.push(`${baseUrl}?page=${page}`);
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        disabled={currentPage <= 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Previous
      </Button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? "default" : "outline"}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </Button>
      ))}

      <Button
        variant="outline"
        disabled={currentPage >= totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
      </Button>
    </div>
  );
}

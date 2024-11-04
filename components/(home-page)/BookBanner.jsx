import Image from "next/image"
import { Bookmark, Share2, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function BookBanner() {
  return (
    <div className="flex flex-col md:flex-row items-start gap-8 p-6 md:p-8 bg-[#f8f7f4] rounded-lg max-w-4xl mx-auto">
      <div className="relative w-full md:w-72 aspect-[3/4] shrink-0">
        <img
          src="https://www.nxbtre.com.vn/Images/Book/nxbtre_full_20222022_092215.jpg"
          alt="Harry Potter and the Half-Blood Prince book cover"
          className="rounded-lg shadow-lg object-cover"
          width={300}
          height={400}
          priority
        />
      </div>
      <div className="flex flex-col gap-4 flex-1">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-serif">Harry Potter: Half Blood Prince</h1>
          <p className="text-lg text-muted-foreground">JK Rowling</p>
        </div>
        <p className="text-muted-foreground">
          Get ready to uncover the dark secrets and betrayals in the book. A thrilling adventure awaits you.
        </p>
        <div className="flex items-center gap-4 mt-4">
          <Button className="gap-2">
            Start reading
            <svg
              className=" h-4 w-4 rotate-90"
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bookmark className="h-5 w-5" />
              <span className="sr-only">Bookmark</span>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Share2 className="h-5 w-5" />
              <span className="sr-only">Share</span>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Download className="h-5 w-5" />
              <span className="sr-only">Download</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
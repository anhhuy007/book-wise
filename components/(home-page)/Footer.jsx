import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Youtube, Twitter } from "lucide-react";
import Link from "next/link";

export default function Component() {
  return (
    <footer className="w-full bg-primary text-primary-foreground py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-foreground rounded-lg" />
              <span className="text-xl font-bold">Book Wise - HCMUS</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Hãy cùng chúng tôi khám phá thế giới sách với hàng ngàn cuốn sách
              phong phú và đa dạng.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-muted-foreground">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="hover:text-muted-foreground">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="hover:text-muted-foreground">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="hover:text-muted-foreground">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          {/* Get In Touch */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Thông tin liên lạc</h3>
            <div className="space-y-2 text-muted-foreground">
              <p>support@book-wise.com</p>
              <p>+91 945 658 3256</p>
              <p>227 Nguyễn Văn Cừ, quận 5, thành phố Hồ Chí Minh</p>
            </div>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Products</h3>
            <div className="space-y-2">
              <Link
                href="#"
                className="block text-muted-foreground hover:text-primary-foreground"
              >
                Home
              </Link>
              <Link
                href="#"
                className="block text-muted-foreground hover:text-primary-foreground"
              >
                About
              </Link>
              <Link
                href="#"
                className="block text-muted-foreground hover:text-primary-foreground"
              >
                Pricing
              </Link>
              <Link
                href="#"
                className="block text-muted-foreground hover:text-primary-foreground"
              >
                Features
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              Hãy tham gia cùng chúng tôi
            </h3>
            <div className="space-y-2">
              <Input
                className="bg-transparent border-border text-primary-foreground placeholder:text-muted-foreground"
                placeholder="Your email here.."
                type="email"
              />
              <Button className="w-full bg-primary hover:bg-primary-foreground text-primary-foreground border border-border">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-muted-foreground text-sm">
            @book-wise 2024, All rights reserved.
          </p>
          <div className="flex space-x-4 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-primary-foreground">
              Terms
            </Link>
            <Link href="#" className="hover:text-primary-foreground">
              Privacy
            </Link>
            <Link href="#" className="hover:text-primary-foreground">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

export default function FilterSheet() {
  const currentYear = new Date().getFullYear();
  const [category, setCategory] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [startYear, setStartYear] = useState("1900");
  const [endYear, setEndYear] = useState(currentYear.toString());
  const [ratingRange, setRatingRange] = useState([0, 5]);
  const [language, setLanguage] = useState("");

  const handleApply = () => {
    console.log("Applied filters:", {
      yearRange: [parseInt(startYear), parseInt(endYear)],
      authorName,
      category,
      ratingRange,
      language,
    });
    // Here you would typically call a function to apply these filters
  };

  const handleYearChange = (value, isStart) => {
    const year = parseInt(value, 10);
    if (isNaN(year)) return;

    if (isStart) {
      setStartYear(
        year < 1000 ? value : Math.min(year, currentYear).toString()
      );
    } else {
      setEndYear(year < 1000 ? value : Math.min(year, currentYear).toString());
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild className="">
        <Button className="flex items-center py-7 justify-between px-4 whitespace-nowrap font-semibold">
          <SlidersHorizontal size={20} />
          <p className="ml-3 text-base">Filters</p>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px]" side="left">
        <SheetTitle>Filter Option</SheetTitle>
        <div className="flex flex-col gap-10 mt-2 pt-8">
          <p className="text-3xl font-semibold">Bộ lọc tìm kiếm</p>
          <Accordion
            type="multiple"
            defaultValue={["basic-filter", "advance-filter"]}
            className="w-full space-y-2"
          >
            <AccordionItem value="basic-filter">
              <AccordionTrigger className="text-xl font-medium">
                Bộ lọc cơ bản
              </AccordionTrigger>
              <AccordionContent className="px-4 space-y-6">
                <div>
                  <Label htmlFor="author">Tác giả</Label>
                  <Input
                    id="author"
                    placeholder="Nhập tên tác giả"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Năm xuất bản</Label>
                  <div className="flex gap-10">
                    <div className="flex-1">
                      <Label htmlFor="startYear" className="sr-only">
                        Từ năm
                      </Label>
                      <Input
                        id="startYear"
                        type="number"
                        min="1000"
                        max={currentYear}
                        placeholder="Từ năm"
                        value={startYear}
                        onChange={(e) => handleYearChange(e.target.value, true)}
                      />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="endYear" className="sr-only">
                        Đến năm
                      </Label>
                      <Input
                        id="endYear"
                        type="number"
                        min="1000"
                        max={currentYear}
                        placeholder="Đến năm"
                        value={endYear}
                        onChange={(e) =>
                          handleYearChange(e.target.value, false)
                        }
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <Label htmlFor="category">Thể loại</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Chọn thể loại" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fiction">Tiểu thuyết</SelectItem>
                      <SelectItem value="non-fiction">Phi hư cấu</SelectItem>
                      <SelectItem value="science">Khoa học</SelectItem>
                      <SelectItem value="history">Lịch sử</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="advance-filter">
              <AccordionTrigger className="text-xl font-medium">
                Bộ lọc nâng cao
              </AccordionTrigger>
              <AccordionContent className="space-y-6 px-4">
                <div className="space-y-2">
                  <Label>Đánh giá</Label>
                  <div className="flex justify-between">
                    <span>{ratingRange[0]} sao</span>
                    <span>{ratingRange[1]} sao</span>
                  </div>
                  <Slider
                    min={0}
                    max={5}
                    step={0.5}
                    value={ratingRange}
                    onValueChange={setRatingRange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Ngôn ngữ</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Chọn ngôn ngữ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vietnamese">Tiếng Việt</SelectItem>
                      <SelectItem value="english">Tiếng Anh</SelectItem>
                      <SelectItem value="french">Tiếng Pháp</SelectItem>
                      <SelectItem value="german">Tiếng Đức</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Button onClick={handleApply}>Áp dụng bộ lọc</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
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
import { Button } from "@/components/ui/button";

function Filter({
  filters: initialFilters,
  onApplyFilters,
  disabledFields = {},
  ...props
}) {
  const currentYear = new Date().getFullYear();
  const [filters, setFilters] = useState({
    category: initialFilters.category || "",
    authorName: initialFilters.authorName || "",
    startYear: initialFilters.startYear || "1900",
    endYear: initialFilters.endYear || currentYear.toString(),
    ratingRange: initialFilters.ratingRange || [0, 5],
    language: initialFilters.language || "",
  });

  const handleApply = () => {
    onApplyFilters(filters);
  };

  const handleYearChange = (value, isStart) => {
    const year = parseInt(value, 10);
    if (isNaN(year)) return;

    if (isStart) {
      setFilters((prev) => ({
        ...prev,
        startYear: year < 1000 ? value : Math.min(year, currentYear).toString(),
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        endYear: year < 1000 ? value : Math.min(year, currentYear).toString(),
      }));
    }
  };

  return (
    <Card className="w-[400px] h-fit overflow-y-auto">
      <div className="flex flex-col gap-10 mt-2 px-8 p-6 ">
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
                  value={filters.authorName}
                  onChange={(e) =>
                    setFilters({ ...filters, authorName: e.target.value })
                  }
                  disabled={disabledFields.author}
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
                      value={filters.startYear}
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
                      value={filters.endYear}
                      onChange={(e) => handleYearChange(e.target.value, false)}
                    />
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor="category">Thể loại</Label>
                <Select
                  onValueChange={(value) =>
                    setFilters({ ...filters, category: value })
                  }
                  disabled={disabledFields.category}
                >
                  <SelectTrigger id="category">
                    <SelectValue
                      placeholder={
                        disabledFields.category
                          ? filters.category
                          : "Chọn thể loại"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fiction">Tiểu thuyết</SelectItem>
                    <SelectItem value="non-fiction">Phi hư cấu</SelectItem>
                    <SelectItem value="science">Khoa học</SelectItem>
                    <SelectItem value="history">Lịch sử</SelectItem>
                    <SelectItem value="self-development">
                      Phát triển bản thân
                    </SelectItem>
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
                  <span>{filters.ratingRange[0]} sao</span>
                  <span>{filters.ratingRange[1]} sao</span>
                </div>
                <Slider
                  min={0}
                  max={5}
                  step={0.5}
                  value={filters.ratingRange}
                  onValueChange={(value) =>
                    setFilters({ ...filters, ratingRange: value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">Ngôn ngữ</Label>
                <Select
                  value={filters.language}
                  onValueChange={(value) =>
                    setFilters({ ...filters, language: value })
                  }
                >
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
    </Card>
  );
}

export default Filter;

import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

function BookAvailableStatus({ bookData }) {
  return (
    <Card className="max-w-80 p-4 space-y-4">
      <div className="space-y-2 text-center">
        <h2 className="text-lg font-semibold text-green-600">
          Tình trạng sách
        </h2>
        <p className="text-sm">
          {bookData.total} bản sao | {bookData.available} có sẵn |{" "}
          {bookData.onHold} đang giữ
        </p>
      </div>
      <Button className="w-full bg-green-600 hover:bg-green-700">
        Đặt giữ
      </Button>
      <Button className="w-full" variant="outline">
        Để dành sau
      </Button>
      <Button variant="link" className="text-sm text-blue-600 w-full text-left">
        Tình trạng theo địa điểm
      </Button>
    </Card>
  );
}

export default BookAvailableStatus;

import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

function BookAvailableStatus({ bookData }) {
  return (
    <Card className="max-w-70 p-8 space-y-5 mt-2 md:mt-20 xl:mt-0">
      <div className="space-y-2 text-center">
        <h2 className="text-lg font-semibold  text-foreground">
          Tình trạng sách
        </h2>
        <span className="text-sm flex items-center">
          <p>{bookData.copy}0 - Bản Copy</p>
          <span className="mx-2">|</span>
          <p>{bookData.available}1 - Có sẵn</p>
          <span className="mx-2">|</span>
          <p>{bookData.onHold}2 - Được mượn</p>
        </span>
      </div>
      <Button className="w-full bg-primary text-primary-foreground">
        Mượn sách
      </Button>
      <Button className="w-full" variant="outline">
        Lưu vào Yêu thích
      </Button>
      {/* <Button variant="link" className="text-sm text-blue-600 w-full text-left">
        Tình trạng theo địa điểm
      </Button> */}
    </Card>
  );
}

export default BookAvailableStatus;

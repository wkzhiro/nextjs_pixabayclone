// DisplayImages.tsx
import { useState } from "react";
import { BusinessCard } from "./businesscard/BusinessCard";
import { dummyData } from "@/data/dummyData"; // エイリアス設定に合わせてパスを調整
import { Pagination } from "./Pagination";

export default function DisplayCards({ images }) {
  // const datalist = dummyData
  const datalist = images
  console.log("datalist",datalist)

  const [currentPage, setCurrentPage] = useState(1);
  // 1ページあたりのアイテム数
  const itemsPerPage = 12;
  // 総アイテム数
  const totalItems = datalist.length;
  // 現在のページに応じて表示するデータを切り出し
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = datalist.slice(startIndex, endIndex);
  // ページングに表示する "◯ - ◯"
  const startItem = startIndex + 1; // 1-based
  const endItem = Math.min(endIndex, totalItems);

  // 「前へ」ボタン
  const onPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // 「次へ」ボタン
  const onNext = () => {
    if (endIndex < totalItems) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="pt-[80px] bg-[#F2F6F9]">
      {/* max-w-screen-xl */}
      <div className="w-full mx-auto px-20">
        <p className="mb-[100px] text-[36px] font-semibold text-left m-0">
          該当者：{totalItems}名
        </p>
        <div className="grid grid-cols-3 gap-4">
          {/* imageは本来file_nameだが一旦仮置き,work={data.product_image_path}も */}
          {currentItems.map((data:any, index:any) => (
            <BusinessCard
              key={index}
               name={data.name || data.creator_name}
              furigana={data.name_furigana}
               uuid={data.creator_id}
               image={data.file_name}
              personInfo={data.personInfo}
               tags={data.occupations}
               date={data.product_number || data.latest_product_number}
              fileType={data.fileType}
               title={data.product_title || data.latest_product_title}
               work={data.product_image_path || data.latest_product_image_path}
               company={data.company_name}
               inquiry_email={data.inquiry_email || data.latest_inquiry_email}
               inquiry_phone={data.inquiry_phone || data.latest_inquiry_phone}
            />
          ))}
        </div>
        <div className="flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            startItem={startItem}
            endItem={endItem}
            onPrevious={onPrevious}
            onNext={onNext}
            />
        </div>
      </div>
    </div>
  );
}

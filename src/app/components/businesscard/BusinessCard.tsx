import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { InfoRow } from "./InfoRow";
import { Tag } from "./Tag";
import { BusinessCardProps } from "@/types/businesscard";

export const BusinessCard: React.FC<BusinessCardProps> = ({
  uuid,         // 追加：ビジネスカードの識別子
  image,        // プロフィール画像のURL
  personInfo,   // { name, englishname, department, phone, email }
  tags,         // 例: ["ディレクター"]
  date,         // 例: "2022年"
  fileType,     // 例: "動画"
  title,        // 作品タイトル（説明文）
  work          // 作品画像のURL
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // モーダル処理は必要な場合のみ利用
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  return (
    <div className="max-w-md w-full mx-auto bg-white rounded-lg shadow p-6">
      {/* 上部: プロフィール写真＋氏名＆問い合わせ先 */}
      <div className="flex items-center space-x-4 p-4 w-full h-40">
        {/* 左側: 画像 + タグ */}
        <div className="w-1/2 flex flex-col items-center">
          <Link href={`/profile/${uuid}`}>
            <div className="relative w-20 h-20 cursor-pointer">
              <Image
                src={image}
                alt={personInfo.name}
                fill
                sizes="(max-width: 50px) 100vw"
                className="rounded-lg object-cover"
              />
            </div>
          </Link>
          {/* タグ（ディレクターなど） */}
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag, index) => (
              <Tag key={index} text={tag} />
            ))}
          </div>
        </div>

        {/* 右側: 氏名 + 問い合わせ先 */}
        <div className="w-1/2 flex flex-col">
          <div className="text-xl font-bold text-black">
            {personInfo.name}
          </div>
          <div className="text-sm text-gray-600">
            {personInfo.englishname}
          </div>
          <div className="flex flex-col h-20 justify-center">
            <InfoRow 
              label="問い合わせ先" 
              company={personInfo.department} 
              phone={personInfo.phone} 
              email={personInfo.email} 
            />
          </div>
        </div>
      </div>
      
      {/* 区切り線 */}
      <hr className="my-4 border-gray-300" />

      {/* 作品画像＋説明文 */}
      <div className="flex flex-col items-center h-30">
        <Image
          src={work}
          alt="作品画像"
          width={300}
          height={180}
          className="object-contain cursor-pointer"
          onClick={openModal} // 作品画像クリック時はモーダル表示（必要なら残す）
        />
        <p className="mt-3 text-sm text-gray-700 text-center whitespace-pre-line">
          {title}
          <br />
          {date}
        </p>
      </div>

      {/* モーダルウィンドウ（必要な場合） */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={closeModal}
        >
          <div
            className="relative bg-white rounded-lg w-11/12 max-w-4xl overflow-y-auto max-h-[90%]"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src="https://tech0-jp.com/"
              className="w-full h-[500px] rounded-b-lg"
              title="Modal Content"
            />
          </div>
        </div>
      )}
    </div>
  );
};

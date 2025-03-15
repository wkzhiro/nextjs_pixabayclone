import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Tag } from "./Tag";
import { BusinessCardProps } from "@/types/businesscard";

function isValidUrl(value:string) {
  try {
    new URL(value);
    return true;
  } catch (err) {
    return false;
  }
}

export const BusinessCard: React.FC<BusinessCardProps> = ({
  uuid,         // 追加：ビジネスカードの識別子
  name,
  furigana,
  image,        // プロフィール画像のURL
  personInfo,   // { name, englishname, department, phone, email }
  tags,         // 例: ["ディレクター"]
  date,         // 例: "2022年"
  fileType,     // 例: "動画"
  title,        // 作品タイトル（説明文）
  work,
  inquiry_email,
  inquiry_phone,
  company          // 作品画像のURL
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


  const [imageUrl, setImageUrl] = useState<string | null>();
  const [productUrl, setProductUrl] = useState<string | null>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!image) return; // image が空の場合は何もしない
    // image がすでに有効な URL なら、そのままセット
    if (isValidUrl(image)) {
      setImageUrl(image);
      return;
    }
    // image が URL 形式でなければ、API 経由で取得する
    const fetchBlobUrl = async () => {
      try {
        const res = await fetch(`/api/get_staff_imaga_by_azure_storage?fileName=${encodeURIComponent(image)}`);
        if (!res.ok) {
          throw new Error("Failed to fetch blob URL");
        }
        const data = await res.json();
        setImageUrl(data.url);
      } catch (err: any) {
        setError(err.message);
      }
    };
    fetchBlobUrl();
  });

  useEffect(() => {
    if (!work) return;
    // image がすでに有効な URL なら、そのままセット
    if (isValidUrl(work)) {
      setProductUrl(work);
      return;
    }
    // image が URL 形式でなければ、API 経由で取得する
    const fetchBlobUrl = async () => {
      try {
        const res = await fetch(`/api/get_product_image_by_azure_storage?fileName=${encodeURIComponent(work)}`);
        if (!res.ok) {
          throw new Error("Failed to fetch blob URL");
        }
        const data = await res.json();
        setProductUrl(data.url);
      } catch (err: any) {
        setError(err.message);
      }
    };
    fetchBlobUrl();
  });

  return (
    <div className="w-full max-w-md bg-white border border-gray-300 rounded-md shadow-sm overflow-hidden">
      {/* 黒いバーを最上部に配置 */}
      <div className="bg-black w-full h-2" />
      {/* 上部: 顔写真 + タグ（左） と 名前 + 連絡先（右） */}
      <div className="p-4 flex flex-col md:flex-row md:items-start md:justify-center">
        {/* 左側：顔写真＆タグ */}
        <div className="md:w-1/2 flex flex-col items-center md:items-start">
          <Link href={`/profile/${uuid}`}>
            <div className="relative w-24 h-24 rounded-full overflow-hidden mb-2 cursor-pointer">
              <Image
                src={imageUrl}
                alt={name}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </Link>
          {/* タグ */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <Tag key={index} text={tag} />
              ))}
            </div>
          )}
        </div>

        {/* 右側：名前 + 連絡先 */}
        <div className="mt-4 md:mt-0 md:w-1/2 md:ml-4 flex flex-col items-center md:items-start">
          {/* 名前・英名 */}
          <h2 className="text-xl font-bold text-gray-800">{name}</h2>
          <p className="text-sm text-gray-500 mb-4">{furigana}</p>

          {/* 連絡先 */}
          <div className="flex items-center text-gray-700 mb-2">
            <span className="inline-block w-5 mr-2">💼</span>
            <span className="text-[8px]">{company}</span>
          </div>
          <div className="flex items-center text-gray-700 mb-2">
            <span className="inline-block w-5 mr-2">📞</span>
            <span className="text-[10px]">{inquiry_phone}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <span className="inline-block w-5 mr-2">✉️</span>
            <span className="text-[8px]">{inquiry_email}</span>
          </div>
        </div>
      </div>

      {/* 仕切り線 */}
      <hr className="border-[#E2E2E2] mx-4" />

      {/* 下部: 作品画像 + タイトル + 日付 */}
      <div className="px-4 py-4 flex flex-col items-start">
        {/* 作品画像 */}
        <div
          className="w-full h-auto mb-3 cursor-pointer"
          onClick={openModal}
        >
          {/* 本来はsrcにworkを入れる */}
          <Image
            src={productUrl}
            alt="作品画像"
            width={600}
            height={350}
            className="object-cover rounded-md"
          />
        </div>

        {/* タイトル・日付 */}
        <p className="text-left text-gray-800 text-sm whitespace-pre-line">
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

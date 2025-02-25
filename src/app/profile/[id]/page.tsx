"use client";

import React from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { dummyData } from "@/data/dummyData";

export default function ProfilePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  // id がまだ取得できていない場合はローディング表示
  if (!id) {
    return <div>Loading...</div>;
  }

  // uuid に一致するデータを取得
  const profile = dummyData.find((item) => item.uuid === id);

  if (!profile) {
    return <div>Profile not found</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      {/* 戻るボタン */}
      <button
        className="flex items-center text-blue-600 mb-4"
        onClick={() => router.back()}
      >
        <span className="mr-2">&larr;</span>Back
      </button>

      {/* 上部プロフィールセクション */}
      <div className="flex flex-col md:flex-row md:items-center bg-white shadow rounded p-4 mb-8">
        {/* 左側: プロフィール写真 */}
        <div className="relative w-40 h-40 mr-6">
          <Image
            src={profile.image} 
            alt="プロフィール写真"
            fill
            sizes="(max-width: 40px) 100vw"
            className="object-cover rounded"
          />
        </div>

        {/* 右側: 氏名や肩書き、自己紹介 */}
        <div className="flex-1 mt-4 md:mt-0">
          <div className="text-xl font-bold mb-1">
            {profile.personInfo.name}
          </div>
          <div className="text-gray-600 text-sm mb-4">
            {profile.title}
          </div>
          <p className="text-sm text-gray-700 mb-4">
            {profile.bio}
          </p>
          {/* ボタン類 */}
          <div className="flex gap-3">
            {profile.contactButtons &&
              profile.contactButtons.map((btn, i) => (
                <button
                  key={i}
                  className={`px-4 py-2 ${btn.style} rounded ${btn.hover}`}
                >
                  {btn.label}
                </button>
              ))}
          </div>
        </div>
      </div>

      {/* Related Works セクション */}
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-4">Related Works</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {profile.relatedWorks &&
            profile.relatedWorks.map((work, i) => (
              <div key={i} className="bg-white shadow rounded overflow-hidden">
                <div className="relative w-full h-40">
                  <Image
                    src={work.image}
                    alt={`work-${i}`}
                    fill
                    sizes="(max-width: 100%)"
                    className="object-cover"
                  />
                </div>
                <div className="p-2 text-sm">
                  <div className="font-semibold">{work.title}</div>
                  <div className="text-gray-600">{work.description}</div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Related Staff セクション */}
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-4">Related Staff</h2>
        <div className="flex flex-wrap gap-4">
          {profile.relatedStaff &&
            profile.relatedStaff.map((staff, i) => (
              <div key={i} className="flex flex-col items-center w-16 text-center">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mb-1">
                  <Image
                    src={staff.image}
                    alt={staff.name}
                    fill
                    sizes="(max-width: 100%)"
                    className="object-cover"
                  />
                </div>
                <div className="text-xs text-gray-700">{staff.name}</div>
              </div>
            ))}
        </div>
      </div>

      {/* Basic Info セクション */}
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-4">Basic Info</h2>
        <div className="bg-white shadow rounded p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {/* 左側テーブル */}
            <div>
              {profile.basicInfoLeft &&
                profile.basicInfoLeft.map((item, i) => (
                  <div key={i} className="mb-2">
                    <span className="font-semibold text-black">
                      {item.label}
                    </span>
                    <span className="text-black">{item.value}</span>
                  </div>
                ))}
            </div>
            {/* 右側テーブル */}
            <div>
              {profile.basicInfoRight &&
                profile.basicInfoRight.map((item, i) => (
                  <div key={i} className="mb-2">
                    <span className="font-semibold text-black">
                      {item.label}
                    </span>
                    <span className="text-black">{item.value}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

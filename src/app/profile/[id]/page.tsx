"use client";

import React from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { dummyData } from "@/data/dummyData";
import { 
  FaPhone,
  FaEnvelope,
  FaBuilding,
  FaGlobe, 
  FaInstagram, 
  FaUserShield,
  FaMapMarkerAlt,
  FaFax,
  } from "react-icons/fa";

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

  // 関連作品のcost（制作費）の最小値と最大値を算出
  const workCosts = profile.relatedWorks?.map(work => work.cost) || [];
  const minCost = workCosts.length > 0 ? Math.min(...workCosts) : 0;
  const maxCost = workCosts.length > 0 ? Math.max(...workCosts) : 0;

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* 戻るボタン */}
      <button
        className="flex items-center text-blue-600 mb-4"
        onClick={() => router.back()}
      >
        <span className="mr-2">&larr;</span>Back
      </button>

      {/* 上部プロフィールセクション */}
      <div className="flex flex-col md:flex-row items-start md:items-center  p-4 mb-8">
        {/* 左側: プロフィール写真 */}
        <div className="relative w-[360px] h-[360px] mb-4 md:mb-0 md:mr-6 shrink-0">
          <Image
            src={profile.image}
            alt="プロフィール写真"
            fill
            sizes="(max-width: 360px) 100vw"
            className="object-cover rounded"
          />
        </div>

        {/* 右側: 役職・氏名・ボタン・連絡先など */}
        <div className="flex-1">
          {/* 横並びにしたい要素をラップする */}
          <div className="flex items-start justify-start">
            {/* 左側: タグ、名前、英語名 */}
            <div className="mr-8">
              {/* 役職やタグ */}
              <div className="text-s text-black mb-1">
                {profile.tags}
              </div>

              {/* 氏名と英語名を横並びに */}
              <div className="flex items-center mb-4">
                <h1 className="text-3xl font-bold text-black mr-3">
                  {profile.personInfo.name}
                </h1>
                {profile.personInfo.englishname && (
                  <h2 className="text-sm text-black mt-3">
                    {profile.personInfo.englishname}
                  </h2>
                )}
              </div>
              {/* Profile Download ボタンを常に表示 */}
              <div className="mb-1">
                <button
                  className="px-10 py-2 border text-s border-gray-300 rounded hover:bg-gray-100 mr-12 inline-flex items-center gap-1"
                >
                  Profile Download
                  {/* アイコン（ダウンロード）を表示する例：Heroiconsなどを使う場合 */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 4v16h16V4M12 8v8m-3-3 3 3 3-3"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* 右側: 会社名、ポートフォリオ、インスタグラム */}
            <div className="flex flex-col gap-1 text-sm text-gray-700">
              {/* 会社名 */}
              <div className="flex items-center mt-6 mb-2 gap-2">
                <FaBuilding className="text-black" />
                <p>{profile.companyName}</p>
              </div>
              {/* ポートフォリオサイト */}
              <div className="flex items-center mb-2 gap-2">
                <FaGlobe className="text-black" />
                <a
                  href={profile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline break-all"
                >
                  {profile.website}
                </a>
              </div>
              {/* インスタグラム */}
              <div className="flex items-center mb-2 gap-2">
                <FaInstagram className="text-black" />
                <a
                  href={profile.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline break-all"
                >
                  {profile.instagram}
                </a>
              </div>
            </div>
          </div>

           {/* 区切り線 */}
          <hr className="my-4" />

          {/* 自己紹介テキスト */}
          <div className="my-8 text-sm text-gray-800 leading-relaxed">
            {profile.bio}
          </div>
          
          {/* 区切り線 */}
          <hr className="my-4" />
        </div>
      </div>

      {/* Contact セクション */}
      <div className="mb-8 bg-white shadow rounded p-8 max-w-3xl mx-auto">
        <div className="flex items-center gap-8 ml-8">
          {/* 左側：Contact */}
          <div className="text-base font-bold">
            Contact
          </div>

          {/* 縦の区切り線 */}
          <div className="border-l border-gray-300 h-6" />

          {/* 右側：Manager 情報・電話・メール */}
          <div className="flex items-center gap-10">
            {/* Manager */}
            <div className="flex items-center gap-4">
                Manager
            <span> {profile.contactInfo.managerName}</span>
            </div>

            {/* 電話アイコン + 電話番号 */}
            <div className="flex items-center gap-4">
              <FaPhone className="text-black" />
              <span>{profile.contactInfo.managerPhone}</span>
            </div>

            {/* メールアイコン + メールアドレス */}
            <div className="flex items-center gap-4">
              <FaEnvelope className="text-black" />
              <span>{profile.contactInfo.managerEmail}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Works セクション */}
      <div className="mb-8">
        <div className="mb-8 flex items-center ">
          <h2 className="text-2xl font-bold mr-12">Related Works</h2>
          <span className="text-2xl text-gray-500">{profile.relatedWorks?.length}件</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {profile.relatedWorks &&
            profile.relatedWorks.map((work, i) => (
              <div key={i} className="rounded overflow-hidden">
                <div className="relative w-[360px] h-[206px] mx-auto">
                  <Image
                    src={work.image}
                    alt={`work-${i}`}
                    fill
                    sizes="(max-width: 100%)"
                    className="object-cover"
                  />
                </div>
                <div className="p-2 text-s mb-4">
                  <div className="text-black mt-1 mb-1">{work.title}</div>
                  <div className="text-black">{work.description}</div>
                </div>
                 {/* Producer / PM ボタンと担当者 */}
                 <div className="flex flex-wrap gap-4">
                    {/* Producer */}
                    <div className="flex items-center">
                      {/* 丸角の四角（ボタンではなく <div> など） */}
                      <div className="bg-black text-sm text-white rounded px-3 py-1 mr-4 w-[104px] h-[26px] flex items-center justify-center">
                        Producer
                      </div>
                      <span>谷 詩文</span>
                    </div>
                    {/* PM */}
                    <div className="flex items-center">
                      <div className="bg-black text-sm text-white rounded px-3 py-1 mr-4 w-[104px]  h-[26px] flex items-center justify-center">
                        PM
                      </div>
                      <span>田中 幸太郎</span>
                    </div>
                  </div>
              </div>
            ))}
        </div>
      </div>

      {/* Related Staff セクション */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-8">Related Staff</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {profile.relatedStaff &&
            profile.relatedStaff.map((staff, i) => (
              <div key={i} className="flex flex-col items-center flex items-center justify-center">
                <div className="relative w-[200px] h-[200px] mx-auto mb-1">
                  <Image
                    src={staff.image}
                    alt={staff.name}
                    fill
                    sizes="(max-width: 100%)"
                    className="object-cover"
                  />
                </div>
                  <div className="bg-black text-sm text-white rounded px-3 py-1 my-3 w-[104px] h-[26px] flex items-center justify-center">PM</div>
                  <div className="text-sm font-bold text-gray-700">{staff.name}</div>
              </div>
            ))}
        </div>
      </div>

      {/* Basic Info セクション */}
      <h2 className="text-2xl font-bold mb-8">Basic Info</h2>

      <div className="mb-8 max-w-3xl mx-auto">
        <div className="bg-white shadow rounded p-4">
          {/* 2カラムのグリッド：左が「所属先」、右が「個人」 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 左カラム：所属先 */}
            <div className="border-r border-gray-300 pr-4">
              <h3 className="text-center mb-4 font-semibold">所属先</h3>
              <hr className="my-4 mx-2" />

              {/* 会社名 */}
              <div className="flex items-start mb-2 mx-10 gap-2">
                <FaBuilding className="text-gray-600 mt-1 mr-2" />
                <div>{profile.basicInfo.affiliation.companyName}</div>
              </div>

              {/* 役職 / Manager */}
              <div className="flex items-start mb-2 mx-10 gap-2">
                <FaUserShield className="text-gray-600 mt-1 mr-2" />
                <div>{profile.basicInfo.affiliation.manager}</div>
              </div>

              {/* 郵便番号・住所 */}
              <div className="flex items-start mb-2 mx-10 gap-2">
                <FaMapMarkerAlt className="text-gray-600 mt-1 mr-2" />
                <div>
                  {profile.basicInfo.affiliation.postalCode}
                  <br />
                  {profile.basicInfo.affiliation.address}
                </div>
              </div>
              <hr className="my-4 mx-2" />

              {/* 電話番号 */}
              <div className="flex items-start mb-2 mx-10 gap-2">
                <FaPhone className="text-gray-600 mt-1 mr-2" />
                <div>
                  {profile.basicInfo.affiliation.phone.map((phone, index) => (
                    <div key={index}>{phone}</div>
                  ))}
                </div>
              </div>

              {/* FAX */}
              <div className="flex items-start mb-2 mx-10 gap-2">
                <FaFax className="text-gray-600 mt-1 mr-2" />
                <div>{profile.basicInfo.affiliation.fax}</div>
              </div>
              <hr className="my-4 mx-2" />

              {/* メールアドレス */}
              <div className="flex items-start mb-2 mx-10 gap-2">
                <FaEnvelope className="text-gray-600 mt-1 mr-2" />
                <div>{profile.basicInfo.affiliation.email}</div>
              </div>

              {/* Webサイト */}
              <div className="flex items-start mb-2 mx-10 gap-2">
                <FaGlobe className="text-gray-600 mt-1 mr-2" />
                <a
                  href={profile.basicInfo.affiliation.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline break-all"
                >
                  {profile.basicInfo.affiliation.website}
                </a>
              </div>
            </div>

            {/* 右カラム：個人 */}
            <div>
              <h3 className="text-center mb-4 font-semibold">個人</h3>
              <hr className="my-4 mx-2" />

              {/* 郵便番号・住所 */}
              <div className="flex items-start mb-2 mx-10 mt-20 gap-2">
                <FaMapMarkerAlt className="text-gray-600 mt-1 mr-2" />
                <div>
                  {profile.basicInfo.personal.postalCode}
                  <br />
                  {profile.basicInfo.personal.address}
                </div>
              </div>
              <hr className="my-4 mx-2" />

              {/* 電話番号 */}
              <div className="flex items-start mb-2 mx-10 gap-2">
                <FaPhone className="text-gray-600 mt-1 mr-2" />
                <div>{profile.basicInfo.personal.phone}</div>
              </div>

              {/* FAX */}
              <div className="flex items-start mb-10 mx-10 gap-2">
                <FaFax className="text-gray-600 mt-1 mr-2" />
                <div>{profile.basicInfo.personal.fax}</div>
              </div>
              <hr className="my-4 mx-2" />

              {/* メールアドレス */}
              <div className="flex items-start mb-2 mx-10 gap-2">
                <FaEnvelope className="text-gray-600 mt-1 mr-2" />
                <div>{profile.basicInfo.personal.email}</div>
              </div>

              {/* Webサイト */}
              <div className="flex items-start mb-2 mx-10 gap-2">
                <FaGlobe className="text-gray-600 mt-1 mr-2" />
                <a
                  href={profile.basicInfo.personal.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline break-all"
                >
                  {profile.basicInfo.personal.website}
                </a>
              </div>
            </div>
          </div>
        </div>

      {/* cost セクション */}
      <div className="my-8 bg-white shadow rounded p-8 max-w-3xl mx-auto">
        <div className="flex items-center gap-8 ml-8">
          {/* 左側：費用ラベル */}
          <div className="text-base font-bold">
            費用
          </div>

          {/* 縦の区切り線 */}
          <div className="border-l border-gray-300 h-6" />

          {/* 右側：最小～最大の制作費（万円）を中央寄せ */}
          <div className="flex-1 flex items-center justify-center text-center mr-32">
            <span className="text-base">
              最小  {minCost} 万円　～　最大 {maxCost} 万円
            </span>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

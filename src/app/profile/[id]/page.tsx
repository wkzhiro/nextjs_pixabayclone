"use client";

import React, { useState, useEffect } from "react";
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
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // id がまだ取得できていない場合はローディング表示
  if (!id) {
    return <div>Loading...</div>;
  }
  console.log("test")

  // データ取得
  useEffect(() => {
    if (!id) return;
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_AZURE_BACK_ENDPOINT}/api/v1/creator/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch profile data");
        }
        const data = await res.json();
        console.log("detail",data)
        setProfile(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id]);


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // if (!detailprofile) return <div>Profile not found</div>;
  // // dummyデータ処理 //
  // // uuid に一致するデータを取得
  // const dummyprofile = dummyData.find((item) => item.uuid === id);
  // if (!dummyprofile) {
  //   return <div>Profile not found</div>;
  // }
  // // 関連作品のcost（制作費）の最小値と最大値を算出
  // const workCosts = dummyprofile.relatedWorks?.map((work) => work.cost) || [];
  // const minCost = workCosts.length > 0 ? Math.min(...workCosts) : 0;
  // const maxCost = workCosts.length > 0 ? Math.max(...workCosts) : 0;
  // ////////////////////

  return (
    <div className="w-full">
      {/* 上部～Contact までは白背景 */}
      <div className="bg-white py-4">
        {/* 戻るボタン */}
        <div className="max-w-6xl mx-auto p-4">
          <button
            className="flex items-center text-blue-600 mb-4"
            onClick={() => router.back()}
          >
            <span className="mr-2">&larr;</span>Back
          </button>
        </div>

        {/* 上部プロフィールセクション */}
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center p-4">
          {/* 左側: プロフィール写真 */}
          <div className="relative w-[360px] h-[360px] mb-4 md:mb-0 md:mr-6 shrink-0">
            <Image
              src={profile.creator.file_path}
              alt="プロフィール写真"
              fill
              sizes="(max-width: 360px) 100vw"
              className="object-cover rounded"
            />
          </div>

          {/* 右側: 役職・氏名・ボタン・連絡先など */}
          <div className="flex-1 ml-8">
            {/* 横並びにしたい要素をラップする */}
            <div className="flex items-start justify-start">
              {/* 左側: タグ、名前、英語名 */}
              <div className="mr-8">
                {/* 役職やタグ */}
                <div className="text-s text-black mb-1">
                  {profile.creator.occupations
                    .map((occ: any) => occ.occupation_name)
                    .join(", ")}
                </div>

                {/* 氏名と英語名を横並びに */}
                <div className="flex items-center mb-4">
                  <h1 className="text-3xl font-bold text-black mr-3">
                    {profile.creator.name}
                  </h1>
                  {profile.creator.name_furigana && (
                    <h2 className="text-sm text-black mt-3">
                      {profile.creator.name_furigana}
                    </h2>
                  )}
                </div>
                {/* Profile Download ボタンを常に表示 */}
                <div className="mb-1">
                  <button className="px-10 py-2 border text-s border-gray-300 rounded hover:bg-gray-100 mr-12 inline-flex items-center gap-1">
                    Profile Download
                    {/* ダウンロードアイコン */}
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
              {/* ここまでできている */}

              {/* 右側: 会社名、ポートフォリオ、インスタグラム */}
              <div className="flex flex-col gap-1 text-sm text-gray-700">
                {/* 会社名 */}
                <div className="flex items-center mt-6 mb-2 gap-2">
                  <FaBuilding className="text-black" />
                  <p>{profile.creator.company.company_name ?? "N/A"}</p>
                </div>
                {/* ポートフォリオサイト */}
                {profile.creator.portfolio_site ? (
                  <div className="flex items-center mb-2 gap-2">
                    <FaGlobe className="text-black" />
                    <a
                      href={profile.creator.portfolio_site}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline break-all"
                    >
                      {profile.creator.portfolio_site}
                    </a>
                  </div>
                ) : (
                  // 必要であれば、ポートフォリオがない場合の代替表示（不要なら何も表示しない）
                  <div className="flex items-center mb-2 gap-2">
                    <FaGlobe className="text-black" />
                    N/A
                  </div>
                )}

                {/* インスタグラム */}
                {profile.creator.instagram ? (
                  <div className="flex items-center mb-2 gap-2">
                    <FaInstagram className="text-black" />
                    <a
                      href={profile.creator.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline break-all"
                    >
                      {profile.creator.instagram}
                    </a>
                  </div>
                ) : (
                  <div className="flex items-center mb-2 gap-2">
                    <FaInstagram className="text-black" />
                    N/A
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-20 mt-8">
              <hr className="border-t border-black" />
              <div className="text-sm ml-2 text-gray-800 leading-relaxed">
                {profile.creator.bio ?? "只今、経歴の更新を行っております。"}
              </div>
              <hr className="border-t border-black" />
            </div>
          </div>
        </div>
        {/* Contact セクション */}
        <div className="max-w-3xl mx-auto my-8 bg-white border border-black border-1 shadow rounded p-8">
          <div className="flex items-center gap-8 ml-8">
            <div className="text-base font-bold">Contact</div>
            <div className="border-l border-gray-300 h-6" />
            <div className="flex items-center gap-10">
              {/* Manager */}
              <div className="flex items-center gap-4">
                Manager
                <span>{profile.creator.inquiry_contact.inquiry_responsible_person ?? "N/A"}</span>
              </div>

              {/* 電話アイコン + 電話番号 */}
              <div className="flex items-center gap-4">
                <FaPhone className="text-black" />
                <span>{profile.creator.inquiry_contact.inquiry_phone ?? "N/A"}</span>
              </div>

              {/* メールアイコン + メールアドレス */}
              <div className="flex items-center gap-4">
                <FaEnvelope className="text-black" />
                <span>{profile.creator.inquiry_contact.inquiry_email ?? "N/A"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 以下をグレー背景にする */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Related Works セクション */}
          <div className="mb-8">
            <div className="mb-8 flex items-center">
              <h2 className="text-2xl font-bold mr-12">Related Works</h2>
              <span className="text-2xl text-gray-500">
                {profile.relatedworks?.length}件
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {profile.relatedworks &&
                profile.relatedworks.map((work:any, i:number) => (
                  <div key={i} className="rounded overflow-hidden">
                    <div className="relative w-[360px] h-[206px] mx-auto">
                      <Image
                        src={work.product_image_path}
                        alt={`work-${i}`}
                        fill
                        sizes="(max-width: 100%)"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-2 text-s mb-4">
                      <div className="text-black mt-1 mb-1">{work.title}</div>
                      <div className="text-black">{work.product_number}</div>
                    </div>
                    {/* Producer / PM ボタンと担当者 */}
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center">
                        <div className="bg-black text-sm text-white rounded px-3 py-2 mr-4 w-[104px] h-[26px] flex items-center justify-center">
                          Producer
                        </div>
                        <span>{work.associated_employees?.Producer?.employee_name ?? "N/A"}</span>
                      </div>
                      <div className="flex items-center">
                        <div className="bg-black text-sm text-white rounded px-3 py-2 mr-4 w-[104px] h-[26px] flex items-center justify-center">
                          PM
                        </div>
                        <span>{work.associated_employees?.PM?.employee_name ?? "N/A"}</span>
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
              {profile.relatedstaff &&
                profile.relatedstaff.map((staff:any, i:number) => (
                  <div
                    key={i}
                    className="flex flex-col items-center justify-center"
                  >
                    <div className="relative w-[200px] h-[200px] mx-auto mb-1">
                      <Image
                        src={staff.file_path}
                        alt={staff.name}
                        fill
                        sizes="(max-width: 100%)"
                        className="object-cover"
                      />
                    </div>
                    <div className="bg-black text-sm text-white rounded px-3 py-1 my-3 w-[104px] h-[26px] flex items-center justify-center">
                      {staff.occupations.map((occ: any) => occ.occupation_name ?? "N/A")}
                    </div>
                    <div className="text-sm font-bold text-gray-700">
                      {staff.name}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Basic Info セクション */}
          <h2 className="text-2xl font-bold mb-8">Basic Info</h2>
          <div className="mb-8 max-w-3xl mx-auto">
            <div className="bg-white shadow rounded p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 左カラム：所属先 */}
                <div className="border-r border-gray-300 pr-4">
                  <h3 className="text-center mb-4 font-semibold">所属先</h3>
                  <hr className="my-4 mx-2" />

                  <div className="flex items-start mb-2 mx-10 gap-2">
                    <FaBuilding className="text-gray-600 mt-1 mr-2" />
                    <div>{profile.creator.company.company_name ?? "N/A"}</div>
                  </div>

                  <div className="flex items-start mb-2 mx-10 gap-2">
                    <FaUserShield className="text-gray-600 mt-1 mr-2" />
                    <div>{profile.creator.inquiry_contact.inquiry_responsible_person ?? "N/A"}</div>
                  </div>

                  <div className="flex items-start mb-2 mx-10 gap-2">
                    <FaMapMarkerAlt className="text-gray-600 mt-1 mr-2" />
                    <div>
                      {profile.creator.company.com_postal_code ?? ""}
                      <br />
                      {profile.creator.company.com_address ?? "N/A"}
                    </div>
                  </div>
                  <hr className="my-4 mx-2" />

                  <div className="flex items-start mb-2 mx-10 gap-2">
                    <FaPhone className="text-gray-600 mt-1 mr-2" />
                    <div>
                      {profile.creator.company.contact_phone ?? "N/A"}
                      {/* {profile.basicInfo.affiliation.phone.map((phone, index) => (
                        <div key={index}>{phone}</div>
                      ))} */}
                    </div>
                  </div>

                  <div className="flex items-start mb-2 mx-10 gap-2">
                    <FaFax className="text-gray-600 mt-1 mr-2" />
                    <div>{profile.creator.company.contact_fax ?? "N/A"}</div>
                  </div>
                  <hr className="my-4 mx-2" />

                  <div className="flex items-start mb-2 mx-10 gap-2">
                    <FaEnvelope className="text-gray-600 mt-1 mr-2" />
                    <div>{profile.creator.company.contact_email ?? "N/A"}</div>
                  </div>

                  {profile.creator.company.website ? (
                    <div className="flex items-start mb-2 mx-10 gap-2">
                      <FaGlobe className="text-gray-600 mt-1 mr-2" />
                      <a
                        href={profile.creator.company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline break-all"
                      >
                        {profile.creator.company.website}
                      </a>
                    </div>
                  ) : (
                    <div className="flex items-start mb-2 mx-10 gap-2">
                      <FaGlobe className="text-gray-600 mt-1 mr-2" />
                      N/A
                    </div>
                  )}
                </div>

                {/* 右カラム：個人 */}
                <div>
                  <h3 className="text-center mb-4 font-semibold">個人</h3>
                  <hr className="my-4 mx-2" />

                  <div className="flex items-start mb-2 mx-10 mt-20 gap-2">
                    <FaMapMarkerAlt className="text-gray-600 mt-1 mr-2" />
                    <div>
                      {profile.creator.addresses[0].postal_code ?? "N/A"}
                      <br />
                      {profile.creator.addresses?.[0]?.state ? (
                        <div>
                          {profile.creator.addresses[0].state}
                          {profile.creator.addresses[0].city}
                          {profile.creator.addresses[0].address_line}
                        </div>
                      ) : (
                        <div>N/A</div>
                      )}
                    </div>
                  </div>
                  <hr className="my-4 mx-2" />
                  <div className="flex items-start mb-2 mx-10 gap-2">
                    <FaPhone className="text-gray-600 mt-1 mr-2" />
                    <div>{profile.creator.personal_contact.home_phone ?? "N/A"}</div>
                  </div>

                  <div className="flex items-start mb-10 mx-10 gap-2">
                    <FaFax className="text-gray-600 mt-1 mr-2" />
                    <div>{profile.creator.personal_contact.fax_number ?? "N/A"}</div>
                  </div>
                  <hr className="my-4 mx-2" />

                  <div className="flex items-start mb-2 mx-10 gap-2">
                    <FaEnvelope className="text-gray-600 mt-1 mr-2" />
                    <div>{profile.creator.personal_contact.personal_email ?? "N/A"}</div>
                  </div>

                  <div className="flex items-start mb-2 mx-10 gap-2">
                    <FaGlobe className="text-gray-600 mt-1 mr-2" />
                    portfolio_siteでいいのか？
                    <a
                      href={profile.creator.portfolio_site}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline break-all"
                    >
                      {profile.creator.portfolio_site ?? "N/A"}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* cost セクション */}
          <div className="my-8 bg-white shadow rounded p-8 max-w-3xl mx-auto">
            <div className="flex items-center gap-8 ml-8">
              <div className="text-base font-bold">費用</div>
              <div className="border-l border-gray-300 h-6" />
              <div className="flex-1 flex items-center justify-center text-center mr-32">
                <span className="text-base">
                  DB更新まち
                  {/* 最小 {minCost} 万円　～　最大 {maxCost} 万円 */}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}




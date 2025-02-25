"use client"

import Image from "next/image"
import { useSession } from 'next-auth/react'

export default function Subber_c({ onSearch }) {
    const { data: session } = useSession();
  
    // タブのデータ配列
    const tabs = ["クリスマス", "花", "春", "女性", "海", "夜", "通勤", "日本", "空", "自然", "カフェ"];
  
    return (
      <div className="flex justify-center items-center space-x-4 bg-white p-4 shadow-md">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onSearch(tab)} // タブをクリックしたら検索を実行
            className="rounded-full border border-gray-300 px-4 py-1 text-sm font-semibold text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            {tab}
          </button>
        ))}
      </div>
    );
  }

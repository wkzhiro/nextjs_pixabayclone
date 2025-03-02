"use client"
// 必要なフックとコンポーネントをインポート
import { useState,useEffect } from 'react';
import Search from './components/Search_box';
import DisplayCards from './components/DisplayCards';
import Count from './components/Count';
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import UserCard from "./components/UserCard"
import Navbar from './components/Navbar';
import Middlebar from './components/Middlebar';
import { FaSearch } from 'react-icons/fa';

// メインのHomeコンポーネント
export default function Home() {
  const { data: session } = useSession({
    required: true,
    // sessionが必須であることを示す
    onUnauthenticated() {
        // redirect('/api/auth/signin?callbackUrl=/')
        console.log("signinしてください。")
    }
  })


  // フェッチしたデータを保存するためのステート
  const [fetchData, setFetchData] = useState([]);
  const [count, setCount] = useState(0);
  // 初期検索ワードを設定
  const initialKeyword = '';
  // コンポーネントがマウントされたときに一度だけ検索を実行
  useEffect(() => {
    handleSearch(initialKeyword);
  }, []);

  // 検索とデータのフェッチを処理する関数
  const handleSearch = async (keyword) => {
    // Pixabay APIのエンドポイントURL
    const endpointURL = `https://pixabay.com/api/?key=${process.env.NEXT_PUBLIC_PIXABAY_API_KEY}&q=${keyword}&image_type=photo`;

    // APIからデータをフェッチ
    const res = await fetch(endpointURL);
    // レスポンスをJSONにパース
    const data = await res.json();
    // 必要なデータを抽出
    const fetchData_raw = data.hits;

    // フェッチしたデータでステートを更新
    setFetchData(fetchData_raw);
    
    // カウントを増やす
    setCount((prev) => prev + 1)
  };

  // コンポーネントのレンダリング
  return (
    <>
      <Navbar />
      {session ? (
        <>
        <UserCard user={session?.user} pagetype={"Home"} />
        <div className="container mx-auto flex flex-col items-center">
          <div className="w-full md:w-3/4 lg:w-3/4 px-4"> {/* 中央揃えのためのラッパー要素 */}
            <div className="w-full  pb-20">
              <Search onSearch={handleSearch} count={count}/>
            </div>
          </div>
        </div>
        <Middlebar onSearch={handleSearch} />
        <DisplayCards images={fetchData} />
        </>
      ) : (
        <div className="container mx-auto flex justify-center items-center h-screen">
        <p className="text-xl font-bold">サインインして下さい</p>
      </div>
      )}
    </>)
}

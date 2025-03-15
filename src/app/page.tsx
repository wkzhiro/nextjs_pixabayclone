"use client"
// 必要なフックとコンポーネントをインポート
import { useState,useEffect } from 'react';
import Search from './components/Search_box';
import DisplayCards from './components/DisplayCards';
import Count from './components/Count';
import { useSession } from 'next-auth/react'
// import { redirect } from 'next/navigation'
import UserCard from "./components/UserCard"
import Navbar from './components/Navbar';
import Middlebar from './components/Middlebar';
import { FaSearch } from 'react-icons/fa';
import Footer from './components/Footer';

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

  // 初期データ用
  const [initialFetchData, setInitialFetchData] = useState([]);
  // 表示用のデータ（初期表示時は初期データと同じ）
  const [displayData, setDisplayData] = useState([]);
  // ローディング状態
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (session && displayData.length === 0) {
      handleSearch();
    }
  }, [session, displayData]);

  // データをフェッチする関数
  const handleSearch = async () => {
    setLoading(true); // fetch開始前にloadingをtrue
    try {
      const endpointURL = `${process.env.NEXT_PUBLIC_AZURE_BACK_ENDPOINT}/api/v1/creators/first`;
      const res = await fetch(endpointURL);
      const data = await res.json();
      console.log("data", data);
      setInitialFetchData(data);
      // setCount((prev) => prev + 1);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false); // fetch完了後にloadingをfalse
    }
  };


  useEffect(() => {
    if (initialFetchData.length > 0 && displayData.length === 0) {
      setDisplayData(initialFetchData);
    }
  }, [initialFetchData]);

  // ログインしていない場合のガード
  if (!session) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto flex justify-center items-center h-screen">
          <p className="text-xl font-bold">サインインして下さい</p>
        </div>
      </>
    );
  }

  // ローディング中ならスピナーを表示
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="mt-[247px] mb-[161px]">
          <Search onSearch={handleSearch} count={count} />
        </div>
        <div className="pb-[300px] bg-[#F2F6F9]">
          Loading...
        </div>
        <Footer />
      </>
    );
  }

  // ローディングが終わったら通常のUIを表示
  return (
    <>
      <Navbar />
      <div className="mt-[247px] mb-[161px]">
        <Search onSearch={handleSearch} count={count} />
      </div>
      <DisplayCards images={displayData} />
      <Footer />
    </>
  );

  // コンポーネントのレンダリング
  // return (
  //   <>
  //     <Navbar />
  //     {session ? (
  //       <>
  //         <div className="mt-[247px] mb-[161px]">
  //           <Search onSearch={handleSearch} count={count} />
  //         </div>
  //         {/* <Middlebar onSearch={handleSearch} /> */}
  //         <DisplayCards images={displayData} />
  //         <Footer />
  //         <div className="flex justify-center mb-8">
  //         {/* <button
  //           onClick={handleSearch}
  //           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
  //         >
  //           データを取得
  //         </button> */}
  //       </div>
  //       </>
  //     ) : (
  //       <div className="container mx-auto flex justify-center items-center h-screen">
  //         <p className="text-xl font-bold">サインインして下さい</p>
  //       </div>
  //       )
  //     }
  //   </>
  //   )
}

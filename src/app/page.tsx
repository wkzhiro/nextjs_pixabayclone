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

const test_query = {
  "oid": "sample-org-002",
  "keyword": "",
  "occupations": ["プロデューサー"],
  "avg_min": null,
  "avg_max": null
}

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


  const querySearch = async (keyword: string, tags: { jobs: string[], media: string[], costs: number[] }) => {
    try {
      const endpointURL = "api/get_information_by_query"; // エンドポイント指定
      const bodyData = {
        oid: "dummy_oid", // 固定値または環境変数などで設定
        keyword: keyword || "", // キーワードが空の場合は空文字を
        occupations: tags.jobs && tags.jobs.length > 0 ? tags.jobs : [],
        avg_min:
          tags.costs && tags.costs.length > 0
            ? Math.min(...tags.costs)
            : null,
        avg_max:
          tags.costs && tags.costs.length > 0
            ? Math.max(...tags.costs)
            : null,
      };

      const res = await fetch(endpointURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bodyData) // キーワードのみを送信
      });
      const data = await res.json();
      // mapを使って配列を変換（例：creator_name を name に変換など）
      const newArray = data.results.map((item: any, index: number) => {
        return {
          creator_id: item.creator_id,
          creator_name: item.creator_name,
          file_name: item.file_name,
          latest_product_number: item.latest_product_number,
          latest_product_title: item.latest_product_title,
          latest_product_image_path: item.latest_product_image_path,
          latest_inquiry_email: item.latest_inquiry_email,
          latest_inquiry_phone: item.latest_inquiry_phone,
          occupations: item.occupations,
          company_name: item.company_name
        };
      });
      console.log("Transformed array:", newArray);

      // 必要に応じて displayData を更新するなどの処理
      setDisplayData(newArray);
    } catch (error) {
      console.error("Query search error:", error);
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
          <Search onSearch={querySearch}/>
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
        <Search onSearch={querySearch}/>
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

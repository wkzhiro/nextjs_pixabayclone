import { useRef } from 'react'; // reactからuseRefをインポート
import { FaSearch } from 'react-icons/fa'; // react-iconsからFaSearchをインポート
import Middlebar from './Middlebar';

export default function Search({ onSearch, count}) { // Search関数をエクスポート
  const inputRef = useRef<HTMLInputElement>(null); // useRefを使用してinputRefを定義

  const handleSubmit = (event) => { // handleSubmit関数を定義
    event.preventDefault(); // デフォルトのイベントを防止
    onSearch(inputRef.current.value); // onSearch関数を呼び出し、inputRefの現在の値を渡す
  };
  const handleSearch = async (keyword) => {
    // Pixabay APIのエンドポイントURL
    const endpointURL = `https://pixabay.com/api/?key=${process.env.NEXT_PUBLIC_PIXABAY_API_KEY}&q=${keyword}&image_type=photo`;
    const res = await fetch(endpointURL);
    // レスポンスをJSONにパース
    const data = await res.json();
    // 必要なデータを抽出
    const fetchData_raw = data.hits;
  };



  console.log(count)
  return (
<<<<<<< HEAD
    <form onSubmit={handleSubmit} className="mb-8 w-full mx-auto flex items-center bg-white rounded-full shadow-lg"> 
    <button
      type="submit"
      className="bg-white p-2 rounded-full focus:outline-none transition-colors flex items-center justify-center">
      <FaSearch className="text-gray-600 ml-6"/>
    </button>
    <input
      ref={inputRef}
      type="text"
      name="keyword"
      className="flex-grow rounded-r-full pl-4 py-4 text-gray-800 focus:outline-none"
    />
    </form>
=======
    <div className="container mx-auto flex flex-col items-center">
      {/* 中央揃えのためのラッパー要素 */}
      <div className="w-full md:w-3/4 lg:w-3/4 px-4"> 
        <form onSubmit={handleSubmit} className="w-full mx-auto flex items-center bg-white rounded-full shadow-lg"> 
          <button
            type="submit"
            className="bg-white p-2 rounded-full focus:outline-none transition-colors flex items-center justify-center">
            <FaSearch className="text-gray-600 ml-6"/>
          </button>
          <input
            ref={inputRef}
            type="text"
            name="keyword"
            placeholder='例:飲料系 監督'
            className="flex-grow rounded-r-full pl-4 py-4 text-gray-800 focus:outline-none"
          />
        </form>
      </div>
      <div className='mt-[36px]'>
        <Middlebar onSearch={handleSearch}/>
      </div>
    </div>
>>>>>>> bac19ba0e4e1acdb4877cbd0ab7592ec286c2d2d
  );
}

import { useRef } from 'react'; // reactからuseRefをインポート
import { FaSearch } from 'react-icons/fa'; // react-iconsからFaSearchをインポート


export default function Search({ onSearch, count}) { // Search関数をエクスポート
  const inputRef = useRef<HTMLInputElement>(null); // useRefを使用してinputRefを定義

  const handleSubmit = (event) => { // handleSubmit関数を定義
    event.preventDefault(); // デフォルトのイベントを防止
    onSearch(inputRef.current.value); // onSearch関数を呼び出し、inputRefの現在の値を渡す
  };
  console.log(count)
  return (
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
      placeholder='Pixabaycloneの全画像を検索'
      className="flex-grow rounded-r-full pl-4 py-4 text-gray-800 focus:outline-none"
    />
    </form>
  );
}

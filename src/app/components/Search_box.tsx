import { useState, useRef } from 'react'; // reactからuseRefをインポート
import { FaSearch } from 'react-icons/fa'; // react-iconsからFaSearchをインポート
import Middlebar from './Middlebar';

interface SearchProps {
  onSearch: (keyword: string, tags: { jobs: string[], media: string[], costs: number[] }) => void;
}

export default function Search({ onSearch}: SearchProps) { // Search関数をエクスポート
  const inputRef = useRef<HTMLInputElement>(null); // useRefを使用してinputRefを定義

  const [middlebarTags, setMiddlebarTags] = useState<{
    jobs: string[]
    media: string[]
    costs: number[]
  }>({ jobs: [], media: [], costs: [] })

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const keyword = inputRef.current?.value || "";
    // Middlebar のタグ情報と合わせて上位 onSearch に渡す
    onSearch(keyword, middlebarTags);
  };

  const handleTagsChange = (tags: { jobs: string[], media: string[], costs: number[] }) => {
    setMiddlebarTags(tags);
  };

  return (
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
      {/* 2. Middlebarを配置する部分 */}
      <div className="w-full md:w-3/4 lg:w-3/4 px-4 mt-[45px]">
        <Middlebar onTagsChange={handleTagsChange} />
      </div>
    </div>
  );
}

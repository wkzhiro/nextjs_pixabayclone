// ImageGalleryコンポーネントをインポート
import ImageGallery from '../utils/imageGallery';

// DisplayImagesコンポーネントを定義
export default function DisplayImages({ images }) {
  return (
    // 画像を表示するためのグリッドレイアウトを作成
    <div className="grid-cols-3 gap-4 p-8 bg-white">
      <div></div>
      {/* ImageGalleryコンポーネントを使用して画像を表示 */}
      <div className="grid gap-4">
        <ImageGallery images={images} />
      </div>
      <div></div>
    </div>
  );
}
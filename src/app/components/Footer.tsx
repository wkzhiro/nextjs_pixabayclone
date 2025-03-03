import Image from "next/image"

const Footer = () => {
  return (
    <footer className="flex items-end justify-between pl-[168px] pr-[198px] pt-[24px] pb-[24px]">
      {/* 左側ロゴ */}
      <div className="flex items-end space-x-2">
        <Image
          src="https://geekpictures.co.jp/jp/wp-content/themes/geek/img/logo_head.svg"
          alt="Geekpictures Logo"
          width={245}
          height={40}
        />
      </div>
      {/* 右側：著作権表示 */}
      <div className="text-[12px]">
        Copyright © GEEK PICTURES Inc. All Rights Reserved.
      </div>
    </footer>
  )
}

export default Footer

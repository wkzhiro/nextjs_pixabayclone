// DisplayImages.tsx
import { BusinessCard } from "./businesscard/BusinessCard";
import { dummyData } from "@/data/dummyData"; // エイリアス設定に合わせてパスを調整

export default function DisplayCards({ images }) {
  
  const datalist = dummyData
  console.log("datalist", datalist)

  return (
    <div className="grid grid-cols-3 gap-4 p-8 bg-[#F2F6F9]">
      {datalist.map((data, index) => (
        <BusinessCard
          key={index}
          uuid={data.uuid}
          image={data.image}
          personInfo={data.personInfo}
          tags={data.tags}
          date={data.date}
          fileType={data.fileType}
          title={data.title}
          work={data.work}
        />
      ))}
    </div>
  );
}

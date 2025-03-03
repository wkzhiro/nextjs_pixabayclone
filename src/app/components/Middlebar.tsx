"use client"
import { useState, useEffect, useRef } from "react"
import { useSession } from "next-auth/react"
import { FaTrash, FaCheck } from "react-icons/fa"
import { dummyData } from "@/data/dummyData"

// --- ユニーク値を抽出 ---
function getUniqueJobs(data: any[]): string[] {
  const allTags = data.flatMap((item: any) => item.tags || [])
  return Array.from(new Set(allTags)) as string[]
}
function getUniqueMedia(data: any[]): string[] {
  const allMedia = data.map((item: any) => item.fileType).filter(Boolean) as string[]
  return Array.from(new Set(allMedia))
}
function getUniqueCosts(data: any[]): number[] {
  const allCosts = data.flatMap((item: any) =>
    item.relatedWorks?.map((rw: any) => rw.cost) || []
  )
  return Array.from(new Set(allCosts)).sort((a, b) => a - b)
}


export default function Middlebar({ onSearch }) {
  const { data: session } = useSession()

  const jobList = getUniqueJobs(dummyData)
  const mediaList = getUniqueMedia(dummyData)
  const costList = getUniqueCosts(dummyData)

  const [selectedJobs, setSelectedJobs] = useState<string[]>([])
  const [selectedMedia, setSelectedMedia] = useState<string[]>([])
  const [selectedCosts, setSelectedCosts] = useState<number[]>([])

  // どのタブを開いているか
  const [openTab, setOpenTab] = useState<"job" | "media" | "cost" | null>(null)

  // --- ポップアップそれぞれに ref を用意 ---
  const jobPopupRef = useRef<HTMLDivElement>(null)
  const mediaPopupRef = useRef<HTMLDivElement>(null)
  const costPopupRef = useRef<HTMLDivElement>(null)

  // クリック時にポップアップの外側だったら閉じる
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      // 何もタブが開いていなければ何もしない
      if (!openTab) return

      // 開いているタブごとに判定
      if (openTab === "job") {
        // jobPopupRef の外なら閉じる
        if (
          jobPopupRef.current &&
          !jobPopupRef.current.contains(e.target as Node)
        ) {
          setOpenTab(null)
        }
      }
      if (openTab === "media") {
        if (
          mediaPopupRef.current &&
          !mediaPopupRef.current.contains(e.target as Node)
        ) {
          setOpenTab(null)
        }
      }
      if (openTab === "cost") {
        if (
          costPopupRef.current &&
          !costPopupRef.current.contains(e.target as Node)
        ) {
          setOpenTab(null)
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [openTab])

  // --- チェックボックスのオンオフ ---
  function toggleSelect<T>(value: T, selectedArray: T[], setSelectedArray: (val: T[]) => void) {
    if (selectedArray.includes(value)) {
      setSelectedArray(selectedArray.filter(item => item !== value))
    } else {
      setSelectedArray([...selectedArray, value])
    }
  }

  const handleClearAll = () => {
    setSelectedJobs([])
    setSelectedMedia([])
    setSelectedCosts([])
    setOpenTab(null)
  }

  // --- タブのアクティブ判定 ---
  function isTabActive(tab: "job" | "media" | "cost") {
    if (tab === "job")    return openTab === "job" || selectedJobs.length > 0
    if (tab === "media")  return openTab === "media" || selectedMedia.length > 0
    if (tab === "cost")   return openTab === "cost" || selectedCosts.length > 0
    return false
  }

  function getTabClass(tab: "job" | "media" | "cost") {
    const active = isTabActive(tab)
    const base = "flex items-center px-3 py-1 rounded-full focus:outline-none transition-colors"
    return active
      ? `${base} bg-gray-200 text-gray-800`
      : `${base} text-gray-600 hover:text-gray-800`
  }

  return (
    <div className="relative w-full">
      {/* 上部: タブ3つ + すべてクリア */}
      <div className="flex justify-between items-start">
        <div className="flex space-x-8 items-start">
          {/* 職種タブ */}
          <div className="flex-none w-[80px]">
            <button
              onClick={() => setOpenTab(openTab === "job" ? null : "job")}
              className={getTabClass("job")}
            >
              <span className="mr-1">職種</span>
              <span className="text-xs">▼</span>
            </button>
            {/* 選択済み */}
            {selectedJobs.length > 0 && (
              <div className="mt-2 flex flex-col space-y-1 text-sm break-words">
                {selectedJobs.map(job => (
                  <span key={job} className="text-blue-600">{job}</span>
                ))}
              </div>
            )}
          </div>

          {/* 媒体タブ */}
          <div className="flex-none w-[80px]">
            <button
              onClick={() => setOpenTab(openTab === "media" ? null : "media")}
              className={getTabClass("media")}
            >
              <span className="mr-1">媒体</span>
              <span className="text-xs">▼</span>
            </button>
            {selectedMedia.length > 0 && (
              <div className="mt-2 flex flex-col space-y-1 text-sm break-words">
                {selectedMedia.map(media => (
                  <span key={media} className="text-blue-600">{media}</span>
                ))}
              </div>
            )}
          </div>

          {/* 金額タブ */}
          <div className="flex-none w-[80px]">
            <button
              onClick={() => setOpenTab(openTab === "cost" ? null : "cost")}
              className={getTabClass("cost")}
            >
              <span className="mr-1">金額</span>
              <span className="text-xs">▼</span>
            </button>
            {selectedCosts.length > 0 && (
              <div className="mt-2 flex flex-col space-y-1 text-sm break-words">
                {selectedCosts.map(cost => (
                  <span key={cost} className="text-blue-600">
                    {cost}万円
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 右側: すべてクリア */}
        <button
          onClick={handleClearAll}
          className="flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <FaTrash className="mr-1" />
          <span>すべてクリア</span>
        </button>
      </div>

      {/* --- ポップアップ: job --- */}
      {openTab === "job" && (
        <div
          ref={jobPopupRef} // ここでrefを付与
          className="absolute left-0 mt-2 w-3/4 bg-white p-4 shadow-lg rounded-xl z-10"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-2">
            {jobList.map(job => {
              const isSelected = selectedJobs.includes(job)
              return (
                <label key={job} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={isSelected}
                    onChange={() => toggleSelect(job, selectedJobs, setSelectedJobs)}
                  />
                  {isSelected ? (
                    <FaCheck className="text-blue-600" />
                  ) : (
                    <span className="w-4" />
                  )}
                  <span className={isSelected ? "text-blue-600" : "text-gray-800"}>
                    {job}
                  </span>
                </label>
              )
            })}
          </div>
        </div>
      )}

      {/* --- ポップアップ: media --- */}
      {openTab === "media" && (
        <div
          ref={mediaPopupRef}
          className="absolute left-0 mt-2 w-3/4 bg-white p-4 shadow-lg rounded-xl z-10"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-2">
            {mediaList.map(media => {
              const isSelected = selectedMedia.includes(media)
              return (
                <label key={media} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={isSelected}
                    onChange={() => toggleSelect(media, selectedMedia, setSelectedMedia)}
                  />
                  {isSelected ? (
                    <FaCheck className="text-blue-600" />
                  ) : (
                    <span className="w-4" />
                  )}
                  <span className={isSelected ? "text-blue-600" : "text-gray-800"}>
                    {media}
                  </span>
                </label>
              )
            })}
          </div>
        </div>
      )}

      {/* --- ポップアップ: cost --- */}
      {openTab === "cost" && (
        <div
          ref={costPopupRef}
          className="absolute left-0 mt-2 w-3/4 bg-white p-4 shadow-lg rounded-xl z-10"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-2">
            {costList.map(cost => {
              const isSelected = selectedCosts.includes(cost)
              return (
                <label key={cost} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={isSelected}
                    onChange={() => toggleSelect(cost, selectedCosts, setSelectedCosts)}
                  />
                  {isSelected ? (
                    <FaCheck className="text-blue-600" />
                  ) : (
                    <span className="w-4" />
                  )}
                  <span className={isSelected ? "text-blue-600" : "text-gray-800"}>
                    {cost}万円
                  </span>
                </label>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

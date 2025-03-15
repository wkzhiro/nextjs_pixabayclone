import { NextResponse } from "next/server";

// POST メソッドの処理を追加
export async function POST(request: Request) {
  // 環境変数の呼び出し
  const apiUrl = `${process.env.NEXT_PUBLIC_AZURE_BACK_ENDPOINT}/search` || "";
  console.log("apiURL",apiUrl)

  try {
    // リクエストボディをパース
    const requestBody = await request.json();
    console.log("受け取ったデータ:", requestBody);

    // APIへリクエスト
    const response = await fetch(
      apiUrl,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const results = await response.json();
    // console.log("Serch_queryで取得したデータ:", results);
    // JSONで結果を返す
    return NextResponse.json(results);

    // // レスポンス確認用
    // return NextResponse.json({
    //   message: "リクエストを受信しました",
    //   receivedData: requestBody,
    // });

  } catch (error) {
    console.error("POST リクエストの処理中にエラーが発生しました:", error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : "予期しないエラーが発生しました";

    return NextResponse.json(
      { message: "リクエスト処理中にエラーが発生しました", error: errorMessage },
      { status: 500 }
    );
  }
}

// {
//   "oid": "sample-org-002",
//   "keyword": "映像制作",
//   "occupations": ["カメラマン", "ディレクター"],
//   "avg_min": 100,
//   "avg_max": 300
// }
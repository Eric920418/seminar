import { NextResponse } from "next/server";

const query = `
  query favicon {
    logo {
      section1
    }
  }
`;

export async function GET() {
  try {
    // 取得完整的API URL
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL ||
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000");

    // 使用完整URL調用GraphQL API
    const res = await fetch(`${apiUrl}/api/graphql`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status}`);
    }

    const { data } = await res.json();
    const favicon = data?.logo[0]?.section1?.favicon || null;

    return NextResponse.json({ favicon });
  } catch (error) {
    console.error("Error fetching favicon:", error);
    return NextResponse.json({ favicon: null }, { status: 500 });
  }
}

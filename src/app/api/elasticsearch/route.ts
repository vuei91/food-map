// pages/api/elasticsearch.ts
import { NextRequest, NextResponse } from "next/server";
import { createIndex, initClient, insertData, searchData } from "./initClient";
import { supabase } from "@/app/supabase/client";
import { insertSupabaseData } from "./insertSupabaseData";
import { NextApiRequest } from "next";

const client = initClient();

export async function GET(req: NextRequest, res: NextResponse) {
  const keyword = req.nextUrl.searchParams.get("keyword") || "";
  console.log(keyword);
  const doc = await searchData({ client, keyword });
  return NextResponse.json(doc);
}
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    // 전체 데이터를 es에 인서트하는 함수
    await insertSupabaseData({ client });
    // await insertData({ client, document: req.body });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    await createIndex({ client });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}

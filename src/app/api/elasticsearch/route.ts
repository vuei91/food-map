// pages/api/elasticsearch.ts
import { NextRequest, NextResponse } from "next/server";
import { createIndex, initClient, insertData, searchData } from "./initClient";
import { supabase } from "@/app/supabase/client";
import { insertSupabaseData } from "./insertSupabaseData";
import { NextApiRequest } from "next";

const client = initClient();

export async function GET(req: NextRequest, res: NextResponse) {
  const searchParams = req.nextUrl.searchParams;
  const keyword = searchParams.get("keyword") || "";
  const page = searchParams.get("page") || "1";
  let doc = [];
  if (keyword && keyword !== "") {
    doc = await searchData({
      client,
      keyword,
      offset: page ? (Number(page) - 1) * 5 : 0,
    });
  } else {
    const { data, error } = await supabase.rpc("get_restaurants", {
      latitude_val: process.env.NEXT_PUBLIC_LATITUDE,
      longitude_val: process.env.NEXT_PUBLIC_LONGITUDE,
      offset_val: page ? (Number(page) - 1) * 5 : 0,
      limit_val: 5,
    });
    if (error) {
      doc = [];
    } else {
      doc = data;
    }
  }
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

export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    await client.indices.delete({
      index: process.env.NEXT_PUBLIC_ELASTICSEARCH_INDEX!,
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  return NextResponse.json("read");
}
export async function POST(request: NextRequest) {
  return NextResponse.json("create");
}
export async function PUT(request: NextRequest) {
  return NextResponse.json("update");
}

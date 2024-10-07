import { NextRequest, NextResponse } from "next/server";
import { JSONFilePreset } from "lowdb/node";
import { VideoDetails } from "../types/entities";

export async function GET(request: NextRequest) {
  try {
    getCoordinates("전남 담양군 봉산면 면앙정로 155");
    const db = await JSONFilePreset("total.json", []);
    const data: Array<Partial<VideoDetails>> = db.data;
    // console.log(db.get("data"));
    for (const item of data) {
      if (item.restaurants) {
        for (const restaurant of item.restaurants) {
          //   console.log(restaurant);
        }
      }
    }
    return NextResponse.json(
      { prob: false, data: "HELLOWORLD" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ prob: true, message: error }, { status: 500 });
  }
}

const getCoordinates = async (address: string) => {
  const geocodeUrl = `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${encodeURIComponent(
    address
  )}`;
  const response = await fetch(geocodeUrl, {
    headers: {
      "X-NCP-APIGW-API-KEY-ID": process.env.NAVER_CLIENT_ID || "",
      "X-NCP-APIGW-API-KEY": process.env.NAVER_CLIENT_SECRET || "",
    },
  });
  const data = await response.json();
  if (data.status === "OK") {
    const location = data.addresses[0];
    console.log(`위도: ${location.y}, 경도: ${location.x}`);
  } else {
    console.error("Geocoding failed:", data.status);
  }
};

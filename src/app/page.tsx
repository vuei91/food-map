"use client";
import React, { useEffect, useRef } from "react";

const Hello = () => {
  const mapElement = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (typeof window !== "undefined" && window.naver && mapElement.current) {
      const mapOptions = {
        center: new window.naver.maps.LatLng(37.5665, 126.978), // 서울 중심 좌표
        zoom: 10, // 줌 레벨
      };

      // 지도 생성 및 렌더링
      const map = new window.naver.maps.Map(mapElement.current, mapOptions);

      // 마커 추가 예시
      new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(37.5665, 126.978),
        map: map,
      });
    }
  }, []);
  return <div ref={mapElement} className="w-full h-screen"></div>;
};

export default Hello;

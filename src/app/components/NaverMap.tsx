"use client";
import React, { useEffect, useRef } from "react";

const NaverMap = ({ width, height }: { width: number; height: number }) => {
  const mapElement = useRef<HTMLDivElement>(null);
  const init = () => {
    if (typeof window !== "undefined" && window.naver && mapElement.current) {
      const mapOptions = {
        center: new window.naver.maps.LatLng(37.5665, 126.978), // 서울 중심 좌표
        zoom: 15, // 줌 레벨
      };

      // 지도 생성 및 렌더링
      const map = new window.naver.maps.Map(mapElement.current, mapOptions);

      // 마커 추가 예시
      new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(37.5665, 126.978),
        map: map,
      });
    }
  };
  useEffect(() => {
    init();
  }, []);
  return <div ref={mapElement} style={{ width, height }}></div>;
};

export default NaverMap;

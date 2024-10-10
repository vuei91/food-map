"use client";
import React, { useEffect, useRef, useState } from "react";
import { Restaurant, RestaurantExtend, YoutubeInfo } from "../types/entities";

const NaverMap = ({ restaurants }: { restaurants: RestaurantExtend[] }) => {
  const mapElement = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState();
  const init = () => {
    if (window?.naver && mapElement.current) {
      const mapOptions = {
        center: new window.naver.maps.LatLng(37.5665, 126.978), // 서울 중심 좌표
        zoom: 15, // 줌 레벨
      };

      // 지도 생성 및 렌더링
      const map = new window.naver.maps.Map(mapElement.current, mapOptions);
      for (const restaurant of restaurants) {
        makeMarker(
          { lat: restaurant.latitude, lng: restaurant.longitude },
          map
        );
      }
      setMap(map);
    }
  };
  const makeMarker = (
    { lat, lng }: { lat: string; lng: string },
    _map?: any // map을 다이렉트로 넣어줄수 있도록 처리
  ) => {
    if (!_map) _map = map;
    // 마커 추가 예시
    new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(lat, lng),
      map: _map,
    });
  };

  useEffect(() => {
    init();
  }, []);
  return <div ref={mapElement} className="w-full h-screen"></div>;
};

export default NaverMap;

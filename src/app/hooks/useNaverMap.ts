import { useEffect, useRef, useState } from "react";
import { RestaurantExtend } from "../types/entities";
import { getContent } from "../utils/map";

interface LatLng {
  lat: string;
  lng: string;
}

export const useNaverMap = (restaurants: RestaurantExtend[]) => {
  const mapElement = useRef<HTMLDivElement>(null);

  const init = () => {
    if (window?.naver && mapElement.current) {
      const mapOptions = {
        center: new window.naver.maps.LatLng(
          restaurants[0]?.latitude || process.env.NEXT_PUBLIC_LATITUDE,
          restaurants[0]?.longitude || process.env.NEXT_PUBLIC_LONGITUDE
        ),
        zoom: 15,
      };

      const newMap = new window.naver.maps.Map(mapElement.current, mapOptions);
      window.naver.newMap = newMap;
      const markers: any[] = [];
      restaurants.forEach((restaurant, index) => {
        const marker = makeMarker(
          { lat: restaurant.latitude, lng: restaurant.longitude },
          newMap
        );
        makeInfoWindow({
          title: restaurant.name,
          marker,
          targetMap: newMap,
          index,
        });
        markers.push({ id: restaurant.id, marker });
      });
      window.naver.newMap = newMap;
      window.naver.markers = markers;
    }
  };

  const makeMarker = ({ lat, lng }: LatLng, targetMap?: any) => {
    return new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(lat, lng),
      map: targetMap,
    });
  };

  const makeInfoWindow = ({
    title,
    marker,
    targetMap,
    index,
  }: {
    title: string;
    marker: any;
    targetMap: any;
    index: number;
  }) => {
    const infoWindow = new window.naver.maps.InfoWindow({
      content: getContent({ title }),
    });
    new window.naver.maps.Event.addListener(marker, "click", () => {
      if (infoWindow.getMap()) {
        infoWindow.close();
      } else {
        infoWindow.open(targetMap, marker);
      }
    });
    if (index === 0) {
      infoWindow.open(targetMap, marker);
    }
  };

  useEffect(() => {
    if (restaurants.length > 0) {
      init();
    }
  }, [restaurants]);

  return { mapElement };
};

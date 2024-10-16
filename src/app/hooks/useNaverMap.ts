import { useEffect, useRef, useState } from "react";
import { RestaurantExtend } from "../types/entities";

interface LatLng {
  lat: string;
  lng: string;
}

export const useNaverMap = (restaurants: RestaurantExtend[]) => {
  const mapElement = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);

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
      restaurants.forEach((restaurant) => {
        makeMarker(
          { lat: restaurant.latitude, lng: restaurant.longitude },
          newMap
        );
      });
      setMap(newMap);
    }
  };

  const makeMarker = ({ lat, lng }: LatLng, targetMap?: any) => {
    if (!targetMap) targetMap = map;
    new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(lat, lng),
      map: targetMap,
    });
  };

  useEffect(() => {
    if (restaurants.length > 0) {
      init();
    }
  }, [restaurants]);

  return { mapElement };
};

export interface Thumbnail {
  default: string;
  medium: string;
  high: string;
  standard: string;
  maxres: string;
}

export interface Restaurant {
  category: string | null;
  name: string;
  timestamp: string;
  address: string;
  naver_link: string;
  google_map_link: string | null;
  latitude: string;
  longitude: string;
  distance: string;
  created_at: string;
}

export interface YoutubeInfo {
  video_id: string;
  title: string;
  description: string;
  tags: string;
  shorts: boolean;
  restaurants: Restaurant[];
}

export interface RestaurantExtend extends Restaurant, Thumbnail, YoutubeInfo {
  total_count: number;
  id: number;
}

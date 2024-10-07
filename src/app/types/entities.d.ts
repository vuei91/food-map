export interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

export interface Thumbnails {
  default: Thumbnail;
  medium: Thumbnail;
  high: Thumbnail;
  standard: Thumbnail;
  maxres: Thumbnail;
}

export interface Restaurant {
  category: string | null;
  name: string;
  timestamp: string;
  address: string;
  naver_link: string;
  google_map_link: string | null;
}

export interface VideoDetails {
  video_id: string;
  title: string;
  thumbnails: Thumbnails;
  description: string;
  tags: string[];
  shorts: boolean;
  restaurants: Restaurant[];
}

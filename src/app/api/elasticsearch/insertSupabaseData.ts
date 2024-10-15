import { supabase } from "@/app/supabase/client";
import { insertData } from "./initClient";
import { Client } from "@elastic/elasticsearch";

export const insertSupabaseData = async ({ client }: { client: Client }) => {
  const { data: restaurants, error } = await supabase.rpc("get_restaurants", {
    latitude_val: process.env.NEXT_PUBLIC_LATITUDE,
    longitude_val: process.env.NEXT_PUBLIC_LONGITUDE,
    offset_val: 0,
    limit_val: 1000,
  });
  if (error) throw error;
  for (const restaurant of restaurants) {
    await insertData({
      client,
      document: restaurant,
    });
  }
};

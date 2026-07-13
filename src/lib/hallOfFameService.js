import { supabase } from "./supabase";

export async function getHallOfFame() {
  const { data, error } = await supabase
    .from("hall_of_fame")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

export async function addHallPlayer(player) {
  const { error } = await supabase
    .from("hall_of_fame")
    .insert([player]);

  if (error) throw error;
}

export async function deleteHallPlayer(id) {
  const { error } = await supabase
    .from("hall_of_fame")
    .delete()
    .eq("id", id);

  if (error) throw error;
}
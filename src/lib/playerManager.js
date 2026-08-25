import players from "../data/players.json";

export function getPlayers() {
  return players;
}

export function getPlayer(ign) {
  return players.find(
    (p) => p.ign.toLowerCase() === ign.toLowerCase()
  );
}
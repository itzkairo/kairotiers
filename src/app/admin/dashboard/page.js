"use client";

import { useEffect, useState } from "react";

import {
  getHallOfFame,
  addHallPlayer,
  deleteHallPlayer,
} from "../../../lib/hallOfFameService";

export default function AdminPanel() {
  const [players, setPlayers] = useState([]);

  const [ign, setIgn] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  async function loadPlayers() {
    const data = await getHallOfFame();
    setPlayers(data);
  }

  useEffect(() => {
    loadPlayers();
  }, []);

  async function handleAdd() {
    if (!ign || !title) return;

    await addHallPlayer({
      ign,
      title,
      description,
      image,
    });

    setIgn("");
    setTitle("");
    setDescription("");
    setImage("");

    loadPlayers();
  }

  async function handleDelete(id) {
    if (!confirm("Delete this player?")) return;

    await deleteHallPlayer(id);
    loadPlayers();
  }

  return (
    <main className="min-h-screen bg-[#0B0B0B] text-white p-10">

      <h1 className="text-5xl font-black mb-10">
        <span className="text-red-600">Admin</span> Panel
      </h1>

      <div className="bg-[#151515] border border-red-700 rounded-2xl p-8">

        <h2 className="text-2xl font-bold mb-6">
          Hall Of Fame
        </h2>

        <div className="grid gap-4">

          <input
            value={ign}
            onChange={(e) => setIgn(e.target.value)}
            placeholder="Minecraft IGN"
            className="bg-[#101010] p-4 rounded-xl"
          />

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="bg-[#101010] p-4 rounded-xl"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="bg-[#101010] p-4 rounded-xl"
          />

          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Image URL (optional)"
            className="bg-[#101010] p-4 rounded-xl"
          />

          <button
            onClick={handleAdd}
            className="bg-red-600 hover:bg-red-700 rounded-xl py-4 font-bold"
          >
            + Add Player
          </button>

        </div>

        <div className="mt-10 space-y-4"></div>
        {players.length === 0 ? (

          <p className="text-gray-500 text-center py-8">
            No Hall Of Fame Players
          </p>

        ) : (

          players.map((player) => (

            <div
              key={player.id}
              className="flex items-center justify-between bg-[#101010] border border-[#2A2A2A] rounded-xl p-4"
            >

              <div className="flex items-center gap-4">

                <img
                  src={
                    player.image ||
                    `https://mc-heads.net/avatar/${player.ign}/64`
                  }
                  alt={player.ign}
                  className="w-14 h-14 rounded-lg"
                />

                <div>

                  <h3 className="text-xl font-bold">
                    {player.ign}
                  </h3>

                  <p className="text-red-500">
                    {player.title}
                  </p>

                  <p className="text-gray-400 text-sm">
                    {player.description}
                  </p>

                </div>

              </div>

              <button
                onClick={() => handleDelete(player.id)}
                className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg font-bold transition"
              >
                Delete
              </button>

            </div>

          ))

        )}

      </div>
    </main >
  );
}
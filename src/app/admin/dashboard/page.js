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

  const [loading, setLoading] = useState(false);

  async function loadPlayers() {
    try {
      const data = await getHallOfFame();
      setPlayers(data || []);
    } catch (error) {
      console.error("Failed to load Hall Of Fame:", error);
    }
  }

  useEffect(() => {
    loadPlayers();
  }, []);

  async function handleAdd() {
    if (!ign.trim() || !title.trim()) {
      alert("Minecraft IGN and Title are required.");
      return;
    }

    try {
      setLoading(true);

      await addHallPlayer({
        ign: ign.trim(),
        title: title.trim(),
        description: description.trim(),
        image: image.trim(),
      });

      setIgn("");
      setTitle("");
      setDescription("");
      setImage("");

      await loadPlayers();
    } catch (error) {
      console.error("Failed to add Hall Of Fame player:", error);
      alert("Failed to add player.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this player?")) {
      return;
    }

    try {
      await deleteHallPlayer(id);
      await loadPlayers();
    } catch (error) {
      console.error("Failed to delete Hall Of Fame player:", error);
      alert("Failed to delete player.");
    }
  }

  return (
    <main className="min-h-screen bg-[#0B0B0B] text-white p-4 sm:p-8 md:p-10">

      <div className="max-w-[1100px] mx-auto">

        <h1 className="text-4xl sm:text-5xl font-black mb-8">
          <span className="text-red-600">Admin</span>{" "}
          <span className="text-white">Panel</span>
        </h1>

        <div className="bg-[#151515] border border-[#2d1719] rounded-2xl p-5 sm:p-8">

          <h2 className="text-2xl font-bold mb-6">
            Hall Of Fame
          </h2>

          {/* ADD PLAYER */}

          <div className="grid gap-4">

            <input
              value={ign}
              onChange={(e) => setIgn(e.target.value)}
              placeholder="Minecraft IGN"
              className="
                w-full
                bg-[#101010]
                border border-[#303030]
                focus:border-red-600
                outline-none
                p-4
                rounded-xl
                text-white
                transition
              "
            />

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="
                w-full
                bg-[#101010]
                border border-[#303030]
                focus:border-red-600
                outline-none
                p-4
                rounded-xl
                text-white
                transition
              "
            />

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              rows={4}
              className="
                w-full
                bg-[#101010]
                border border-[#303030]
                focus:border-red-600
                outline-none
                p-4
                rounded-xl
                text-white
                resize-none
                transition
              "
            />

            <input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Image URL (optional)"
              className="
                w-full
                bg-[#101010]
                border border-[#303030]
                focus:border-red-600
                outline-none
                p-4
                rounded-xl
                text-white
                transition
              "
            />

            <button
              onClick={handleAdd}
              disabled={loading}
              className="
                bg-red-600
                hover:bg-red-700
                disabled:opacity-50
                disabled:cursor-not-allowed
                rounded-xl
                py-4
                font-bold
                transition
              "
            >
              {loading ? "Adding..." : "+ Add Player"}
            </button>

          </div>


          {/* PLAYERS */}

          <div className="mt-10 space-y-4">

            {players.length === 0 ? (

              <div className="
                text-center
                py-12
                rounded-xl
                border
                border-dashed
                border-[#333]
                bg-[#101010]
              ">
                <p className="text-gray-500">
                  No Hall Of Fame Players
                </p>
              </div>

            ) : (

              players.map((player) => (

                <div
                  key={player.id}
                  className="
                    flex
                    flex-col
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                    gap-4
                    bg-[#101010]
                    border
                    border-[#2A2A2A]
                    hover:border-[#4a2022]
                    rounded-xl
                    p-4
                    transition
                  "
                >

                  <div className="flex items-center gap-4 min-w-0">

                    <img
                      src={
                        player.image ||
                        `https://mc-heads.net/avatar/${player.ign}/64`
                      }
                      alt={player.ign}
                      className="
                        w-14
                        h-14
                        shrink-0
                        rounded-lg
                        border
                        border-[#303030]
                        object-cover
                      "
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://mc-heads.net/avatar/Steve/64";
                      }}
                    />

                    <div className="min-w-0">

                      <h3 className="text-xl font-bold truncate">
                        {player.ign}
                      </h3>

                      <p className="text-red-500 font-semibold">
                        {player.title}
                      </p>

                      {player.description && (
                        <p className="text-gray-400 text-sm mt-1">
                          {player.description}
                        </p>
                      )}

                    </div>

                  </div>

                  <button
                    onClick={() => handleDelete(player.id)}
                    className="
                      shrink-0
                      bg-red-600
                      hover:bg-red-700
                      px-5
                      py-2.5
                      rounded-lg
                      font-bold
                      transition
                    "
                  >
                    Delete
                  </button>

                </div>

              ))

            )}

          </div>

        </div>

      </div>

    </main>
  );
}
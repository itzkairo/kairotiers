"use client";

import { useEffect, useState } from "react";

import {
  getHallOfFame,
  addHallPlayer,
  deleteHallPlayer,
} from "../../../lib/hallOfFameService";
import { LogoMark, PlusIcon, TrashIcon } from "../../components/CodeIcons";

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
    <main className="min-h-screen bg-background px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1200px]">
        {/* ================= HEADER ================= */}

        <div className="flex flex-col gap-5 border-b border-line-soft pb-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <LogoMark className="h-6 w-6" />

              <span className="text-[13px] font-semibold text-[#8B8B94]">
                KairoTiers Admin
              </span>
            </div>

            <h1 className="mt-4 text-[32px] font-bold leading-none tracking-[-0.045em] text-white sm:text-[40px]">
              Hall Of Fame
            </h1>

            <p className="mt-2 text-[13px] text-[#8B8B94]">
              Add and manage the players featured in the community archive.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <p className="text-[13px] font-medium text-[#8B8B94]">
              {players.length} {players.length === 1 ? "inductee" : "inductees"}
            </p>
          </div>
        </div>

        {/* ================= CONTENT ================= */}

        <div className="mt-6 grid items-start gap-5 xl:grid-cols-[380px_minmax(0,1fr)]">
          {/* ================= ADD PLAYER ================= */}

          <section className="overflow-hidden rounded-[12px] border border-line bg-surface">
            <div className="border-b border-line-soft px-5 py-4">
              <h2 className="text-[15px] font-semibold text-white">
                Add inductee
              </h2>

              <p className="mt-0.5 text-[12px] text-[#6F6F78]">
                Create a new Hall Of Fame entry.
              </p>
            </div>

            <div className="grid gap-4 p-5">
              <div>
                <label
                  htmlFor="admin-ign"
                  className="text-[12px] font-medium text-[#A1A1AA]"
                >
                  Minecraft IGN
                </label>

                <input
                  id="admin-ign"
                  value={ign}
                  onChange={(e) => setIgn(e.target.value)}
                  placeholder="Minecraft IGN"
                  className="field mt-2 h-11 px-3.5"
                />
              </div>

              <div>
                <label
                  htmlFor="admin-title"
                  className="text-[12px] font-medium text-[#A1A1AA]"
                >
                  Title
                </label>

                <input
                  id="admin-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                  className="field mt-2 h-11 px-3.5"
                />
              </div>

              <div>
                <label
                  htmlFor="admin-description"
                  className="text-[12px] font-medium text-[#A1A1AA]"
                >
                  Description
                </label>

                <textarea
                  id="admin-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                  rows={4}
                  className="field mt-2 resize-none px-3.5 py-3"
                />
              </div>

              <div>
                <label
                  htmlFor="admin-image"
                  className="text-[12px] font-medium text-[#A1A1AA]"
                >
                  Image URL
                </label>

                <input
                  id="admin-image"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="Image URL (optional)"
                  className="field mt-2 h-11 px-3.5"
                />
              </div>

              <button
                type="button"
                onClick={handleAdd}
                disabled={loading}
                className="
                  mt-1
                  flex
                  h-11
                  items-center
                  justify-center
                  gap-2
                  rounded-[9px]
                  bg-[#DC2626]
                  text-[14px]
                  font-semibold
                  text-white
                  transition-colors
                  duration-200
                  hover:bg-[#B91C1C]
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                <PlusIcon className="h-4 w-4" />

                {loading ? "Adding..." : "Add player"}
              </button>
            </div>
          </section>

          {/* ================= CURRENT INDUCTEES ================= */}

          <section className="overflow-hidden rounded-[12px] border border-line bg-surface">
            <div className="flex items-center justify-between gap-3 border-b border-line-soft px-5 py-4">
              <h2 className="text-[15px] font-semibold text-white">
                Current inductees
              </h2>

              <span className="rounded-full border border-line bg-[#0A0A0A] px-2 py-0.5 text-[11px] font-medium tabular-nums text-[#A1A1AA]">
                {players.length}
              </span>
            </div>

            {players.length === 0 ? (
              <div className="px-6 py-16 text-center">
                <p className="text-[14px] font-medium text-[#D4D4D8]">
                  No Hall Of Fame players
                </p>

                <p className="mt-1.5 text-[13px] text-[#6F6F78]">
                  Use the form to add the first inductee.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-[#1A1A1A]">
                {players.map((player) => (
                  <div
                    key={player.id}
                    className="
                      flex
                      flex-col
                      gap-4
                      px-5
                      py-4
                      transition-colors
                      duration-200
                      hover:bg-[#0D0A0A]
                      sm:flex-row
                      sm:items-center
                      sm:justify-between
                    "
                  >
                    <div className="flex min-w-0 items-center gap-3.5">
                      <img
                        src={
                          player.image ||
                          `https://mc-heads.net/avatar/${player.ign}/64`
                        }
                        alt={player.ign}
                        className="
                          h-11
                          w-11
                          shrink-0
                          rounded-[9px]
                          border
                          border-line
                          bg-[#0A0A0A]
                          object-cover
                        "
                        onError={(event) => {
                          event.currentTarget.src =
                            "https://mc-heads.net/avatar/Steve/64";
                        }}
                      />

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                          <h3 className="truncate text-[14px] font-semibold text-white">
                            {player.ign}
                          </h3>

                          <span className="text-[12px] font-medium text-[#E05252]">
                            {player.title}
                          </span>
                        </div>

                        {player.description && (
                          <p className="mt-0.5 line-clamp-2 text-[12px] leading-relaxed text-[#6F6F78]">
                            {player.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDelete(player.id)}
                      className="
                        flex
                        h-9
                        shrink-0
                        items-center
                        justify-center
                        gap-2
                        rounded-[8px]
                        border
                        border-line-red
                        bg-[#120909]
                        px-3
                        text-[12px]
                        font-medium
                        text-[#F87171]
                        transition-colors
                        duration-200
                        hover:bg-[#1A0D0D]
                        hover:text-white
                      "
                    >
                      <TrashIcon className="h-3.5 w-3.5" />
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

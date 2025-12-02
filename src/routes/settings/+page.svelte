<script lang="ts">
  import FolderOpen from "@lucide/svelte/icons/folder-open";
  import Plus from "@lucide/svelte/icons/plus";
  import Trash from "@lucide/svelte/icons/trash";
  import { invoke } from "@tauri-apps/api/core";
  import { onMount } from "svelte";

  let path: string = "";
  let paths: string[] = [];

  onMount(() => {
    fetchPaths();
  });

  async function savePath() {
    try {
      await invoke("save_path", { path });
      path = "";
      await fetchPaths();
    } catch (_) {}
  }

  async function choosePath() {
    try {
      await invoke("choose_path");
      await fetchPaths();
    } catch (_) {}
  }

  async function fetchPaths() {
    try {
      paths = await invoke<string[]>("fetch_paths");
    } catch (_) {}
  }

  async function removePath(p: string) {
    try {
      await invoke("remove_path", { path: p });
      await fetchPaths();
    } catch (_) {}
  }
</script>

<div class="border-accent rounded-xl border p-5">
  <h2 class="mb-2 text-xl font-semibold">Photo directories:</h2>

  <div class="mb-4 flex items-center gap-2">
    <input
      type="text"
      name="directoryPath"
      placeholder="Enter directory path..."
      class="placeholder-light-700 ring-accent flex-1 rounded px-2 py-2 ring-2 focus:outline-none"
      bind:value={path}
    />

    <button
      type="button"
      class="bg-accent hover:bg-accent-700 text-bg border-accent hover:border-accent-700 flex cursor-pointer items-center gap-2 rounded border-2 px-2 py-2 font-medium transition"
      on:click={savePath}
    >
      <Plus />
      Add
    </button>

    <button
      type="button"
      class="hover:text-light text-light-700 border-accent flex cursor-pointer items-center gap-2 rounded border-2 px-2 py-2 transition"
      on:click={choosePath}
    >
      <FolderOpen />
      Choose
    </button>
  </div>

  <div class="flex flex-col gap-2">
    {#each paths as p}
      <div
        class="border-accent/40 bg-dark-700 text-light flex items-center justify-between rounded border px-2 py-1 text-sm select-text"
      >
        <span class="break-all">{p}</span>

        <button
          type="button"
          class="cursor-pointer px-2 text-red-500 hover:text-red-700"
          on:click={() => removePath(p)}
        >
          <Trash />
        </button>
      </div>
    {/each}
  </div>
</div>

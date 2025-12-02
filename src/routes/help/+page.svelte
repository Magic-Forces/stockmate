<script lang="ts">
  import { Github } from "@lucide/svelte";
  import { getVersion } from "@tauri-apps/api/app";
  import { openUrl } from "@tauri-apps/plugin-opener";
  import { onMount } from "svelte";

  let version = "";
  onMount(async () => {
    version = await getVersion();
  });

  function openGithub() {
    openUrl("https://github.com/Magic-Forces/stockmate");
  }
</script>

<div class="border-accent rounded-xl border p-5">
  <p>
    Stockmate is an application for uploading photos to stock services and
    social media platforms. The project is currently in development. You can
    report bugs and suggestions on GitHub.
  </p>
  <button
    on:click={() => openGithub()}
    class="bg-accent hover:bg-accent-700 text-bg mt-2.5 flex cursor-pointer items-center gap-2 rounded px-4 py-2 font-medium transition"
  >
    <Github />
    View on GitHub
  </button>

  <p class="text-light-700 mt-2.5 text-sm">
    Version: {version}
  </p>
</div>

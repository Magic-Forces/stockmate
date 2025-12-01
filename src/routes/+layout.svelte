<script lang="ts">
  import "../app.css";
  import { page } from "$app/state";
  import CloudUpload from "@lucide/svelte/icons/cloud-upload";
  import Image from "@lucide/svelte/icons/image";
  import Settings from "@lucide/svelte/icons/settings";
  import CircleQuestionMark from "@lucide/svelte/icons/circle-question-mark";
</script>

<main>
  <nav
    class="border-accent flex items-center justify-between border-b px-6 py-3"
  >
    <a
      href="/"
      class="flex gap-2 text-2xl font-bold transition hover:drop-shadow-[0_0_1em_var(--color-light)]"
    >
      <img src="/app-icon.svg" alt="Stockmate icon" class="h-8 w-8" />
      Stockmate
    </a>
    <div class="flex gap-6">
      <a
        href="/"
        class={`hover:text-accent flex items-center gap-1 transition ${
          page.url.pathname === "/"
            ? "text-accent font-semibold drop-shadow-[0_0_1em_var(--color-accent-700)]"
            : "text-light/80"
        }`}
      >
        <Image />
        <span>Photos</span>
      </a>
      <a
        href="/services"
        class={`hover:text-accent flex items-center gap-1 transition ${
          page.url.pathname === "/services"
            ? "text-accent font-semibold drop-shadow-[0_0_1em_var(--color-accent-700)]"
            : "text-light/80"
        }`}
      >
        <CloudUpload />
        <span>Services</span>
      </a>
      <a
        href="/settings"
        class={`hover:text-accent flex items-center gap-1 transition ${
          page.url.pathname === "/settings"
            ? "text-accent font-semibold drop-shadow-[0_0_1em_var(--color-accent-700)]"
            : "text-light/80"
        }`}
      >
        <Settings />
        <span>Settings</span>
      </a>
      <a
        href="/help"
        title="Help"
        class={`bg-surface hover:text-accent flex h-8 w-8 items-center justify-center rounded transition ${
          page.url.pathname === "/help"
            ? "text-accent drop-shadow-[0_0_1em_var(--color-accent-700)]"
            : "text-light/80"
        }`}
      >
        <CircleQuestionMark size="20" />
      </a>
    </div>
  </nav>

  <section class="p-5">
    <slot />
  </section>
</main>

# Stockmate 📸

Stockmate is a desktop application designed to assist photographers in streamlining the process of uploading photos to multiple stock services and social media platforms. It focuses on efficient management of keywords, tags, and titles to optimize the submission workflow.

## Roadmap & Planned Features 🚀

Here is a rough outline of the features we plan to build. Contributions are welcome at any stage!

### Phase 1: Core Local Functionality

- [x] **Select Photo Folder:** Users can now select a folder containing photos.
- [ ] **Photo Browser:** Display thumbnails of images from user-selected folders.
- [ ] **Metadata Editor:**
  - [ ] View and edit titles, descriptions, and keywords for each photo.
  - [ ] Save metadata changes (e.g., to database or directly to EXIF data).
  - [ ] Bulk edit metadata for multiple selected images.

### Phase 2: Stock Platform Integration

- [ ] **FTP Uploader:**
  - [ ] Implement FTP client to upload images to stock photo sites.
  - [ ] Create predefined FTP settings for popular services (e.g., Shutterstock, Adobe Stock).
  - [ ] Allow users to configure and save custom FTP server settings.

### Phase 3: Social Media Integration

- [ ] **Social Media Posting:**
  - [ ] Connect to Instagram and Facebook APIs.
  - [ ] Post photos with their titles/descriptions directly from the app.

## Tech Stack 🛠️

- **Framework:** [Tauri](https://tauri.app/) (Rust + WebView)
- **Frontend:** [React](https://reactjs.org/) with [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)

## Getting Started

Ready to jump in? Here’s how to get the development environment running:

1.  Clone the repository.
2.  Install dependencies with `pnpm install`.
3.  Run the app in development mode with `pnpm tauri dev`.

## Contributing 👋

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

You can contribute by:

- Picking up a feature from the roadmap.
- Reporting a bug.
- Suggesting a new feature or enhancement.

Please feel free to fork the repo, create a feature branch, and submit a pull request.

## License

Distributed under the AGPL-3.0 License. See `LICENSE` for more information.

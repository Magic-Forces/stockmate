mod core;
mod utils;

use core::migrations::get_migrations;
use tauri::Manager;
use tauri_plugin_log::{
  RotationStrategy, Target, TargetKind, TimezoneStrategy,
};
use utils::path_handler::{choose_path, fetch_paths, remove_path, save_path};

pub fn run() {
  tauri::Builder::default()
    .plugin(tauri_plugin_single_instance::init(|app, _args, _cwd| {
      let _ = app
        .get_webview_window("main")
        .expect("no main window")
        .set_focus();
    }))
    .plugin({
      let mut builder = tauri_plugin_log::Builder::new()
        .clear_targets()
        .timezone_strategy(TimezoneStrategy::UseLocal);

      if cfg!(debug_assertions) {
        builder = builder
          .target(Target::new(TargetKind::Stdout))
          .level(log::LevelFilter::Trace);
      } else {
        builder = builder
          .target(Target::new(TargetKind::LogDir {
            file_name: Some("logs".to_string()),
          }))
          .level(log::LevelFilter::Info)
          .rotation_strategy(RotationStrategy::KeepAll);
      }

      builder.build()
    })
    .plugin(tauri_plugin_prevent_default::debug())
    .plugin(tauri_plugin_opener::init())
    .plugin(tauri_plugin_dialog::init())
    .plugin(
      tauri_plugin_sql::Builder::default()
        .add_migrations("sqlite:stockmate_data.db", get_migrations())
        .build(),
    )
    .invoke_handler(tauri::generate_handler![
      save_path,
      choose_path,
      fetch_paths,
      remove_path
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

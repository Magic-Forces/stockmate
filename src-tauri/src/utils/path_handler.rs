use super::sql::get_db_pool;
use std::path::Path;
use tauri::AppHandle;
use tauri_plugin_dialog::{DialogExt, FilePath};

#[derive(Debug, sqlx::FromRow)]
struct DirectoryRow {
  path: String,
}

#[tauri::command]
pub async fn save_path(app: AppHandle, path: String) -> Result<(), String> {
  log::debug!("save_path called with path = {}", path);

  if !Path::new(&path).exists() {
    log::warn!("Invalid path provided: {}", path);
    return Err("Invalid path provided".into());
  }

  let pool = get_db_pool(&app).await?;

  sqlx::query(
    r#"
        INSERT OR IGNORE INTO photo_directories (path)
        VALUES (?1)
        "#,
  )
  .bind(&path)
  .execute(&pool)
  .await
  .map_err(|e| {
    log::error!("SQL INSERT FAILED for '{}': {}", path, e);
    e.to_string()
  })?;

  log::debug!("Saved path (duplicate ignored if existed): {}", path);

  Ok(())
}

#[tauri::command]
pub async fn choose_path(app: AppHandle) -> Result<(), String> {
  match app.dialog().file().blocking_pick_folder() {
    Some(FilePath::Path(p)) => {
      let path_str = p.to_string_lossy().to_string();

      log::debug!("Selected: {}", path_str);
      save_path(app, path_str).await?;
    }

    _ => {
      log::debug!("Folder selection cancelled.");
    }
  }

  Ok(())
}

#[tauri::command]
pub async fn fetch_paths(app: AppHandle) -> Result<Vec<String>, String> {
  log::debug!("fetch_paths called");

  let pool = get_db_pool(&app).await?;

  let rows = sqlx::query_as::<_, DirectoryRow>(
    r#"
        SELECT path
        FROM photo_directories
        ORDER BY id ASC
        "#,
  )
  .fetch_all(&pool)
  .await
  .map_err(|e| {
    log::error!("Failed to fetch photo directories: {}", e);
    "Failed to fetch photo directories".to_string()
  })?;

  log::debug!("fetch_path rows = {:?}", rows);

  Ok(rows.into_iter().map(|r| r.path).collect())
}

#[tauri::command]
pub async fn remove_path(app: AppHandle, path: String) -> Result<(), String> {
  log::debug!("remove_path called with path = {}", path);

  let pool = get_db_pool(&app).await?;

  sqlx::query(
    r#"
        DELETE FROM photo_directories
        WHERE path = ?1
        "#,
  )
  .bind(&path)
  .execute(&pool)
  .await
  .map_err(|e| {
    log::error!("Failed to delete photo directory '{}': {}", path, e);
    "Failed to delete photo directory".to_string()
  })?;

  log::debug!("Removed path {} from db", path);

  Ok(())
}

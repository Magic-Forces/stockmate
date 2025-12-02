use sqlx::{Pool, Sqlite};
use tauri::{AppHandle, Manager};
use tauri_plugin_sql::{DbInstances, DbPool};

const DB_URL: &str = "sqlite:stockmate_data.db";

pub async fn get_db_pool(app: &AppHandle) -> Result<Pool<Sqlite>, String> {
  let db_instances: tauri::State<'_, DbInstances> = app.state::<DbInstances>();
  let map = db_instances.0.read().await;

  let db = map.get(DB_URL).ok_or_else(|| {
    let msg = format!("Database not loaded: {DB_URL}");
    log::error!("{}", msg);
    msg
  })?;

  match db {
    DbPool::Sqlite(pool) => {
      log::debug!("Successfully acquired SQLite DB pool for {}", DB_URL);
      Ok(pool.clone())
    }
  }
}

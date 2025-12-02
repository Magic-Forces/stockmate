use tauri_plugin_sql::{Migration, MigrationKind};

pub fn get_migrations() -> Vec<Migration> {
  vec![Migration {
    version: 1,
    description: "create_photo_directories_table",
    sql: "CREATE TABLE photo_directories (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          path TEXT NOT NULL UNIQUE,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
          );",
    kind: MigrationKind::Up,
  }]
}

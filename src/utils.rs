use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::fs;
use std::path::PathBuf;

#[derive(Debug, Deserialize, Serialize, Clone)]
#[serde(tag = "type")]
pub enum ServiceConfig {
    #[serde(rename = "shutterstock")]
    Shutterstock { user: String, pass: String },
    #[serde(rename = "custom_ftp")]
    CustomFtp {
        host: String,
        port: u16,
        dir: String,
        tls: bool,
        user: String,
        pass: String,
    },
}

#[derive(Debug, Deserialize, Serialize)]
pub struct Config {
    #[serde(flatten)]
    pub services: HashMap<String, ServiceConfig>,
}

fn get_config_path() -> PathBuf {
    let mut path = dirs::config_dir()
        .unwrap_or_else(|| PathBuf::from(std::env::var("APPDATA").unwrap_or_default()));
    path.push("stockmate");
    path.push("config.toml");
    path
}

fn create_empty_config(config_path: &PathBuf) -> Result<(), Box<dyn std::error::Error>> {
    if let Some(parent) = config_path.parent() {
        fs::create_dir_all(parent)?;
    }

    fs::write(config_path, "")?;
    println!("✅ Created empty config file: {}", config_path.display());

    Ok(())
}

pub fn read_config() -> Result<Config, Box<dyn std::error::Error>> {
    let config_path = get_config_path();

    if !config_path.exists() {
        create_empty_config(&config_path)?;
    }

    let content = fs::read_to_string(config_path)?;
    let config: Config = toml::from_str(&content)?;
    Ok(config)
}

use clap::{Parser, Subcommand};
use std::path;

#[derive(Parser)]
#[command(name = "stockmate", version)]
pub struct Cli {
    #[command(subcommand)]
    pub command: Commands,
}

#[derive(Subcommand)]
pub enum Commands {
    /// Configure credentials for stock services and social media.
    Config,
    /// Upload files from a specified folder to stock services and social media.
    Upload {
        /// Path to the folder containing files to upload.
        folder: path::PathBuf,
    },
}

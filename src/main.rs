mod cli;
mod config;
mod upload;
mod utils;

use clap::Parser;
use cli::{Cli, Commands};

fn main() {
    let cli = Cli::parse();

    match cli.command {
        Commands::Config => {
            config::handle_config();
        }
        Commands::Upload { folder } => {
            upload::handle_upload(folder);
        }
    }
}

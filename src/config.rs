use crate::utils::{ServiceConfig, read_config};

pub fn handle_config() {
    match read_config() {
        Ok(config) => {
            if config.services.is_empty() {
                println!("Configuration exists but is empty.");
            } else {
                println!("Configured services:\n");
                println!("{:<20} | {:<15}", "Name", "Type");
                println!("{:-<20}-+-{:-<15}", "", "");

                for (name, service_config) in &config.services {
                    let service_type = match service_config {
                        ServiceConfig::Shutterstock { .. } => "Shutterstock",
                        ServiceConfig::CustomFtp { .. } => "Custom FTP",
                    };

                    println!("{:<20} | {:<15}", name, service_type);
                }

                println!();
            }
        }
        Err(e) => {
            println!("❌ Error reading configuration: {}", e);
        }
    }
}

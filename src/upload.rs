use colored::*;
use std::{fs, io, path::PathBuf};

pub fn handle_upload(folder: PathBuf) {
    loop {
        println!(
            "Do you want to upload files from: '{}'? {}",
            folder.display().to_string().cyan(),
            "(y/n)".green()
        );

        let mut input = String::new();
        io::stdin()
            .read_line(&mut input)
            .expect("Failed to read from stdin");

        match input.trim().to_lowercase().as_str() {
            "y" => break,
            "n" => {
                println!("{}", "Upload cancelled.".red());
                return;
            }
            _ => {
                println!("{}", "Invalid input. Please enter 'y' or 'n'.".yellow());
            }
        }
    }

    let paths = fs::read_dir(folder).unwrap();

    for path in paths {
        println!("{}", path.unwrap().file_name().to_string_lossy().green())
    }
}

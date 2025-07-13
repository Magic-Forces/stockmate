import sys
from pathlib import Path

import click
import tomli_w

if sys.version_info >= (3, 11):
    import tomllib
else:
    import tomli as tomllib

APP_NAME = "stockmate"


def get_config_path() -> Path:
    app_dir = Path(click.get_app_dir(APP_NAME))
    return app_dir / "config.toml"


def load_config() -> dict:
    config_path = get_config_path()
    if not config_path.exists():
        click.echo(
            click.style("Config file not found. ", fg="red")
            + f"Creating a new one at: {click.style(str(config_path), fg='cyan', bold=True)}"
        )
        config_path.parent.mkdir(parents=True, exist_ok=True)
        default_config = {
            "shutterstock_example": {
                "type": "shutterstock",
                "username": "YOUR_USERNAME_HERE",
                "password": "YOUR_PASSWORD_HERE",
            },
            "ftp_example": {
                "type": "custom_ftp",
                "host": "ftp.example.com",
                "port": 21,
                "tls": False,
                "username": "YOUR_FTP_USERNAME",
                "password": "YOUR_FTP_PASSWORD",
            },
        }
        with open(config_path, "wb") as f:
            tomli_w.dump(default_config, f)
        return default_config

    with open(config_path, "rb") as f:
        return tomllib.load(f)


def handle_config():
    config = load_config()

    if not config:
        click.echo("No configurations found.")
    else:
        table_data = [
            (name, details.get("type", "N/A")) for name, details in config.items()
        ]

        headers = ("Name", "Type")
        all_rows = [headers] + table_data
        col_widths = [max(len(str(item)) for item in col) for col in zip(*all_rows)]

        header_line = " | ".join(
            click.style(f"{headers[i]:<{col_widths[i]}}", fg="cyan")
            for i in range(len(headers))
        )
        click.echo(header_line)

        separator = "-+-".join("-" * width for width in col_widths)
        click.echo(click.style(separator, fg="cyan"))

        for row in table_data:
            row_line = " | ".join(f"{row[i]:<{col_widths[i]}}" for i in range(len(row)))
            click.echo(row_line)

    config_path = get_config_path()
    click.echo(
        "\n"
        + click.style(
            "To add or edit configurations, please edit the file at:", fg="yellow"
        )
        + "\n"
        + click.style(str(config_path), fg="cyan", bold=True)
    )

import click
from pathlib import Path
from .config import handle_config
from .upload import handle_upload


@click.group()
@click.version_option()
def stockmate():
    """CLI tool for uploading files to stock services and social media."""
    pass


@stockmate.command()
def config():
    """Configure credentials for stock services and social media."""
    handle_config()


@stockmate.command()
@click.argument(
    "folder",
    type=click.Path(exists=True, file_okay=False, dir_okay=True, path_type=Path),
)
def upload(folder):
    """Upload files from a specified folder to stock services and social media."""
    handle_upload(folder)

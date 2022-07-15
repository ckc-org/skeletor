import os
from logging import LogRecord

from slack_logger import SlackHandler


class CustomSlackHandler(SlackHandler):
    """
    Override the default handler to insert our own URL
    """
    def __init__(self, **kwargs):
        url = os.getenv('SLACK_WEBHOOK_URL')
        super().__init__(url, **kwargs)

    def format(self, record: LogRecord) -> str:
        """Surround our log message in a "code block" for styling."""
        return f"```{super().format(record)}```"

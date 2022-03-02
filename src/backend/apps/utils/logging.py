import os
from logging.handlers import HTTPHandler
from urllib.parse import urlparse

from slack_logger import SlackHandler


class CustomSlackHandler(SlackHandler):
    def __init__(self, username=None, icon_url=None, icon_emoji=None, channel=None, mention=None):
        url = os.getenv('SLACK_WEBHOOK_URL')
        o = urlparse(url)
        is_secure = o.scheme == 'https'
        HTTPHandler.__init__(self, o.netloc, o.path, method="POST", secure=is_secure)
        self.username = username
        self.icon_url = icon_url
        self.icon_emoji = icon_emoji
        self.channel = channel
        self.mention = mention and mention.lstrip('@')

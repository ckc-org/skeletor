from django.conf import settings
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

from utils import email_factories

User = get_user_model()


class Command(BaseCommand):
    help = "Send a test email, generates random data unless given"

    def add_arguments(self, parser):
        parser.add_argument('name', help="The name of the email template to use")
        parser.add_argument('to_email', help="Email we're sending test to")

        # TODO: implement this... should take a list of things to override
        # parser.add_argument('-o', help="Override a specific context variable")

    def handle(self, *args, **kwargs):
        email_factory = getattr(email_factories, kwargs['name'])
        assert email_factory, f"Invalid email template name: {kwargs['name']}"
        assert settings.ANYMAIL.get("MANDRILL_API_KEY") or settings.ANYMAIL.get('MAILJET_API_KEY'), \
            "Some email backend API key is required to send test email -- MANDRILL_API_KEY, MAILJET_API_KEY, etc."

        # TODO: ability to pass extra kwargs n such here?
        email_factory(kwargs["to_email"])

        print(f"\n{kwargs['name']} email sent to {kwargs['to_email']}!\n")

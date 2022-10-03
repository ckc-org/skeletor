import re

from django.contrib.auth import authenticate
from django.core import mail
from django.urls import reverse

from factories import UserFactory
from tests.utils import CkcAPITestCase


class TestUserPasswordReset(CkcAPITestCase):
    def test_password_reset_ignores_invalid_emails(self):
        resp = self.client.post(reverse('passwordreset-list'), {"email": "random@non-existing-email.com"})
        assert resp.status_code == 200

    def test_password_reset_works(self):
        user = UserFactory()

        # Request password reset for our user
        resp = self.client.post(reverse('passwordreset-list'), {"email": user.email})
        assert resp.status_code == 200
        assert len(mail.outbox) == 1

        # Open up the email and find the link to our frontend, to snag uid + token
        pattern = re.compile(r'.*password_reset_confirm/(?P<uid>.*?)/(?P<token>.*?)/', re.MULTILINE | re.DOTALL)
        result = pattern.match(mail.outbox[0].body).groupdict()
        uid = result["uid"]
        token = result["token"]

        # Do the password reset with "test"
        resp = self.client.post(
            reverse('passwordreset-confirm', args=(uid, token)),
            {"password_1": "test", "password_2": "test"}
        )
        assert resp.status_code == 200

        # We can login with test
        assert authenticate(email=user.email, password="test")

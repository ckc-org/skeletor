from django.urls import reverse

from factories import UserFactory
from tests.utils import CkcAPITestCase


class LoginTests(CkcAPITestCase):
    def test_login_view_works(self):
        UserFactory(email="test@test.com", password="test")
        resp = self.client.post(reverse("rest_login"), {"email": "test@test.com", "password": "test"})
        assert resp.status_code == 200

from django.urls import reverse
from tests.utils import CkcAPITestCase


class SmokeTests(CkcAPITestCase):
    def test_hitting_front_page_works(self):
        resp = self.client.get(reverse("index"))
        assert resp.status_code == 200

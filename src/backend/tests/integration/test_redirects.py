from factories import UserFactory
from tests.utils import CkcAPITestCase


class RedirectTests(CkcAPITestCase):
    def test_append_slash_works(self):
        self.client.force_authenticate(UserFactory())
        no_slash_resp = self.client.get('/api')
        slash_resp = self.client.get('/api/')

        assert no_slash_resp.status_code == 301
        assert slash_resp.status_code == 200

        self.assertRedirects(no_slash_resp, '/api/', status_code=301)

    def test_404_on_nonexistent_api_view(self):
        resp = self.client.get('/api/i_do_not_exist/')
        assert resp.status_code == 404

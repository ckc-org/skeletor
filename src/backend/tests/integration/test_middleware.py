from tests.utils import CkcAPITestCase


class CustomMiddlewareTests(CkcAPITestCase):
    def test_append_slash_works(self):
        no_slash_resp = self.client.get('/admin/login')
        slash_resp = self.client.get('/admin/login/')

        assert no_slash_resp.status_code == 302
        assert slash_resp.status_code == 200

        self.assertRedirects(no_slash_resp, '/admin/login/?next=/admin/login')

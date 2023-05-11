from utils.integrations.harvest import get_current_days_tracked_time
from factories import UserFactory

from tests.utils import CkcAPITestCase


class HarvestTests(CkcAPITestCase):
    def test_harvest(self):
        user = UserFactory(email="test@test.com", password="test")

        self.client.force_authenticate(user)

        get_current_days_tracked_time()
        assert False

from django.db import DEFAULT_DB_ALIAS, connections
from django.test import CaptureQueriesContext
from rest_framework.test import APITestCase


class CkcAPITestCase(APITestCase):
    def assertNumQueriesApprox(self, num, delta=5, func=None, *args, using=DEFAULT_DB_ALIAS, **kwargs):
        conn = connections[using]

        context = _AssertNumQueriesApproxContext(self, num, conn, delta)
        if func is None:
            return context

        with context:
            func(*args, **kwargs)


class _AssertNumQueriesApproxContext(CaptureQueriesContext):
    def __init__(self, test_case, num, connection, delta):
        self.test_case = test_case
        self.num = num
        self.delta = delta
        super().__init__(connection)

    def __exit__(self, exc_type, exc_value, traceback):
        super().__exit__(exc_type, exc_value, traceback)
        if exc_type is not None:
            return
        executed = len(self)
        lower_bound = self.num - self.delta
        upper_bound = self.num + self.delta

        assert lower_bound <= executed <= upper_bound, \
            f"Expected {self.num} queries (+/-{self.delta}), but {executed} were executed."

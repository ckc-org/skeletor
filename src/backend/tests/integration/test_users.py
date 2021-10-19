from django.urls import reverse

from factories import UserFactory
from tests.utils import CkcAPITestCase
from users.models import User


class UserAndLoginTests(CkcAPITestCase):

    def test_create_user(self):
        user = User.objects.create_user('testuser@test.com', 'password')
        assert user
        assert not user.is_staff
        assert not user.is_superuser

    def test_create_superuser(self):
        user = User.objects.create_superuser('testuser@test.com', 'password')
        assert user
        assert user.is_staff
        assert user.is_superuser

    def test_create_user_requires_email(self):
        try:
            User.objects.create_user('', 'password')
        except ValueError as err:
            assert str(err) == 'The given email must be set'

    def test_create_superuser_cannot_have_false_flags(self):
        try:
            User.objects.create_superuser('testuser@test.com', 'password', is_staff=False)
        except ValueError as err:
            assert str(err) == 'Superuser must have is_staff=True.'

        try:
            User.objects.create_superuser('testuser@test.com', 'password', is_superuser=False)
        except ValueError as err:
            assert str(err) == 'Superuser must have is_superuser=True.'

    def test_login_view_works(self):
        UserFactory(email="test@test.com", password="test")

        resp = self.client.post(reverse("rest_login"), {"email": "test@test.com", "password": "wrong password"})
        assert resp.status_code == 400

        resp = self.client.post(reverse("rest_login"), {"email": "test@test.com", "password": "test"})
        assert resp.status_code == 200
        
    def test_user_login_and_remember_me_sets_expiry_properly(self):
        user = UserFactory(email="test@test.com", password="test")
        data = {
            'email': user.email,
            'password': 'test',
            'remember_me': True,
        }
        resp = self.client.post(reverse("rest_login"), data=data)
        assert resp.status_code == 200
        assert resp.cookies['sessionid']['max-age'] == 1209600

        data['remember_me'] = False
        resp = self.client.post(reverse("rest_login"), data=data)
        assert resp.status_code == 200
        assert resp.cookies['sessionid']['max-age'] == ''


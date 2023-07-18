from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode

from factories import UserFactory
from users.models import User
from . import email


def welcome(to_email):
    return email.welcome(_get_a_user_from_email(to_email))


def password_reset(to_email):
    user = _get_a_user_from_email(to_email)
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    token = default_token_generator.make_token(user)
    return email.password_reset(user, uid, token)


def _get_a_user_from_email(email):
    if not email:
        return UserFactory()
    else:
        try:
            return User.objects.get(email=email)
        except User.DoesNotExist:
            return UserFactory(email=email)

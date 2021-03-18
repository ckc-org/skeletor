from dj_rest_auth.serializers import PasswordResetSerializer
from django.contrib.auth.forms import PasswordResetForm
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import authenticate
from django.utils.translation import gettext_lazy as _


class PasswordResetFormCustomEmail(PasswordResetForm):

    def send_mail(self, subject_template_name, email_template_name, context, from_email, to_email, **kwargs):
        email.password_reset(to_email, context['uid'], context['token'])


class PasswordResetCustomEmailSerializer(PasswordResetSerializer):

    password_reset_form_class = PasswordResetFormCustomEmail

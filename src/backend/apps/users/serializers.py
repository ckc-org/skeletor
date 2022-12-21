from django.contrib.auth import get_user_model, password_validation
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from utils import email


User = get_user_model()


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True)
    remember_me = serializers.BooleanField(default=False, required=False)


class UserDetailsSerializer(serializers.ModelSerializer):
    """
    User model w/o password
    """
    class Meta:
        model = User
        fields = (
            'id',
            'email',
            'first_name',
            'last_name',
        )
        read_only_fields = ('email',)


class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def save(self):
        try:
            user = User.objects.get(email=self.validated_data['email'])
            email.password_reset(user)
        except User.DoesNotExist:
            # If user doesn't exist, silently fail, do nothing
            pass


class PasswordResetConfirmSerializer(serializers.Serializer):
    password_1 = serializers.CharField(max_length=64)
    password_2 = serializers.CharField(max_length=64)

    def validate_password_2(self, value):
        password_validation.validate_password(value)
        return value

    def validate(self, attrs):
        if attrs['password_1'] != attrs['password_2']:
            raise ValidationError({'password_1': 'Passwords should match.', 'password_2': 'Passwords should match.'})
        return attrs

    def save(self):
        self.context['user'].set_password(self.validated_data['password_2'])
        self.context['user'].save()

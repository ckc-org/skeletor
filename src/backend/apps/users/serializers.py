from django.contrib.auth import login, get_user_model, password_validation
from django.shortcuts import get_object_or_404
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from utils import email


User = get_user_model()


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True)
    remember_me = serializers.BooleanField(default=False, required=False)


class EmailVerificationSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    otp_code = serializers.CharField(required=True)

    def validate(self, attrs):
        user = get_object_or_404(User, email=attrs['email'])
        if not user.email_verification_code == attrs['otp_code']:
            raise ValidationError({'otp_code': 'Invalid OTP code.'})
        return attrs


class UserSelfDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id',
            'email',
            'email_verified',
            'first_name',
            'last_name',
        )
        read_only_fields = ('email', 'email_verified')

    def create(self, validated_data):
        user = super().create(validated_data)
        login(self.context['request'], user)
        return user


class UserCreateSerializer(serializers.ModelSerializer):
    send_otp_email_verification = serializers.BooleanField(default=False, required=False, write_only=True)

    class Meta:
        model = User
        fields = (
            'id',
            'email',
            'first_name',
            'last_name',
            'send_otp_email_verification',
        )

    def create(self, validated_data):
        send_otp_email_verification = validated_data.pop('send_otp_email_verification')
        user = super().create(validated_data)
        if send_otp_email_verification:
            email.otp_email_verification(user)
        return user


class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id',
            'first_name',
            'last_name',
        )


class UserListSerializer(serializers.ModelSerializer):
    """
    User model w/o password
    """
    class Meta:
        model = User
        fields = (
            'id',
            'first_name',
        )


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

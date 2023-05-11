from django.contrib.auth import login, get_user_model, password_validation
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from utils import email
from users.models import OTPVerificationCode

from users.models import Daily

User = get_user_model()


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True)
    remember_me = serializers.BooleanField(default=False, required=False)


class EmailVerificationSerializer(serializers.Serializer):
    otp_code = serializers.CharField(required=True)

    def validate(self, attrs):
        code = OTPVerificationCode.objects.filter(user=self.context['request'].user).last()
        if code is None or code.code != attrs['otp_code']:
            raise ValidationError({'otp_code': 'Invalid OTP code.'})
        return attrs

    def save(self):
        user = self.context['request'].user
        user.email_verified = True
        user.save()


class DailySerializer(serializers.ModelSerializer):

    class Meta:
        model = Daily

        fields = (
            'id',
            'user',
            'date_created',
            'yesterday_description',
            'today_description',
        )


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
        login(self.context['request'], user)
        if send_otp_email_verification:
            email.otp_email_verification(user)
        return user


class UserDetailSerializer(serializers.ModelSerializer):
    dailies = DailySerializer(many=True)

    class Meta:
        model = User
        fields = (
            'id',
            'first_name',
            'last_name',
            'dailies',
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
    new_password_1 = serializers.CharField(max_length=64)
    new_password_2 = serializers.CharField(max_length=64)

    def validate_new_password_2(self, value):
        password_validation.validate_password(value)
        return value

    def validate(self, attrs):
        if attrs['new_password_1'] != attrs['new_password_2']:
            raise ValidationError({
                'new_password_1': 'Passwords should match.',
                'new_password_2': 'Passwords should match.'
            })
        return attrs

    def save(self):
        self.context['user'].set_password(self.validated_data['new_password_2'])
        self.context['user'].save()

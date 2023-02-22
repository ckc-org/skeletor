from django.contrib.auth import authenticate, login, logout, get_user_model
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from rest_framework import views, status, viewsets, mixins
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token

from users.serializers import LoginSerializer, PasswordResetSerializer, PasswordResetConfirmSerializer, UserSelfDetailSerializer, UserDetailSerializer, UserListSerializer, UserCreateSerializer, EmailVerificationSerializer
from users.permissions import IsUser

from utils import email


User = get_user_model()


# TODO: Add to api docs ??
class LoginView(views.APIView):
    permission_classes = [AllowAny]
    serializer_class = LoginSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=self.request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)

        user = authenticate(
            email=serializer.validated_data.get('email'),
            password=serializer.validated_data.get('password')
        )

        if user is not None:
            # Set expiry (in seconds) BEFORE inactivity logs you out.
            if serializer.validated_data['remember_me']:
                expiry = 60 * 60 * 24 * 7 * 2  # 2 weeks
            else:
                expiry = 0  # Session only cookie
            request.session.set_expiry(expiry)  # set_expiry must be called before login!

            login(request, user)

            token, created = Token.objects.get_or_create(user=user)

            return Response({
                'token': token.key,
                'user': UserSelfDetailSerializer(user).data,
            })
        else:
            raise ValidationError({"non_field_errors": ["Incorrect login information."]})


class LogoutView(views.APIView):
    def post(self, request, format=None):
        logout(request)
        return Response(status=status.HTTP_200_OK)


class UserViewSet(
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet,
):
    queryset = User.objects.all()

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return UserCreateSerializer
        if self.action == 'retrieve':
            return UserDetailSerializer
        if self.action == 'me':
            return UserSelfDetailSerializer
        if self.action == 'verify_email':
            return EmailVerificationSerializer
        else:
            return UserListSerializer

    def get_permission_classes(self):
        if self.action == 'create':
            return [AllowAny]
        elif self.action in ['update', 'partial_update']:
            return [IsAuthenticated, IsUser]
        elif self.action in ['list', 'retrieve', 'me', 'verify_email', 'resend_otp_email_verification']:
            return [IsAuthenticated]
        else:
            return [IsAuthenticated]

    def get_permissions(self):
        return [permission() for permission in self.get_permission_classes()]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        headers = self.get_success_headers(serializer.data)
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user': UserSelfDetailSerializer(user).data,
        },
            status=status.HTTP_201_CREATED,
            headers=headers,
        )

    @action(detail=False, methods=['post'])
    def resend_otp_email_verification(self, request):
        email.otp_email_verification(request.user)
        return Response()

    @action(detail=False, methods=['post'])
    def verify_email(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(UserSelfDetailSerializer(request.user).data)

    @action(detail=False, methods=['get'])
    def me(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)


class UserPasswordResetViewSet(viewsets.ViewSet):
    serializer_class = PasswordResetSerializer
    permission_classes = [AllowAny]

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response()

    @action(
        detail=False,
        methods=('post',),
        serializer_class=PasswordResetConfirmSerializer,
        url_path='confirm/(?P<uid>[^/.]+)/(?P<token>[^/.]+)'
    )
    def confirm(self, request, uid, token):
        try:
            user_pk = force_str(urlsafe_base64_decode(uid))
            user = User.objects.get(pk=user_pk)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            raise ValidationError({'uid': ['Invalid value']})

        if not default_token_generator.check_token(user, token):
            raise ValidationError({'token': ['Invalid value']})

        serializer = PasswordResetConfirmSerializer(data=request.data, context={'user': user})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response()

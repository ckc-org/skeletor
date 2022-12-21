from django.contrib.auth import authenticate, login, logout, get_user_model
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from rest_framework import views, status, viewsets, mixins
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from users.serializers import LoginSerializer, PasswordResetSerializer, PasswordResetConfirmSerializer, UserDetailsSerializer


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

            return Response(status=status.HTTP_200_OK)
        else:
            raise ValidationError({"non_field_errors": ["Incorrect login information."]})


class LogoutView(views.APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        logout(request)
        return Response(status=status.HTTP_200_OK)


class UserDetailView(mixins.ListModelMixin, viewsets.GenericViewSet):
    """This is the view hit after logging in, or after re-visiting page, to get
    user profile data"""
    permission_classes = [IsAuthenticated]
    serializer_class = UserDetailsSerializer

    def list(self, request, *args, **kwargs):
        serializer = self.get_serializer(self.request.user)
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

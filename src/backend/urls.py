from django.conf import settings
from django.conf.urls import include
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path
from rest_framework import routers

from users.views import LoginView, LogoutView, UserPasswordResetViewSet, UserViewSet

router = routers.DefaultRouter()

# user related, i.e. reset passwords
router.register('passwordreset', UserPasswordResetViewSet, basename='passwordreset')

# Custom views
router.register('users', UserViewSet, basename="user")

urlpatterns = [
    # Our URLS
    path('api/', include(router.urls)),

    # TODO: Add these auth endpoints to api docs, like password reset ??
    path('api/auth/login/', LoginView.as_view(), name="rest_login"),
    path('api/auth/logout/', LogoutView.as_view(), name="rest_logout"),

    # Django built in
    path('admin/', admin.site.urls),
]


if settings.DEBUG:  # pragma: no cover
    # Static files for local dev, so we don't have to collectstatic and such
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

    # Django debug toolbar
    import debug_toolbar
    urlpatterns += [
        path('__debug__/', include(debug_toolbar.urls)),
    ]

# If we're being served on Heroku, we're on `django/` prefix, so prefix
# all urls with that
if settings.SETTINGS_MODULE == 'settings.heroku':
    urlpatterns = [path('django/', include(urlpatterns))]

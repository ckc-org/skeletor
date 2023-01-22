from django.conf import settings
from django.conf.urls import include
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, re_path
from django.views.generic import TemplateView
from rest_framework import routers

from users.views import LoginView, LogoutView, UserPasswordResetViewSet, UserDetailView

router = routers.DefaultRouter()

# user related, i.e. reset passwords
router.register('passwordreset', UserPasswordResetViewSet, basename='passwordreset')

# Custom views
# router.register('some_resource', SomeViewSet)

urlpatterns = [
    # Our URLS
    path('api/', include(router.urls)),

    # TODO: Add these auth endpoints to api docs, like password reset ??
    path('api/auth/login/', LoginView.as_view(), name="rest_login"),
    path('api/auth/logout/', LogoutView.as_view(), name="rest_logout"),
    path('api/auth/user/', UserDetailView.as_view({'get': 'list'}), name="user_detail"),

    # Django built in
    path('admin/', admin.site.urls),

    # Pass through to our SPA (this template is in /frontend/dist docker volume)
    re_path(f'^(?!api|admin|__debug__|{settings.STATIC_URL_PREFIX}|{settings.MEDIA_URL_PREFIX}).*', TemplateView.as_view(template_name='index.html'), name="index"),
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

from django.conf import settings
from django.conf.urls import include
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path
from django.views.generic import TemplateView
# from rest_framework import routers


# router = routers.DefaultRouter()
# router.register('some_resource', SomeViewSet)

urlpatterns = [
    # Our URLS
    # path('api/', include(router.urls)),
    # todo..

    path('api/auth/', include('dj_rest_auth.urls')),

    # Django built in
    path('admin/', admin.site.urls),

    # Pass through to our SPA (this template is in /frontend/dist docker volume)
    path('', TemplateView.as_view(template_name='index.html')),
]


if settings.DEBUG:
    # Static files for local dev, so we don't have to collectstatic and such
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_URL)

    # Django debug toolbar
    import debug_toolbar
    urlpatterns += [
        path('__debug__/', include(debug_toolbar.urls)),
    ]

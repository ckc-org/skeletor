from django.conf import settings
from django.conf.urls import include
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path
from wagtail.admin import urls as wagtailadmin_urls
from wagtail.core import urls as wagtail_urls
from wagtail.documents import urls as wagtaildocs_urls

from attacks.models import Attack
from bindings.models import Binding
from monster.models import Monsta
from players.models import Player

# admin.site.register(Monsta)
admin.site.register(Player)
admin.site.register(Binding)
admin.site.register(Attack)

urlpatterns = [
    # Wagtail Admin and Docs
    path('cms/', include(wagtailadmin_urls)),
    path('documents/', include(wagtaildocs_urls)),
    path('api/', include('api.urls')),

    # Django built in
    path('admin/', admin.site.urls),

    # Wagtail Site URLS
    path('', include(wagtail_urls)),
]


if settings.DEBUG:
    # Static files for local dev, so we don't have to collectstatic and such
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_URL)

    # Django debug toolbar
    import debug_toolbar
    urlpatterns += [
        path('__debug__/', include(debug_toolbar.urls)),
    ]

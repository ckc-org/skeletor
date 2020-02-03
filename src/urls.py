from django.conf import settings
from django.conf.urls import include
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from django.views.generic.base import TemplateView

from attacks.models import Attack
from bindings.models import Binding
from monster.models import Monsta
from players.models import Player
from views import HomePageView

admin.site.register(Monsta)
admin.site.register(Player)
admin.site.register(Binding)
admin.site.register(Attack)

urlpatterns = [
    # DRF API
    path('', include('api.urls')),

    # Django built in
    path('admin/', admin.site.urls),

    # Wagtail Site URLS
    path('', HomePageView.as_view(), name='home'),

    # Our App URLS
    path('', include('players.urls')),
    path('', include('bindings.urls')),
    path('', include('monster.urls')),
    path('', include('attacks.urls')),
    path('accounts/', include('django.contrib.auth.urls')),
    path('', TemplateView.as_view(template_name='home_page.html'), name='home')
]

if settings.DEBUG:
    # Static files for local dev, so we don't have to collectstatic and such
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_URL)

    # Django debug toolbar
    import debug_toolbar
    urlpatterns += [
        path('__debug__/', include(debug_toolbar.urls)),
    ]

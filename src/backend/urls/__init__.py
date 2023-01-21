from django.conf.urls import include
from django.urls import path, re_path
from django.views.generic import TemplateView
from . import base


urlpatterns = [
    path('', include(base)),

    # Pass through to our SPA (this template is in /frontend/dist docker volume)
    re_path('.*', TemplateView.as_view(template_name='index.html'), name="index"),
]

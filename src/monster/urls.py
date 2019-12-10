from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from .views import SiteMonsterView

monster_list = SiteMonsterView.as_view({
    'get': 'list',
})

monster_detail = SiteMonsterView.as_view({
    'get': 'retrieve',
})

urlpatterns = [
    path('monsters/', monster_list, name="monster_list"),
    path('monsters/<int:pk>/', monster_detail, name="monster_detail"),
]


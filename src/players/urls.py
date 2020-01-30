from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from .views import MyPlayerView

player_list = MyPlayerView.as_view({
    'get': 'list',
})

player_detail = MyPlayerView.as_view({
    'get': 'retrieve',
})

urlpatterns = [
    path('players/', player_list, name="player_list"),
    path('players/<int:pk>/', player_detail, name="player_detail"),
]

urlpatterns = format_suffix_patterns(urlpatterns)

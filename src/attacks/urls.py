from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from .views import SiteAttackView

attack_list = SiteAttackView.as_view({
    'get': 'list',
})

attack_detail = SiteAttackView.as_view({
    'get': 'retrieve',
})

urlpatterns = [
    path('attacks/', attack_list, name="attacks_list"),
    path('attacks/<int:pk>/', attack_detail, name="attack_detail"),
]

urlpatterns = format_suffix_patterns(urlpatterns)
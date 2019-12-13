from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from .views import MyBindingView

binding_list = MyBindingView.as_view({
    'get': 'list',
    'post': 'create',
})

binding_detail = MyBindingView.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy',
})

urlpatterns = [
    path('bindings/', binding_list, name="binding_list"),
    path('bindings/<int:pk>/', binding_detail, name="binding_detail"),
]

urlpatterns = format_suffix_patterns(urlpatterns)

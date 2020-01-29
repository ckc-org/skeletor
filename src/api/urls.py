from django.urls import include, path
from rest_framework import routers
from src.api import views

router = routers.DefaultRouter()
router.register('users', views.UserViewSet)
router.register('groups', views.GroupViewSet)
router.register('monstas', views.APIMonstaViewSet)
router.register('players', views.APIPlayerViewSet)
router.register('attacks', views.APIAttackViewSet)
router.register('bindings', views.APIBindingViewSet)


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]

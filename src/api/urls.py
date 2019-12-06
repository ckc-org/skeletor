from django.urls import include, path
from rest_framework import routers
from src.api import views

router = routers.DefaultRouter()
router.register('users', views.UserViewSet)
router.register('groups', views.GroupViewSet)
router.register('monstas', views.MonstaViewSet)
router.register('players', views.PlayerViewSet)
router.register('attacks', views.AttackViewSet)
router.register('bindings', views.BindingViewSet)


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
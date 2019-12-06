from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from api.serializers import UserSerializer, GroupSerializer, MonstaSerializer, PlayerSerializer, AttackSerializer, \
    BindingSerializer
from attacks.models import Attack
from bindings.models import Binding
from monster.models import Monsta
from players.models import Player


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class MonstaViewSet(viewsets.ModelViewSet):
    queryset = Monsta.objects.all()
    serializer_class = MonstaSerializer

    @action(detail=False, methods=['get'])
    def get_monsters(self, request):
        monsters = Monsta.objects.all()
        serializer = MonstaSerializer(monsters, many=True, context={'request': request})
        return Response(serializer.data)


class PlayerViewSet(viewsets.ModelViewSet):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer


class AttackViewSet(viewsets.ModelViewSet):
    queryset = Attack.objects.all().order_by('-name')
    serializer_class = AttackSerializer


class BindingViewSet(viewsets.ModelViewSet):
    queryset = Binding.objects.all()
    serializer_class = BindingSerializer

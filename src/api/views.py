from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from api.serializers import UserSerializer, GroupSerializer, MonstaSerializer, PlayerSerializer, AttackSerializer, \
    BindingSerializer
from attacks.models import Attack
from bindings.models import Binding
from monster.models import Monsta
from players.models import Player

ELEMENT = [
    'arcane',
    'light',
    'air',
    'water',
    'fire',
    'dark',
    'earth',
    'normal',
]


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


class APIMonstaViewSet(viewsets.ModelViewSet):
    queryset = Monsta.objects.all()
    serializer_class = MonstaSerializer


class APIPlayerViewSet(viewsets.ModelViewSet):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer

    @action(detail=False, methods=['get'])
    def get_players_list(self, request):
        players_list = Player.objects.all()
        serializer = PlayerSerializer(players_list, many=True, context={'request': request})
        return Response(serializer.data)

    @action(detail=True, methods=["get"])
    def get_player(self, request, pk):
        player = Player.objects.get(pk=pk)
        serializer = PlayerSerializer(player, many=False, context={"request": request})
        return Response(serializer.data)


class APIBindingViewSet(viewsets.ModelViewSet):
    queryset = Binding.objects.all()
    serializer_class = BindingSerializer

    @action(detail=False, methods=['get'])
    def get_monsters(self, request):
        monsters = Binding.objects.all().filter(player=self.request.user.player)
        serializer = BindingSerializer(monsters, many=True, context={'request': request})
        return Response(serializer.data)

    @action(detail=True, methods=['put'])
    def pick_monster(self, request, pk):
        monster = Binding.objects.get(pk=pk)
        if monster.player.full_party and not monster.picked:
            raise ValidationError("You already have 3 picked monsters!")
        monster.picked = not monster.picked
        monster.save()
        monster.player.save()
        serializer = BindingSerializer(monster, many=False, context={'request': request})
        return Response(serializer.data)
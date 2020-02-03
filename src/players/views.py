from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import render
from rest_framework import viewsets

from api.serializers import PlayerSerializer
from players.models import Player


class MyPlayerView(LoginRequiredMixin, viewsets.ModelViewSet):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer

    def list(self, request, *args, **kwargs):
        players = Player.objects.all()
        return render(request, 'players/player_list.html', context={'players': players})

    def retrieve(self, *args, **kwargs):
        player = Player.objects.get(pk=kwargs['pk'])
        return render(self.request, 'players/player_detail.html', context={'player': player})
from django.contrib.auth.models import User, Group
from rest_framework import serializers

from monster.models import Monsta


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = [
            'url',
            'username',
            'email',
            'groups'
        ]


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = [
            'url',
            'name'
        ]


class MonstaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Monsta
        fields = [
            'monsterName',
            'family',
            'element',
            'description',
        ]

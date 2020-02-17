import random

from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

from attacks.models import Attack
from bindings.models import Binding


class Player(models.Model):
    user = models.OneToOneField(User, related_name='player', blank=True, null=True, on_delete=models.CASCADE)
    created = models.DateTimeField(editable=True)
    modified = models.DateTimeField()
    name = models.CharField(max_length=100)

    monsters = models.ManyToManyField('monster.Monsta', through='bindings.Binding', blank=True)
    full_party = models.BooleanField(default=False)

    class Meta:
        unique_together = ('user', 'name')

    def __str__(self):
        return self.name

    @property
    def selected_mons(self):
        return self.binding.filter(picked=True)

    @property
    def lifespan(self):
        return '%s' % self.created.strftime("{}, {} of {}, {}".format('%a', '%d', '%b', '%Y'))

    def save(self, *args, **kwargs):
        if not self.created:
            self.created = timezone.now()
        self.modified = timezone.now()
        if self.binding.filter(picked=True).count() == 3:
            self.full_party = True
        if self.binding.filter(picked=True).count() < 3:
            self.full_party = False
        if self.binding.count() != 7 and self.id:
            from monster.models import Monsta
            for mon in Monsta.objects.all():
                if mon not in self.monsters.all():
                    new_bind = Binding.objects.create(player=self, monster=mon)
                    new_bind.picked = self.binding.filter(picked=True).count() < 3
                    new_bind.save()
                    self.save()
        return super(Player, self).save(*args, **kwargs)


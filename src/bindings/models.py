from django.db import models


class Binding(models.Model):
    player = models.ForeignKey('players.Player', related_name="binding", on_delete=models.CASCADE)
    monster = models.ForeignKey('monster.Monsta', related_name="binding", on_delete=models.CASCADE)
    damageDealt = models.PositiveIntegerField(default=0)
    level = models.PositiveSmallIntegerField(default=5)
    picked = models.BooleanField(default=False)
    attacks = models.ManyToManyField('attacks.Attack')
    killed = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.player}'s {self.monster} "

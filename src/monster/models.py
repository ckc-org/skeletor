from django.db import models

# Create your models here.

FAMILY = (
    ('Normal', 'Normal'),
    ('Undead', 'Undead'),
    ('Beast', 'Beast'),
    ('Construct', 'Construct'),
    ('Dragon', 'Dragon'),
)

ELEMENT = (
    ('Air', 'Air'),
    ('Arcane', 'Arcane'),
    ('Earth', 'Earth'),
    ('Fire', 'Fire'),
    ('Dark', 'Dark'),
    ('Light', 'Light'),
    ('Omni', 'Omni'),
    ('Water', 'Water'),
)


class Monsta(models.Model):
    monsterName = models.CharField(max_length=50, blank=True, null=True)
    family = models.CharField(choices=FAMILY, max_length=30, blank=True, default=FAMILY[0])
    element = models.CharField(choices=ELEMENT, max_length=30, blank=True, default=ELEMENT[0])
    description = models.CharField(max_length=510, default='', blank=True)
    image = models.CharField(null=True, blank=True, max_length=300)

    def __str__(self):
        return self.monsterName

    @property
    def element_logo(self):
        return "/static/images/elements/" + self.element + ".png"

    def save(self, *args, **kwargs):
        if self.image is None:
            self.image = "/static/images/monsters/" + self.monsterName + "_ink.png"
        return super(Monsta, self).save(*args, **kwargs)


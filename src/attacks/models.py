from django.db import models

ELEMENT = (
    ('Arcane', 'Arcane'),
    ('Light', 'Light'),
    ('Air', 'Air'),
    ('Water', 'Water'),
    ('Fire', 'Fire'),
    ('Dark', 'Dark'),
    ('Earth', 'Earth'),
    ('Normal', 'Normal'),
)


class Attack(models.Model):
    name = models.CharField(max_length=20)
    description = models.CharField(max_length=100, blank=True, default="")
    image = models.CharField(null=True, blank=True, max_length=300)
    element = models.CharField(max_length=20)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if self.image is None and self.element is not None:
            self.image = "/static/images/elements/" + self.element + ".png"
        return super(Attack, self).save(*args, **kwargs)

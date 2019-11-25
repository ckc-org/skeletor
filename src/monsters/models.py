from django.db import models
from modelcluster.fields import ParentalKey
from wagtail.core.models import Page, Orderable
from wagtail.core.fields import RichTextField
from wagtail.admin.edit_handlers import FieldPanel, MultiFieldPanel, InlinePanel
from sorl.thumbnail import ImageField as ThumbField
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

class MonsterHomePage(Page):
    content_panels = Page.content_panels + [
        MultiFieldPanel([
            InlinePanel('monsters', label="Monsters", ),
        ],
            heading="Monsters",
            classname="collapsible collapsed",
        ),
    ]


class Monster(Orderable):
    page = ParentalKey(MonsterHomePage, on_delete=models.SET_NULL, null=True, related_name='monsters')

    monsterName = models.CharField(max_length=50)
    family = models.CharField(choices=FAMILY, max_length=30)
    element = models.CharField(choices=ELEMENT, max_length=30)
    image = ThumbField()
    description = RichTextField(default='')

    panels = [
        FieldPanel('monsterName'),
        FieldPanel('family'),
        FieldPanel('element'),
        FieldPanel('image'),
        FieldPanel('description'),
    ]


from django.core.management.base import BaseCommand
from django.db import IntegrityError

from users.models import User


class Command(BaseCommand):
    help = "Generate data"

    def handle(self, *args, **kwargs):

        # Create stuff here!

        try:
            User.objects.create_superuser('admin@admin.com', 'admin')
            print('Made admin user.')
        except IntegrityError:
            print('Admin user already exists!')

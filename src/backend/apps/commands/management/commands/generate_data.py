# from django.conf import settings
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.db import IntegrityError

from factories import DailyFactory

User = get_user_model()


class Command(BaseCommand):
    help = "Generate data"

    def handle(self, *args, **kwargs):

        # Create stuff here!

        try:
            admin = User.objects.create_superuser('admin@admin.com', 'admin')
            print('Made admin user.')

            yesterday_description = "- Reviewed emails and checked task management system for updates on project " \
                                    "tasks and priorities " \
                                    "- Attended a daily stand " \
                                    "- up meeting with the team to discuss progress, blockers, and plans for the day " \
                                    "Debugged and resolved an issue reported by a QA engineer, then pushed the fix " \
                                    "to thecode repository"

            DailyFactory(
                user=admin,
                today_description=yesterday_description,
                yesterday_description=yesterday_description,
            )
        except IntegrityError:
            print('Admin user already exists!')

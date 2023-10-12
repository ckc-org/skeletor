# celery

Celery is great for offloading long running tasks, scaling, and scheduled jobs.

## setup entrypoint

Make `src/backend/settings/celeryconf.py`

```py
import os

from celery import Celery


# Set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings.base')

app = Celery('ria_database')

# Using a string here means the worker doesn't have to serialize
# the configuration object to child processes.
# - namespace='CELERY' means all celery-related configuration keys
#   should have a `CELERY_` prefix.
app.config_from_object('django.conf:settings', namespace='CELERY')

# Load task modules from all registered Django apps.
app.autodiscover_tasks()
```

## settings

The `CELERY_*` settings should already be setup in `src/backend/settings/base.py`

Add this to `src/backend/settings/__init__.py`

```py
# This will make sure the app is always imported when
# Django starts so that shared_task will use this app.
from .celeryconf import app as celery_app

__all__ = ('celery_app',)
```

## requirements

Add this to `requirements.txt`

```
# Queues
celery==5.3.4
watchdog[watchmedo]==3.0.0
```

## docker compose

Add this to `docker-compose.yml`

```yaml
  workers:
    build:
      context: .
      dockerfile: docker/Dockerfile.backend
    command: watchmedo auto-restart --directory=/app --patterns="*.py" --recursive -- celery -A settings.celeryconf worker -l INFO -B
    env_file: .env
    volumes:
      - ./src/backend:/app
    logging: *default-logging
```

# defining a task

In `yourapp/tasks.py` make a task like so

```py
from settings import celery_app

@celery_app.task()
def task_add(a, b):
    return a + b
```

# scheduled jobs

Add this to the `CELERY` section in `src/backend/settings/base.py`

```py
from celery.schedules import crontab

CELERY_BEAT_SCHEDULE = {
    'example': {
        'task': 'example',
        'schedule': crontab(minute='*/15'),
    },
}
```

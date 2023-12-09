# /tmp/nginx.socket is where heroku nginx buildpack listens
web: bin/start-nginx gunicorn asgi:application --worker-class uvicorn.workers.UvicornWorker --bind unix:/tmp/nginx.socket --app-dir src/backend
release: ./manage.py migrate --pythonpath src/backend

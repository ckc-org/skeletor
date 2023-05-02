# /tmp/nginx.socket is where heroku nginx buildpack listens
web: bin/start-nginx-debug uvicorn asgi:application --uds /tmp/nginx.socket --app-dir src/backend
release: ./manage.py migrate --pythonpath src/backend

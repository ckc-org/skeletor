web: uvicorn asgi:application --host 0.0.0.0 --port $PORT --app-dir src/backend
release: ./manage.py migrate --pythonpath src/backend

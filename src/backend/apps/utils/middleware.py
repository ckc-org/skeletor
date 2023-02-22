import logging
from pprint import pformat


logger = logging.getLogger(__name__)


class RequestDataLoggingMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        # One-time configuration and initialization.

    def __call__(self, request):
        # Code to be executed for each request before
        # the view (and later middleware) are called.

        response = self.get_response(request)

        logger.info(f'request path: {request.path}')
        if request.path.startswith('/api'):
            if hasattr(request._stream, 'seek'):
                logger.info('request headers:')
                for h in request.headers:
                    logger.info(f'{h}: {request.headers[h]}')
                request._stream.seek(0)
                logger.info(request.read())
                logger.info(pformat(getattr(response, 'data', None)))

                logger.info('response headers:')
                for h in response.headers:
                    logger.info(f'{h}: {response.headers[h]}')

        return response

from django.middleware.common import CommonMiddleware
from django.conf import settings
from django.urls import is_valid_path


class CommonMiddlewareWithNuxtIndexRedirect(CommonMiddleware):
    def should_redirect_with_slash(self, request):
        """
        Return True if settings.APPEND_SLASH is True and appending a slash to
        the request path turns an invalid path into a valid one.

        Exclude our catch-all template view when deciding if a path matches our urlconf.
        """
        if settings.APPEND_SLASH and not request.path_info.endswith("/"):
            urlconf = getattr(request, "urlconf", 'urls.base')
            if not is_valid_path(request.path_info, urlconf):
                match = is_valid_path("%s/" % request.path_info, urlconf)
                if match:
                    view = match.func
                    return getattr(view, "should_append_slash", True)
        return False

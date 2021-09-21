from django.core.files.storage import get_storage_class


Storage = get_storage_class()


class PublicStorage(Storage):
    default_acl = "public-read"


class PrivateStorage(Storage):
    default_acl = "private"
    secure_urls = True
    querystring_auth = True

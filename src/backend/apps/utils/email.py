import logging
import os

from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.staticfiles.finders import find
from templated_email import send_templated_mail, InlineImage

from anymail.exceptions import AnymailRecipientsRefused


logger = logging.getLogger()
User = get_user_model()


def welcome(to: User):
    return _send_mail('welcome', [to.email])


def password_reset(to: User, uid, token):
    return _send_mail('password_reset', [to.email], uid=uid, token=token)


def _send_mail(template_name, to_emails, from_email=None, **kwargs):
    """
    Sends an email using a template (leveraging django-templated-email)

    If you need to attach extra images to the email, add them to kwargs
    prefixed with `IMAGE_`, like...
    
        _send_mail('welcome', [test@test.com], IMAGE_TEST="images/test.jpg"}
        
        {# and then in our template.. #}
        
        <img src="{{ IMAGE_TEST }}"/>

    :param template_name:
    :param to_emails:
    :param from_email:
    :param kwargs: additional context to insert into email template
    :return: email result
    """
    context = dict(**settings.DEFAULT_EMAIL_CONTEXT)
    if kwargs:  # pragma: no cover
        context.update(kwargs)

    # Turn static image paths into inline images in our template context
    for name, path in context.items():
        if name.startswith("IMAGE_"):
            # Currently only gets static files... maybe should rename IMAGE_ to STATIC_IMAGE_ ?
            with open(find(path), 'rb') as image:
                context[name] = InlineImage(
                    filename=os.path.basename(path),
                    content=image.read()
                )

    from_email = from_email if from_email is not None else settings.DEFAULT_FROM_EMAIL

    try:
        return send_templated_mail(
            template_name=template_name,
            from_email=from_email,
            recipient_list=to_emails,
            context=context,
        )
    except AnymailRecipientsRefused:  # pragma: no cover
        logger.exception(f'AnymailRecipientsRefused raised for {to_emails}')

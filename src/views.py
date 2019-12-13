from django.views.generic import TemplateView


class HomePageView(TemplateView):

    template_name = 'home_page.html'

from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import render
from rest_framework import viewsets

from api.serializers import BindingSerializer
from bindings.models import Binding


class MyBindingView(LoginRequiredMixin, viewsets.ModelViewSet):
    queryset = Binding.objects.all()
    serializer_class = BindingSerializer

    def list(self, request, *args, **kwargs):
        bindings = Binding.objects.all()
        return render(request, 'bindings/binding_list.html', context={'bindings': bindings})

    def retrieve(self, *args, **kwargs):
        binding = Binding.objects.get(pk=kwargs['pk'])
        return render(self.request, 'bindings/binding_detail.html', context={'binding': binding})

from django.shortcuts import render

# Create your views here.
from django.urls import reverse_lazy
from django.views.generic import ListView, CreateView, DeleteView, DetailView

from apps.imagens.models import MetaImagem


class MetaImagemListView(ListView):
    model = MetaImagem


class MetaImagemCreateView(CreateView):
    model = MetaImagem
    success_url = reverse_lazy('list_image')
    fields = '__all__'


class MetaImagemDeleteView(DeleteView):
    model = MetaImagem
    success_url = reverse_lazy('list_image')


class MetaImagemDetailView(DetailView):
    model = MetaImagem
    fields = '__all__'

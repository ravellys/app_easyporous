from django.shortcuts import render, redirect

# Create your views here.
from django.urls import reverse_lazy, reverse
from django.views.generic import ListView, CreateView, DeleteView, DetailView

from apps.imagens.models import MetaImagem


class MetaImagemListView(ListView):
    model = MetaImagem


class MetaImagemCreateView(CreateView):
    model = MetaImagem
    fields = ['descricao', 'tipo', ]
    success_url = reverse_lazy('list_image')

    def post(self, request, *args, **kwargs):
        data = request.POST
        user = request.user

        MetaImagem.objects.create(
            user=user,
            descricao=data['descricao'],
            tipo=data['tipo'],
        ).save()

        return redirect(reverse('list_image'))




class MetaImagemDeleteView(DeleteView):
    model = MetaImagem
    success_url = reverse_lazy('list_image')


class MetaImagemDetailView(DetailView):
    model = MetaImagem
    fields = '__all__'

from django.shortcuts import render, redirect

# Create your views here.
from django.urls import reverse_lazy, reverse
from django.views.generic import ListView, CreateView, DeleteView, DetailView

from apps.imagens.forms import MetaImagemForm
from apps.imagens.models import MetaImagem, Imagem


class MetaImagemListView(ListView):
    model = MetaImagem


class MetaImagemCreateView(CreateView):
    model = MetaImagem
    form_class = MetaImagemForm
    success_url = reverse_lazy('list_image')

    def post(self, request, *args, **kwargs):
        data = request.POST
        user = request.user
        files = request.FILES.getlist('imagens')
        print(request.FILES)

        MetaImagem.objects.create(
            user=user,
            descricao=data['descricao'],
            tipo=data['tipo'],
        ).save()

        meta_imagem = MetaImagem.all_objects.last()

        for file in files:
            Imagem.objects.create(
                descricao=str(file),
                meta_imagem=meta_imagem,
                imagem=file,
            ).save()

        return redirect(reverse('list_image'))



class MetaImagemDeleteView(DeleteView):
    model = MetaImagem
    success_url = reverse_lazy('list_image')


class MetaImagemDetailView(DetailView):
    model = MetaImagem
    fields = '__all__'

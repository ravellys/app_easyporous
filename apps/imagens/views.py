from PIL import Image
import numpy as np
from django.shortcuts import render, redirect

# Create your views here.
from django.urls import reverse_lazy, reverse
from django.views import View
from django.views.generic import ListView, CreateView, DeleteView, DetailView, TemplateView

from apps.imagens.dash_app.utilidades.import_imagem import seleciona_lista_arquivos, import_file, porosidade
from apps.imagens.forms import MetaImagemForm, SegmentacaoForm
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


class MetaImagemTemplateView(TemplateView):
    template_name = 'imagens/imagens_detail.html'


class SegmentacaoView(CreateView):
    model = MetaImagem
    form_class = SegmentacaoForm
    success_url = reverse_lazy('list_image')
    template_name = 'imagens/segmentacao_form.html'

    def post(self, request, *args, **kwargs):
        data = request.POST
        user = request.user
        meta_imagem = MetaImagem.objects.get(id=data['meta_imagem'])


        # TODO: refatorar
        meta_imagem_id = int(data['meta_imagem'])
        list_imagens = seleciona_lista_arquivos(meta_imagem_id)
        from skimage.filters import threshold_otsu
        im = import_file(list_imagens)
        thresh = threshold_otsu(im.ravel())  # Determina limiar de poros e solidos
        im_seg = im > thresh

        MetaImagem.objects.create(
            user=user,
            descricao=meta_imagem.descricao + ', segmentada por ' + data['metodo_segmentacao'],
            tipo=meta_imagem.tipo,
            is_segmentada=True,
            porosidade=porosidade(im_seg)

        ).save()

        for img, file in zip(im_seg, list_imagens):
            img = Image.fromarray(img.astype(np.uint8))
            img.save(".".join(file.split('.')[:-1]) + f'seg_{data["metodo_segmentacao"]}.tif')

        meta_imagem_seg = MetaImagem.all_objects.last()
        for file in list_imagens:
            file_seg = ".".join(file.split('.')[:-1]) + f'seg_{data["metodo_segmentacao"]}.tif'
            Imagem.objects.create(
                descricao=str(file)+f'_seg_{data["metodo_segmentacao"]}',
                meta_imagem=meta_imagem_seg,
                imagem=file_seg,
            ).save()

        return redirect(reverse('list_image'))

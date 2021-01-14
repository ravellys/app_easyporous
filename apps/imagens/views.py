from django.shortcuts import redirect

# Create your views here.
from django.urls import reverse_lazy, reverse
from django.views.generic import ListView, CreateView, DeleteView, DetailView, TemplateView

from apps.imagens.dash_app.utilidades.import_imagem import seleciona_lista_arquivos
from apps.imagens.forms import MetaImagemForm, SegmentacaoForm
from apps.imagens.models import MetaImagem, Imagem
from apps.imagens.utilidades.PID import salvar_imagens_segmentadas, cria_meta_imagem_segmentada
from apps.imagens.utilidades.segmentacao import segmenta_imagem


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
        meta_imagem_id = int(data['meta_imagem'])
        metodo_segmentacao = data['metodo_segmentacao']

        meta_imagem = MetaImagem.objects.get(id=meta_imagem_id)
        list_imagens = seleciona_lista_arquivos(meta_imagem_id)
        im_seg = segmenta_imagem(list_imagens, metodo_segmentacao)
        meta_imagem_seg = cria_meta_imagem_segmentada(user, meta_imagem, metodo_segmentacao, im_seg)
        salvar_imagens_segmentadas(metodo_segmentacao, im_seg, list_imagens, meta_imagem_seg)

        return redirect(reverse('list_image'))

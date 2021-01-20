from django.http import JsonResponse
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from apps.imagens.api.serializers import MetaImagemSerializer
from apps.imagens.dash_app.utilidades.import_imagem import seleciona_lista_arquivos, import_file
from apps.imagens.models import MetaImagem, Imagem
from apps.imagens.utilidades.segmentacao import segmenta_imagem
import porespy as ps

class MetaImagemViewSet(viewsets.ModelViewSet):
    queryset = MetaImagem.objects.all()
    serializer_class = MetaImagemSerializer


def api_images(request, pk):
    host = request.build_absolute_uri().split('/')[2]
    imagens = Imagem.objects.filter(meta_imagem=int(pk))
    response = dict(data=[f'http://{host}{im.imagem.url}' for i, im in enumerate(imagens)])
    print(response, request.build_absolute_uri())
    return JsonResponse(response)


def api_VER(request, pk):
    list_imagens = seleciona_lista_arquivos(int(pk))
    im = import_file(list_imagens)
    rev = ps.metrics.representative_elementary_volume(im, npoints=100)
    dados = [[v**(1/3), p] for v, p in zip(rev.volume.tolist(), rev.porosity.tolist())]
    return JsonResponse({'dados': dados})

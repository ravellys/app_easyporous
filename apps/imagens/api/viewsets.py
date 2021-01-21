from django.http import JsonResponse
from rest_framework import viewsets

from apps.imagens.api.serializers import MetaImagemSerializer
from apps.imagens.models import MetaImagem, Imagem


class MetaImagemViewSet(viewsets.ModelViewSet):
    queryset = MetaImagem.objects.all()
    serializer_class = MetaImagemSerializer


def api_images(request, pk):
    host = request.build_absolute_uri().split('/')[2]
    imagens = Imagem.objects.filter(meta_imagem=int(pk))
    response = dict(data=[f'http://{host}{im.imagem.url}' for i, im in enumerate(imagens)])
    print(response, request.build_absolute_uri())
    return JsonResponse(response)



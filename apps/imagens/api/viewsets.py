from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from apps.imagens.api.serializers import MetaImagemSerializer
from apps.imagens.models import MetaImagem


class MetaImagemViewSet(viewsets.ModelViewSet):
    queryset = MetaImagem.objects.all()
    serializer_class = MetaImagemSerializer


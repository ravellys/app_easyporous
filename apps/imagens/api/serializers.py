from rest_framework import serializers
from apps.imagens.models import MetaImagem


class MetaImagemSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = MetaImagem
        fields = ('pk', 'descricao', 'is_segmentada', 'tipo', 'created', 'porosidade')

from rest_framework import serializers
from apps.imagens.models import MetaImagem


class MetaImagemSerializer(serializers.HyperlinkedModelSerializer):
    url_delete = serializers.HyperlinkedIdentityField(view_name='delete_image', lookup_field='pk')
    url_detail = serializers.HyperlinkedIdentityField(view_name='detail_image', lookup_field='pk')

    class Meta:
        model = MetaImagem
        fields = ('pk', 'url', 'descricao', 'is_segmentada', 'tipo', 'created', 'porosidade', 'url_delete', 'url_detail')

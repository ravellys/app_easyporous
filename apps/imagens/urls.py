from django.contrib.auth.decorators import login_required
from django.urls import path

from apps.imagens.api.viewsets import api_images
from apps.imagens.views import MetaImagemListView, MetaImagemCreateView, MetaImagemDeleteView, MetaImagemDetailView, \
    MetaImagemTemplateView, SegmentacaoView

try:
    from apps.imagens.dash_app import exemplo
    from apps.imagens.dash_app import plot_image
except:
    pass

urlpatterns = [
    path('listar/', login_required(MetaImagemListView.as_view()), name='list_image'),
    path('upload/', login_required(MetaImagemCreateView.as_view()), name='create_image'),
    path('deletar/<int:pk>', login_required(MetaImagemDeleteView.as_view()), name='delete_image'),
    path('detalhes/<int:pk>', login_required(MetaImagemDetailView.as_view()), name='detail_image'),
    path('detalhes/', login_required(MetaImagemTemplateView.as_view()), name='detail_images'),
    path('segmentacao/', login_required(SegmentacaoView.as_view()), name='segmentacao_image'),

    path('api/<int:pk>', login_required(api_images), name='api_image'),
]

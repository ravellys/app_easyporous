from django.contrib.auth.decorators import login_required
from django.urls import path

from apps.imagens.views import MetaImagemListView, MetaImagemCreateView, MetaImagemDeleteView, MetaImagemDetailView, \
    MetaImagemTemplateView, SegmentacaoView

try:
    from apps.imagens.dash_app import exemplo
    from apps.imagens.dash_app import plot_image
except:
    pass

urlpatterns = [
    path('listar/', MetaImagemListView.as_view(), name='list_image'),
    path('upload/', MetaImagemCreateView.as_view(), name='create_image'),
    path('deletar/<int:pk>', MetaImagemDeleteView.as_view(), name='delete_image'),
    path('detalhes/<int:pk>', MetaImagemDetailView.as_view(), name='detail_image'),
    path('detalhes/', MetaImagemTemplateView.as_view(), name='detail_images'),
    path('segmentacao/', SegmentacaoView.as_view(), name='segmentacao_image'),
]

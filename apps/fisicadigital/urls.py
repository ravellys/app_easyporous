from django.contrib.auth.decorators import login_required
from django.urls import path
from apps.fisicadigital.views import api_VER, api_permeabilidade, VERTemplateView, PermeabilidadeTemplateView, \
    api_curvaretencao, CurvaRetencaoTemplateView, api_perfil_porosidade, PerfilPorosidadeTemplateView

urlpatterns = [
    path('api/VER/<int:pk>', login_required(api_VER), name='api_VER'),
    path('api/permeabilidade/<int:pk>', login_required(api_permeabilidade), name='api_permeabilidade'),
    path('api/curva-retencao/<int:pk>', login_required(api_curvaretencao), name='api_curvaretencao'),
    path('api/perfil-porosidade/<int:pk>', login_required(api_perfil_porosidade), name='api_perfil_porosidade'),

    path('VER/', login_required(VERTemplateView.as_view()), name='VER_image'),
    path('permeabilidade/', login_required(PermeabilidadeTemplateView.as_view()), name='permeabilidade_image'),
    path('curva-retencao/', login_required(CurvaRetencaoTemplateView.as_view()), name='curva_retencao_image'),
    path('perfil-porosidade/', login_required(PerfilPorosidadeTemplateView.as_view()), name='perfil_porosidade_image'),
]

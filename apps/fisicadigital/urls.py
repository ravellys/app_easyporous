from django.contrib.auth.decorators import login_required
from django.urls import path
from apps.fisicadigital.views import api_VER, api_permeabilidade, VERTemplateView, PermeabilidadeTemplateView

urlpatterns = [
    path('api/VER/<int:pk>', api_VER, name='api_VER'),
    path('api/permeabilidade/<int:pk>', api_permeabilidade, name='api_permeabilidade'),

    path('VER/', VERTemplateView.as_view(), name='VER_image'),
    path('permeabilidade/', PermeabilidadeTemplateView.as_view(), name='permeabilidade_image')
]

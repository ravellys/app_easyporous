from django.contrib.auth.decorators import login_required
from django.urls import path
from apps.fisicadigital.views import api_VER, api_permeabilidade

urlpatterns = [
    path('api/VER/<int:pk>', api_VER, name='api_VER'),
    path('api/permeabilidade/<int:pk>', api_permeabilidade, name='api_permeabilidade'),
]

"""project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from apps.imagens.api.viewsets import MetaImagemViewSet

router = routers.DefaultRouter()
router.register(r'api/metaimagem', MetaImagemViewSet)

urlpatterns = [
                  path('admin/', admin.site.urls),
                  path('', include('apps.dashboard.urls')),
                  path('usuário/', include("apps.user.urls")),
                  path('imagens/', include("apps.imagens.urls")),
                  path('fisicadigital/', include("apps.fisicadigital.urls")),

                  path('', include('django.contrib.auth.urls')),
                  path('django_plotly_dash/', include('django_plotly_dash.urls')),
                  path('', include(router.urls)),
              ] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) + \
              static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

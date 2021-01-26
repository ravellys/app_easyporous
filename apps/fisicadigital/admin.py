from django.contrib import admin

# Register your models here.
from apps.fisicadigital.models import VER, CurvaRetencao, Permeabilidade, PerfilPorosidade

admin.site.register(VER)
admin.site.register(CurvaRetencao)
admin.site.register(Permeabilidade)
admin.site.register(PerfilPorosidade)

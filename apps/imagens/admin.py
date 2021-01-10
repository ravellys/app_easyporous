from django.contrib import admin

# Register your models here.
from apps.imagens.models import MetaImagem, Imagem

admin.site.register(MetaImagem)
admin.site.register(Imagem)
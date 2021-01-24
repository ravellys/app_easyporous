import jsonfield
from django.db import models

# Create your models here.
from apps.best_pratices_model.models import BestPraticesModel
from apps.imagens.models import MetaImagem


class VER(BestPraticesModel):
    meta_imagem = models.ForeignKey(MetaImagem, on_delete=models.PROTECT, verbose_name='meta_imagem')
    data_ver = jsonfield.JSONField()


class Permeabilidade(BestPraticesModel):
    meta_imagem = models.ForeignKey(MetaImagem, on_delete=models.PROTECT, verbose_name='meta_imagem')
    permeabilidade = models.DecimalField(max_digits=8, decimal_places=2)

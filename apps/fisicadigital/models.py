import jsonfield
from django.db import models

# Create your models here.
from apps.best_pratices_model.models import BestPraticesModel
from apps.imagens.models import MetaImagem


class VER(BestPraticesModel):
    meta_imagem = models.ForeignKey(MetaImagem, on_delete=models.PROTECT, verbose_name='meta_imagem')
    data_ver = jsonfield.JSONField()

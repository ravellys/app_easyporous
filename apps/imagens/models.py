import uuid
from django.db import models
from apps.best_pratices_model.models import BestPraticesModel
from apps.user.models import User


class MetaImagem(BestPraticesModel):
    tipos_imagens = (
        ('Solo', 'Solo'),
        ('Rocha', 'Rocha'),
    )

    user = models.ForeignKey(User, on_delete=models.PROTECT, verbose_name='usuário')
    protocolo = models.UUIDField(auto_created=True, unique=True, default=uuid.uuid4,
                                             verbose_name='Protocolo')
    descricao = models.CharField(max_length=100, verbose_name='Descricao', null=True, blank=True)
    tipo = models.CharField(max_length=24, choices=tipos_imagens, null=True, blank=True,
                            verbose_name='Tipo de Imagem')

    def __str__(self):
        return self.descricao


class Imagem(BestPraticesModel):
    descricao = models.CharField(max_length=100, verbose_name='Descricao', null=True, blank=True)
    meta_imagem = models.ForeignKey(MetaImagem, on_delete=models.PROTECT, verbose_name='meta_imagem')
    imagem = models.FileField(verbose_name='Imagem')

    def __str__(self):
        return self.descricao





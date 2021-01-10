from django import forms
from apps.imagens.models import MetaImagem


class MetaImagemForm(forms.ModelForm):
    class Meta:
        model = MetaImagem
        fields = ['descricao', 'tipo', ]



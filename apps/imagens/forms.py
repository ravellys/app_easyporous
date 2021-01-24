from django import forms
from apps.imagens.models import MetaImagem
from apps.imagens.utilidades.segmentacao import CHOICES_SEGMENTACAO

tipos_imagens = [
    ('Solo', 'Solo'),
    ('Rocha', 'Rocha'),
]


class MetaImagemForm(forms.ModelForm):
    descricao = forms.CharField(max_length=100)
    tipo = forms.ChoiceField(
        required=True,
        widget=forms.Select,
        choices=tipos_imagens,
    )
    imagens = forms.ImageField(widget=forms.ClearableFileInput(attrs={'multiple': True}))

    class Meta:
        model = MetaImagem
        fields = ['descricao', 'tipo', 'resolucao']


class SegmentacaoForm(forms.ModelForm):
    meta_imagem = forms.ModelChoiceField(
        queryset=MetaImagem.objects.filter(is_segmentada=False),
        required=True,
        widget=forms.Select,
    )
    metodo_segmentacao = forms.ChoiceField(
        required=True,
        widget=forms.Select,
        choices=CHOICES_SEGMENTACAO,
    )

    class Meta:
        model = MetaImagem
        fields = ['meta_imagem', 'metodo_segmentacao', ]

from django import forms
from apps.imagens.models import MetaImagem

tipos_imagens = [
    ('Solo', 'Solo'),
    ('Rocha', 'Rocha'),
]

try:
    selector_meta_imagens = [(img.id, img) for img in MetaImagem.objects.all()]
except:
    selector_meta_imagens = [('', '')]

selector_segmentacao = [
    ('otsu', 'Otsu'),
    ('mean', 'Média')
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
        fields = ['descricao', 'tipo']


class SegmentacaoForm(forms.ModelForm):
    meta_imagem = forms.ChoiceField(
        required=True,
        widget=forms.Select,
        choices=selector_meta_imagens,
    )
    metodo_segmentacao = forms.ChoiceField(
        required=True,
        widget=forms.Select,
        choices=selector_segmentacao,
    )

    class Meta:
        model = MetaImagem
        fields = ['meta_imagem', 'metodo_segmentacao', ]

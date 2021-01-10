from django import forms
from apps.imagens.models import MetaImagem

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
        fields = ['descricao', 'tipo']


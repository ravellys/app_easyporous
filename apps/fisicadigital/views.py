import json

import porespy as ps
from django.http import JsonResponse

from apps.fisicadigital.models import VER
from apps.imagens.dash_app.utilidades.import_imagem import seleciona_lista_arquivos, import_file
from apps.imagens.models import MetaImagem


def api_VER(request, pk):
    try:
        ver = VER.objects.get(meta_imagem=int(pk))
        data_dict = json.loads(ver.data_ver)
        print('objeto existe')
        return JsonResponse(data_dict)
    except:
        list_imagens = seleciona_lista_arquivos(int(pk))
        im = import_file(list_imagens)
        rev = ps.metrics.representative_elementary_volume(im, npoints=1000)
        dados = [[v**(1/3), p] for v, p in zip(rev.volume.tolist(), rev.porosity.tolist())]
        dados_json = json.dumps({'dados': dados})
        meta_imagem = MetaImagem.objects.get(id=int(pk))
        VER.objects.create(meta_imagem=meta_imagem, data_ver=dados_json)
        print('objeto não existe')
        return JsonResponse({'dados': dados})

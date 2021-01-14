from PIL import Image
import numpy as np

from apps.imagens.dash_app.utilidades.import_imagem import porosidade
from apps.imagens.models import Imagem, MetaImagem


def salvar_imagens_segmentadas(metodo_segmentacao, im_seg, list_imagens, meta_imagem_seg):
    for img, file in zip(im_seg, list_imagens):
        img = Image.fromarray(img.astype(np.uint8))
        img.save(".".join(file.split('.')[:-1]) + f'seg_{metodo_segmentacao}.tif')
        file_seg = ".".join(file.split('.')[:-1]) + f'seg_{metodo_segmentacao}.tif'
        Imagem.objects.create(
            descricao=str(file) + f'_seg_{metodo_segmentacao}',
            meta_imagem=meta_imagem_seg,
            imagem=file_seg,
        ).save()


def cria_meta_imagem_segmentada(user, meta_imagem, metodo_segmentacao, im_seg):
    meta_imagem_seg = MetaImagem.objects.create(
        user=user,
        descricao=meta_imagem.descricao + ', segmentada por ' + metodo_segmentacao,
        tipo=meta_imagem.tipo,
        is_segmentada=True,
        porosidade=porosidade(im_seg)
    )
    meta_imagem_seg.save()
    return meta_imagem_seg

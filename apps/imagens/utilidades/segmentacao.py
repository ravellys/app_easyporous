
import skimage as sk
from skimage.filters import threshold_otsu, threshold_isodata, threshold_li, threshold_mean

from apps.imagens.dash_app.utilidades.import_imagem import import_file

METODOS_SEGMENTACAO = dict(
                 otsu={'nome': 'Otsu', 'metodo': threshold_otsu},
                 isodata={'nome': 'Isodata', 'metodo': threshold_isodata},
                 li={'nome': 'Li', 'metodo': threshold_li},
                 mean={'nome': 'Média', 'metodo': threshold_mean},
                 )
CHOICES_SEGMENTACAO = [(metodo, METODOS_SEGMENTACAO[metodo]['nome']) for metodo in list(METODOS_SEGMENTACAO.keys())]


def calcula_threshold(im, metodo_segmentacao):
    metodo = METODOS_SEGMENTACAO[metodo_segmentacao]['metodo']
    thresh = metodo(im.ravel())  # Determina limiar de poros e solidos
    return thresh


def segmenta_imagem(list_imagens, metodo_segmentacao):
    im = import_file(list_imagens)
    thresh = calcula_threshold(im, metodo_segmentacao)
    im_seg = im <= thresh
    return im_seg


if __name__ == '__main__':
    selector_segmentacao = [
        ('otsu', 'Otsu'),
        ('mean', 'Média')
    ]

    print(METODOS_SEGMENTACAO.keys())
    print(CHOICES_SEGMENTACAO)

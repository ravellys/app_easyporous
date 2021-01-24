import os
import django
# estou considerando que o nome do projeto (e não o app!) seja "helpdesk"
from skimage import io

os.environ['DJANGO_SETTINGS_MODULE'] = 'project.settings'
django.setup()

import numpy as np
import imageio
from apps.imagens.models import Imagem


def import_file(list_files):
    im = []  # inicialização do vetor de armazenamento

    for file in list_files:
        fetch_file = os.path.join(file)
        image = np.array(io.imread(fetch_file, as_gray=True))  # importa imagem e converte em numpy
        im.append(image.T)  # Adiciona matriz numpy ao vetor de armazenameto

    im = np.array(im)
    return im[:, :, :]


def seleciona_lista_arquivos(meta_imagem_id):
    imagens = Imagem.objects.filter(meta_imagem=int(meta_imagem_id))
    lista_caminhos = [img.imagem.path for img in imagens]
    return lista_caminhos


def porosidade(im):
    return im.sum() / (im.shape[0] * im.shape[1] * im.shape[2])


if __name__ == '__main__':

    print(porosidade(30))

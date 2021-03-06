import json
import openpnm as op
import porespy as ps
import numpy as np
from django.http import JsonResponse
from django.views.generic import TemplateView

from apps.fisicadigital.models import VER, Permeabilidade, CurvaRetencao, PerfilPorosidade
from apps.imagens.dash_app.utilidades.import_imagem import seleciona_lista_arquivos, import_file
from apps.imagens.models import MetaImagem


def api_VER(request, pk):
    try:
        ver = VER.objects.get(meta_imagem=int(pk))
        data_dict = json.loads(ver.data_ver)
        return JsonResponse(data_dict)
    except:
        list_imagens = seleciona_lista_arquivos(int(pk))
        im = import_file(list_imagens)
        rev = ps.metrics.representative_elementary_volume(im, npoints=1000)
        dados = [[v**(1/3), p] for v, p in zip(rev.volume.tolist(), rev.porosity.tolist())]
        dados_json = json.dumps({'dados': dados})
        meta_imagem = MetaImagem.objects.get(id=int(pk))
        VER.objects.create(meta_imagem=meta_imagem, data_ver=dados_json).save()
        return JsonResponse({'dados': dados})


def api_permeabilidade(request, pk):
    try:
        permeabilidade = Permeabilidade.objects.get(meta_imagem=int(pk))
        return JsonResponse({'dados': permeabilidade.permeabilidade})
    except:
        list_imagens = seleciona_lista_arquivos(int(pk))
        im = import_file(list_imagens)
        meta_imagem = MetaImagem.objects.get(id=int(pk))

        resolution = float(meta_imagem.resolucao) * 10**-6  # resolução que a amostra foi escaneada
        net = ps.networks.snow_n(im=im, voxel_size=resolution)
        proj = op.Project()
        file_name = meta_imagem.descricao

        pn = op.network.GenericNetwork(name=file_name, project=proj)  # Esta classe genérica contém a principal funcionalidade usada por todas as redes
        pn.update(net)  # Preenche 'pn' com dados de 'net'

        h = pn.check_network_health()
        op.topotools.trim(network=pn, pores=h['trim_pores'])

        pn.add_model(propname='throat.endpoints', model=op.models.geometry.throat_endpoints.spherical_pores)
        pn.add_model(propname='throat.conduit_lengths', model=op.models.geometry.throat_length.conduit_lengths)
        pn.add_model(propname='pore.area', model=op.models.geometry.pore_surface_area.sphere)

        mercurio = op.phases.Mercury(network=pn)  # cria fase de mercurio (geralmente usado em experimentos de porosimetria)
        geo = op.geometry.GenericGeometry(network=pn, pores=pn.Ps, throats=pn.Ts)
        phys_mercurio = op.physics.Standard(network=pn, phase=mercurio, geometry=geo)  # atribui a física do modelo
        phys_mercurio.add_model(propname='throat.hydraulic_conductance', model=op.models.physics.hydraulic_conductance.hagen_poiseuille)

        # Algoritmo de simulação
        perm = op.algorithms.StokesFlow(network=pn, project=proj)
        perm.setup(phase=mercurio)

        # Condições de contorno
        pTop = 10
        pBottom = 0

        perm.set_value_BC(pores=pn.pores('top'), values=pTop)  # pressão no top
        perm.set_value_BC(pores=pn.pores('bottom'), values=pBottom)  # pressão na base
        perm.run()
        mercurio.update(perm.results())

        Q = perm.rate(pores=pn.pores('bottom'), mode='group')
        A = (im.shape[0] * im.shape[1]) * resolution ** 2
        L = im.shape[2] * resolution
        mu = mercurio['pore.viscosity'].max()
        delta_P = pBottom - pTop
        K = (Q * L * mu / (A * delta_P))/0.98e-12*1000
        Permeabilidade.objects.create(meta_imagem=meta_imagem, permeabilidade=K[0]).save()

        return JsonResponse({'permeability': K[0]})


def api_curvaretencao(request, pk):
    try:
        cr = CurvaRetencao.objects.get(meta_imagem=int(pk))
        data_dict = json.loads(cr.data_curvaretencao)
        return JsonResponse(data_dict)
    except:
        list_imagens = seleciona_lista_arquivos(int(pk))
        im = import_file(list_imagens)
        meta_imagem = MetaImagem.objects.get(id=int(pk))
        resolution = float(meta_imagem.resolucao) * 10 ** -6  # resolução que a amostra foi escaneada

        mip = ps.filters.porosimetry(im, sizes=25)
        data = ps.metrics.pore_size_distribution(mip, bins=10, log=True, voxel_size=resolution)
        dados = [[r, s] for r, s in zip(data.logR, data.satn)]
        dados_json = json.dumps({'curva_retencao': dados})
        CurvaRetencao.objects.create(meta_imagem=meta_imagem, data_curvaretencao=dados_json).save()
        return JsonResponse({'curva_retencao': dados})


def api_perfil_porosidade(request, pk):
    try:
        pp = PerfilPorosidade.objects.get(meta_imagem=int(pk))
        data_dict = json.loads(pp.data_perfilporosidade)
        return JsonResponse(data_dict)
    except:
        list_imagens = seleciona_lista_arquivos(int(pk))
        im = import_file(list_imagens)
        meta_imagem = MetaImagem.objects.get(id=int(pk))

        dados = [[i.sum()/np.prod(i.shape), pos] for pos, i in enumerate(im.T)]
        dados_json = json.dumps({'perfil_porosidade': dados})
        PerfilPorosidade.objects.create(meta_imagem=meta_imagem, data_perfilporosidade=dados_json).save()
        return JsonResponse({'perfil_porosidade': dados})


class VERTemplateView(TemplateView):
    template_name = 'fisicadigital/fisicadigital_VER.html'


class PermeabilidadeTemplateView(TemplateView):
    template_name = 'fisicadigital/fisicadigital_permeabilidade.html'


class CurvaRetencaoTemplateView(TemplateView):
    template_name = 'fisicadigital/fisicadigital_curva_retencao.html'


class PerfilPorosidadeTemplateView(TemplateView):
    template_name = 'fisicadigital/fisicadigital_perfil_porosidade.html'

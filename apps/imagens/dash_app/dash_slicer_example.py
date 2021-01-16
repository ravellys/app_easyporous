import dash
import dash_html_components as html
import imageio
from dash_slicer import VolumeSlicer

from apps.imagens.dash_app.utilidades.import_imagem import seleciona_lista_arquivos, import_file

app = dash.Dash(__name__, update_title=None)

list_imagens = seleciona_lista_arquivos(38)
im = import_file(list_imagens)
slicer = VolumeSlicer(app, im)
app.layout = html.Div([slicer.graph, slicer.slider, *slicer.stores])


if __name__ == "__main__":
    app.run_server(debug=True, dev_tools_props_check=False)
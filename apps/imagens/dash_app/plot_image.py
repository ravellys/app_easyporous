import plotly.express as px
import dash
import dash_core_components as dcc
import dash_html_components as html
from dash.dependencies import Input, Output
from django_plotly_dash import DjangoDash
from skimage import data
import json

from apps.imagens.dash_app.utilidades.import_imagem import seleciona_lista_arquivos, import_file
from apps.imagens.models import MetaImagem

img = data.camera()
fig = px.imshow(img, binary_string=True)
fig.update_layout(dragmode="drawrect")
fig_hist = px.histogram(img.ravel())

options = [{'label': obj.descricao, 'value': obj.id} for obj in MetaImagem.objects.all()]

# Build App
external_stylesheets = ['https://codepen.io/chriddyp/pen/bWLwgP.css']
app = DjangoDash('Imagem', external_stylesheets=external_stylesheets)
app.layout = html.Div(
    [
        html.H3("Selecione a imagem"),
        dcc.Dropdown(
            id='dropdown',
            options=options,
            value=options[0]['value'],
        ),
        html.Div(
            [dcc.Graph(id="imagem"), ],
            style={"width": "60%", "display": "inline-block", "padding": "0 0"},
        ),
        html.Div(
            [dcc.Graph(id="histogram"), ],
            style={"width": "40%", "display": "inline-block", "padding": "0 0"},
        ),
        dcc.Slider(
            id='pos-img-slider',
            value=0,
            step=1,
            marks={i: f'{i}' for i in range(20)},
            updatemode='drag',
        ),

    ]
)


@app.callback(
    Output('pos-img-slider', 'marks'),
    [Input('dropdown', 'value')],
)
def update_slider_marks(meta_image_id):
    list_imagens = seleciona_lista_arquivos(meta_image_id)
    tamanho = len(list_imagens)
    marks = {i: f'{i}' for i in range(tamanho)},
    return marks


@app.callback(
    Output('imagem', 'figure'),
    [Input('pos-img-slider', 'value')],
    [Input('dropdown', 'value')],
)
def update_figure(pos, meta_image_id):
    list_imagens = seleciona_lista_arquivos(meta_image_id)
    im = import_file(list_imagens)
    img = im[pos]
    fig = px.imshow(img, binary_string=True)
    return fig


@app.callback(
    Output('histogram', 'figure'),
    [Input('pos-img-slider', 'value')],
    [Input('dropdown', 'value')],
)
def update_histogram(pos, meta_image_id):
    list_imagens = seleciona_lista_arquivos(meta_image_id)
    im = import_file(list_imagens)
    img = im[pos][0]
    fig_hist = px.histogram(img.ravel())
    return fig_hist


if __name__ == "__main__":
    app.run_server(debug=True)

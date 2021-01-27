# Generated by Django 3.1.5 on 2021-01-26 01:40

from django.db import migrations, models
import django.db.models.deletion
import jsonfield.fields


class Migration(migrations.Migration):

    dependencies = [
        ('imagens', '0005_metaimagem_resolucao'),
        ('fisicadigital', '0002_permeabilidade'),
    ]

    operations = [
        migrations.CreateModel(
            name='CurvaRetencao',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_removed', models.BooleanField(default=False)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('modified', models.DateTimeField(auto_now=True)),
                ('data_curvaretencao', jsonfield.fields.JSONField(default=dict)),
                ('meta_imagem', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='imagens.metaimagem', verbose_name='meta_imagem')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]

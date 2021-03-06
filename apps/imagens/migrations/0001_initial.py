# Generated by Django 3.1.5 on 2021-01-10 17:57

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='MetaImagem',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('protocolo', models.UUIDField(auto_created=True, default=uuid.uuid4, unique=True, verbose_name='Protocolo')),
                ('is_removed', models.BooleanField(default=False)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('modified', models.DateTimeField(auto_now=True)),
                ('descricao', models.CharField(blank=True, max_length=100, null=True, verbose_name='Descricao')),
                ('tipo', models.CharField(blank=True, choices=[('Solo', 'Solo'), ('Rocha', 'Rocha')], max_length=24, null=True, verbose_name='Tipo de Imagem')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL, verbose_name='usuário')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Imagem',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_removed', models.BooleanField(default=False)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('modified', models.DateTimeField(auto_now=True)),
                ('descricao', models.CharField(blank=True, max_length=100, null=True, verbose_name='Descricao')),
                ('imagem', models.FileField(upload_to='', verbose_name='Imagem')),
                ('meta_imagem', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='imagens.metaimagem', verbose_name='meta_imagem')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]

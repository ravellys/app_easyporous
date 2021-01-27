# Generated by Django 3.1.5 on 2021-01-23 18:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('imagens', '0004_metaimagem_porosidade'),
    ]

    operations = [
        migrations.AddField(
            model_name='metaimagem',
            name='resolucao',
            field=models.DecimalField(decimal_places=2, default=50, max_digits=4, verbose_name='resolução em que a imagem foi escaneada em micrômetros'),
            preserve_default=False,
        ),
    ]

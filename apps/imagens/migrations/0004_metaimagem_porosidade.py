# Generated by Django 3.1.5 on 2021-01-13 01:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('imagens', '0003_metaimagem_is_segmentada'),
    ]

    operations = [
        migrations.AddField(
            model_name='metaimagem',
            name='porosidade',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=8, null=True, verbose_name='porosidade'),
        ),
    ]

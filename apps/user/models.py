from django.db import models
from django.contrib.auth.models import AbstractUser, Group
from django.urls import reverse


class User(AbstractUser):
    tipos_usuarios = (
        ('Administrador', 'Administrador'),
        ('Cliente', 'Cliente'),
    )

    full_name = models.CharField(max_length=100, verbose_name='Nome completo')
    email = models.EmailField(verbose_name="E-mail", unique=True)
    user_type = models.CharField(max_length=24, choices=tipos_usuarios, null=True, blank=True,
                                 verbose_name='Tipo de usuário')

    def save(self, *args, **kwargs):

        # Garante que sempre exista um tipo de usuário quando criado o objeto em questão
        if not self.user_type and not self.is_superuser:
            self.user_type = 'Cliente'
        elif self.is_superuser and not self.user_type:
            self.user_type = 'Administrador'

        # Verifica se o tipo atribuido ao usuário é administrador se sim atribui as caracteristicas
        if self.user_type == 'Administrador':
            self.is_superuser = True
            self.is_staff = True
        else:
            self.is_superuser = False
            self.is_staff = False

        # salva o usuário
        super(User, self).save(*args, **kwargs)

        # verifica se o usuário esta sendo salvo ou editado e se existe parametro tipo_usuario
        if self.user_type:
            if not Group.objects.filter(name=self.user_type).exists():
                Group.objects.create(name=self.user_type)
            # garante que não haja acumulo de grupos para o usuário
            self.groups.clear()
            grupo = Group.objects.get(name=self.user_type)
            self.groups.add(grupo)

    def __str__(self):
        return self.email
    #
    # def get_absolute_url(self):
    #     return reverse('list_user')

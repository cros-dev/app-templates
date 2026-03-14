"""
Comando de management para criar um usuário administrador a partir do .env.

Lê as variáveis DJANGO_SUPERUSER_USERNAME, DJANGO_SUPERUSER_EMAIL e
DJANGO_SUPERUSER_PASSWORD (carregadas pelo settings a partir do .env).
Se as três estiverem definidas, cria um superusuário (is_staff=True, is_superuser=True)
caso ainda não exista. Usado tanto no Docker (entrypoint) quanto em execução nativa.

Uso:
    Defina as três variáveis no .env (veja .env.example) e execute:
    python manage.py create_admin_user
"""

import os

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand

User = get_user_model()


class Command(BaseCommand):
    help = (
        "Cria superusuário com credenciais de DJANGO_SUPERUSER_* (do .env). "
        "Usado no Docker (entrypoint) e em execução nativa (runserver)."
    )

    def handle(self, *args, **options):
        username = os.environ.get("DJANGO_SUPERUSER_USERNAME", "").strip()
        email = os.environ.get("DJANGO_SUPERUSER_EMAIL", "").strip()
        password = os.environ.get("DJANGO_SUPERUSER_PASSWORD", "").strip()

        if not username or not email or not password:
            self.stdout.write(
                self.style.WARNING(
                    "Superusuário não criado: defina DJANGO_SUPERUSER_USERNAME, "
                    "DJANGO_SUPERUSER_EMAIL e DJANGO_SUPERUSER_PASSWORD no .env."
                )
            )
            return

        if User.objects.filter(username=username).exists():
            self.stdout.write(self.style.WARNING(f"Usuário '{username}' já existe."))
            return

        User.objects.create_superuser(username, email, password)
        self.stdout.write(
            self.style.SUCCESS(f"Superusuário criado: {username} / {email}")
        )

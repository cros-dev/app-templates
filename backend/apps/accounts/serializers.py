"""
Serializers para o app accounts.

Serializers genéricos para User do Django, compatíveis com JWT.
Inclui serializer de login exclusivamente por email.
"""

from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Serializer de login JWT exclusivamente por email.

    Corpo da requisição: `email` e `password` (ambos obrigatórios).
    O usuário é resolvido por email (case-insensitive) e a senha é validada em seguida.
    """

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields.pop("username", None)
        self.fields["email"] = serializers.EmailField(required=True, write_only=True)

    def validate(self, attrs):
        email = (attrs.get("email") or "").strip()
        password = attrs.get("password")

        user = User.objects.filter(email__iexact=email).first()
        if not user or not user.check_password(password):
            raise AuthenticationFailed(
                "Credenciais inválidas.",
                code="invalid_credentials",
            )
        attrs["username"] = user.username
        return super().validate(attrs)


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer para dados públicos do usuário.

    Campos: id, username, email, first_name, last_name, date_joined
    Campos somente leitura: id, date_joined
    """

    class Meta:
        model = User
        fields = ["id", "username", "email", "first_name", "last_name", "date_joined"]
        read_only_fields = ["id", "date_joined"]


class UserProfileSerializer(serializers.ModelSerializer):
    """
    Serializer para perfil editável do usuário.

    Campos: id, username, email, first_name, last_name, date_joined, is_active
    Campos editáveis: email, first_name, last_name
    Campos somente leitura: id, username, date_joined, is_active
    """

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "date_joined",
            "is_active",
        ]
        read_only_fields = ["id", "username", "date_joined", "is_active"]

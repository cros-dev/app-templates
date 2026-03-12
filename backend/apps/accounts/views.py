"""
Views para o app accounts.

Inclui views de autenticação JWT (com documentação OpenAPI) e views de
gerenciamento de usuários/perfil.
"""

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
from drf_spectacular.utils import extend_schema, extend_schema_view

from .serializers import (
    UserSerializer,
    UserProfileSerializer,
    CustomTokenObtainPairSerializer,
)

User = get_user_model()


# ---------------------------------------------------------------------------
# Autenticação JWT (OpenAPI via @extend_schema_view nas views customizadas)
# ---------------------------------------------------------------------------

@extend_schema_view(
    post=extend_schema(
        tags=["Autenticação"],
        summary="Obter par de tokens",
        description=(
            "Autentica com **email** e **password** e retorna um par de tokens JWT. "
            "Espera um JSON com `email` e `password`. Retorna `access` (token de acesso) e "
            "`refresh` (token de renovação). Use o `access` no header "
            "`Authorization: Bearer <access>` nas requisições autenticadas."
        ),
    )
)
class CustomTokenObtainPairView(TokenObtainPairView):
    """View customizada para login JWT exclusivamente por email."""

    serializer_class = CustomTokenObtainPairSerializer


@extend_schema_view(
    post=extend_schema(
        tags=["Autenticação"],
        summary="Renovar token de acesso",
        description=(
            "Recebe o **refresh token** e retorna um novo **access token**. "
            "Espera um JSON com o campo `refresh` contendo o refresh token JWT obtido no login. "
            "Retorna um JSON com o novo `access`. Útil para renovar a sessão sem pedir "
            "credenciais novamente; quando ROTATE_REFRESH_TOKENS está ativo, um novo refresh "
            "também pode ser retornado e o anterior é invalidado (blacklist)."
        ),
    )
)
class CustomTokenRefreshView(TokenRefreshView):
    """View customizada para refresh JWT com metadados OpenAPI."""
    pass


@extend_schema_view(
    post=extend_schema(
        tags=["Autenticação"],
        summary="Verificar token",
        description=(
            "Valida se um token JWT (**access** ou **refresh**) ainda é válido. "
            "Espera um JSON com o campo `token` contendo o JWT a ser verificado. "
            "Retorna HTTP 200 com corpo vazio se o token for válido, ou HTTP 401 em caso "
            "de expiração, assinatura inválida ou token na blacklist. Útil para checagens "
            "pontuais sem passar pelo fluxo de refresh (ex.: validar token antes de uma ação)."
        ),
    )
)
class CustomTokenVerifyView(TokenVerifyView):
    """View customizada para verificação de token JWT com metadados OpenAPI."""
    pass


# ---------------------------------------------------------------------------
# Gerenciamento de Perfil e Usuários
# ---------------------------------------------------------------------------

@extend_schema_view(
    get=extend_schema(
        tags=["Contas"],
        summary="Obter perfil do usuário autenticado",
        description=(
            "Retorna os dados do usuário atualmente autenticado (identificado pelo token JWT). "
            "Não requer parâmetros na URL. Resposta inclui campos como id, username, email, "
            "first_name, last_name e demais campos configurados no UserProfileSerializer. "
            "Requer header `Authorization: Bearer <access_token>`."
        ),
    ),
    put=extend_schema(
        tags=["Contas"],
        summary="Atualizar perfil (completo)",
        description=(
            "Atualiza o perfil do usuário autenticado com envio do corpo completo. "
            "Espera um JSON com todos os campos editáveis (ex.: email, first_name, last_name). "
            "Campos omitidos podem ser limpos ou resetados conforme o serializer. "
            "Retorna o objeto do perfil atualizado. Requer autenticação JWT."
        ),
    ),
    patch=extend_schema(
        tags=["Contas"],
        summary="Atualizar perfil (parcial)",
        description=(
            "Atualiza parcialmente o perfil do usuário autenticado. "
            "Espera um JSON apenas com os campos a serem alterados (ex.: apenas email ou first_name). "
            "Retorna o objeto do perfil atualizado. Requer autenticação JWT."
        ),
    ),
)
class UserProfileView(generics.RetrieveUpdateAPIView):
    """View para obter e atualizar perfil do usuário autenticado."""

    permission_classes = [IsAuthenticated]
    serializer_class = UserProfileSerializer

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)


@extend_schema_view(
    get=extend_schema(
        tags=["Contas"],
        summary="Obter detalhes de um usuário",
        description=(
            "Retorna os dados públicos de um usuário pelo ID (pk na URL). "
            "Utilize para exibir perfil de outro usuário (ex.: página pública). "
            "Resposta segue o UserSerializer (campos configurados como públicos). "
            "Requer autenticação JWT."
        ),
    )
)
class UserDetailView(generics.RetrieveAPIView):
    """View para obter detalhes de um usuário por ID."""

    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer
    queryset = User.objects.all()

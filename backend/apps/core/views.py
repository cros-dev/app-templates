"""
Views genéricas do app core.

Inclui endpoint de health/readiness para load balancers e orquestradores.
"""

from django.http import JsonResponse


def health(request):
    """
    Responde com status 200 e JSON indicando que a API está disponível.
    Útil para health checks de load balancer, Kubernetes e monitoramento.
    """
    return JsonResponse({"status": "ok"})

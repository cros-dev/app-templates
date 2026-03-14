"""
Helpers para logs de auditoria.

Logs vão para o logger nomeado "audit" (configurado em settings.LOGGING).
Não persistem em banco; para auditoria persistida, use um model ou app externo.
"""

import logging

AUDIT_LOGGER_NAME = "audit"


def get_audit_logger():
    """Retorna o logger de auditoria."""
    return logging.getLogger(AUDIT_LOGGER_NAME)


def log_event(event_type: str, request=None, **extra):
    """
    Registra um evento de auditoria.

    Inclui user_id e ip quando request é informado.
    Sempre use event_type consistente (ex.: core.events.USER_LOGIN).
    """
    log = {"event": event_type, **extra}
    if request:
        user = getattr(request, "user", None)
        log["user_id"] = (
            getattr(user, "id", None) if user and getattr(user, "is_authenticated", False) else None
        )
        log["ip"] = request.META.get("REMOTE_ADDR")
    logger = get_audit_logger()
    logger.info(event_type, extra=log)

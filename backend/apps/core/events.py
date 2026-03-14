"""
Constantes de eventos de auditoria (auth e outros transversais).

Use em core.audit.log_event() para manter nomes consistentes.
Eventos de negócio (ex.: order_created, payment_processed) ficam nos apps de domínio.
"""

# Autenticação
USER_LOGIN = "user_login"
USER_LOGOUT = "user_logout"
PASSWORD_CHANGE = "password_change"
USER_CREATED = "user_created"

# Perfil
PROFILE_UPDATED = "profile_updated"

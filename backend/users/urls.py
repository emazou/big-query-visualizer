from django.urls import path, include
from .views import LoginAPIView, RegisterAPIView, ValidateTokenAPIView, UserViewSet

urlpatterns = [
    path('login/', LoginAPIView.as_view(), name='login'),
    path('register/', RegisterAPIView.as_view(), name='register'),
    path('validate-token/', ValidateTokenAPIView.as_view(), name='validate-token'),
    path('', include('users.routers')),
]
# views.py
from rest_framework.views import APIView
from rest_framework import status
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from django.contrib.auth import login, logout, authenticate
from core.response import format_response as response
from .serializers import UserRegistrationSerializer

class LoginAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)
        if user:
            login(request, user)
            refresh = RefreshToken.for_user(user)
            return response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user_id': user.id
            }, 'Login successful', status_code=status.HTTP_200_OK)
        return response(None, 'Invalid credentials', False, status_code=status.HTTP_401_UNAUTHORIZED)

class RegisterAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return response(None, 'Registration successful', status_code=status.HTTP_201_CREATED)
        return response(None, serializer.errors, False, status_code=status.HTTP_400_BAD_REQUEST)

class ValidateTokenAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        token = request.data.get('token')
        try:
            valid_token = AccessToken(token)
            valid_token.check_exp()
            return response(True, 'Token is valid', status_code=status.HTTP_200_OK)
        
        except TokenError as e:
            return response(str(e), 'Token is invalid',False, status_code=status.HTTP_401_UNAUTHORIZED)
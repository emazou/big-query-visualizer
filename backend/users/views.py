# views.py
from rest_framework.views import APIView
from rest_framework import status, viewsets
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate
from django.shortcuts import get_object_or_404
from core.response import format_response as response
from .serializers import UserRegistrationSerializer, UserSerializer

class LoginAPIView(APIView):
    """
    API View for user login, accepts username and password and returns a JWT token
    """

    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)
        if user:
            login(request, user)
            refresh = RefreshToken.for_user(user)
            data = UserSerializer(user).data
            return response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': data,
            }, 'Login successful', status_code=status.HTTP_200_OK)
        return response(None, 'Invalid credentials', False, status_code=status.HTTP_401_UNAUTHORIZED)

class RegisterAPIView(APIView):
    """
        API View for user registration
    """
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return response(None, 'Registration successful', status_code=status.HTTP_201_CREATED)
        return response(None, serializer.errors, False, status_code=status.HTTP_400_BAD_REQUEST)

class UserViewSet(viewsets.ViewSet):
    """
        API View for user profile
    """
    permission_classes = [IsAuthenticated]

    def retrieve(self, request, pk = None):
        queryset = User.objects.all()
        user = get_object_or_404(queryset, pk=pk)
        serializer = UserSerializer(user)
        if serializer.data.get('id') != request.user.id:
            return response(None, 'You are not authorized to view this user', False, status_code=status.HTTP_401_UNAUTHORIZED)
        return response(serializer.data, 'User retrieved successfully', status_code=status.HTTP_200_OK)

class ValidateTokenAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        token = request.data.get('token')
        try:
            valid_token = AccessToken(token)
            valid_token.check_exp()
            return response(None, 'Token is valid', status_code=status.HTTP_200_OK)
        
        except TokenError as e:
            return response(str(e), 'Token is invalid',False, status_code=status.HTTP_401_UNAUTHORIZED)
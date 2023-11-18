from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

class UserAccountTests(APITestCase):
    """ Test module for User model """
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.login_url = reverse('login')
        self.register_url = reverse('register')
        self.validate_token_url = reverse('validate-token')
    
    def test_register_user(self):
        """
        Ensure we can register a new user.
        """
        data = {
            'username': 'testuser2',
            'password': 'testpassword',
            'password2': 'testpassword',
            'email': 'testuser@example.com',
            'first_name': 'Test',
            'last_name': 'User'
        }
        response = self.client.post(self.register_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['message'], 'Registration successful')

    def test_register_user_with_invalid_password(self):
        """
        Ensure we cannot register a new user with an invalid password.
        """
        data = {
            'username': 'testuser2',
            'password': 'test',
            'password2': 'test',
            'email': 'testuser@example.com',
            'first_name': 'Test',
            'last_name': 'User'
        }
        response = self.client.post(self.register_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_login_user(self):
        """
        Ensure we can login a user.
        """
        data = {
            'username': 'testuser',
            'password': 'testpassword'
        }
        response = self.client.post(self.login_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], 'Login successful')  

    def test_login_user_with_invalid_credentials(self):
        """
        Ensure we cannot login a user with invalid credentials.
        """
        data = {
            'username': 'testuser',
            'password': 'wrongpassword'
        }
        response = self.client.post(self.login_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(response.data['message'], 'Invalid credentials')

    def test_validate_token(self):
        """
        Ensure we can validate a token.
        """
        refresh = RefreshToken.for_user(self.user)
        data = {
            'token': str(refresh.access_token)
        }
        response = self.client.post(self.validate_token_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], 'Token is valid')




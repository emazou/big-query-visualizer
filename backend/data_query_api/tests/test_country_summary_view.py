from django.urls import reverse
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.test import APITestCase, APIClient

class CountrySummaryTests(APITestCase):
    """ Test module for CountrySummaryAPIView """
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        print(self.user)
        self.client.force_authenticate(user=self.user)

    def test_get_country_summary(self):
        """
        Ensure we can get country summary data.
        """
        url = reverse('country-summary')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_country_summary_not_authenticate(self):
        """
        Ensure we cannot get country summary data if not authenticated.
        """
        self.client.force_authenticate(user=None)
        url = reverse('country-summary')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

from django.urls import reverse
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.test import APITestCase, APIClient

class EducationDataTests(APITestCase):
    """ Test module for EducationDataAPIView """
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.client.force_authenticate(user=self.user)

    def test_get_education_data(self):
        """
        Ensure we can get education data, bu the request is a not get method.
        """
        url = reverse('education-data')
        data = {
            "country_code": "COL",
            "indicator_code": "UIS.FOSEP.56.F500.M",
            "end_year": 2020,
            "start_year": 2000
        }
        response = self.client.post(url,data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], 'Education data')

    def test_get_education_data_without_indicator_code(self):
        """
        Ensure we cannot get education data without indicator code.
        """
        url = reverse('education-data')
        data = {
            "country_code": "COL",
            "end_year": 2020,
            "start_year": 2000
        }
        response = self.client.post(url,data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_get_education_data_not_authenticate(self):
        """
        Ensure we cannot get education data if not authenticated.
        """
        self.client.force_authenticate(user=None)
        url = reverse('education-data')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

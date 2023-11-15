from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from django.contrib.auth.models import User
from ..models import SavedQuery

class SavedQueryTests(APITestCase):
        """ Test module for SavedQuery model """
        def setUp(self):
            self.client = APIClient()
            self.user = User.objects.create_user(username='testuser', password='testpassword')
            self.client.force_authenticate(user=self.user)
            self.saved_query = SavedQuery.objects.create(
                name='Test Query', 
                username=self.user.username,
                country_code="COL",
                indicator_code='IS.FOSEP.56.F500.M',
                end_year=2020,
                start_year=2000,
                comment='This is a test comment'
            )

        def test_create_saved_query(self):
            """
            Ensure we can create a new saved query object.
            """
            url = reverse('saved-queries-list')
            data = {
                'name': 'Another Test Query', 
                'username': self.user.username,
                'country_code': "COL",
                'indicator_code': 'IS.FOSEP.56.F500.M',
                'end_year': 2020,
                'start_year': 2000,
                'comment': 'This is a test comment',
                'created_at': '2020-12-12T00:00:00Z'
                }
            response = self.client.post(url, data, format='json')
            self.assertEqual(response.status_code, status.HTTP_201_CREATED)
            self.assertEqual(response.data['message'], 'SavedQuery created successfully')

        def test_get_saved_queries(self):
            """
            Ensure we can get all saved queries.
            """
            url = reverse('saved-queries-list')
            response = self.client.get(url, format='json')
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            self.assertEqual(response.data['message'], 'SavedQueries retrieved successfully')

        def test_update_saved_query(self): 
                """Ensure we can update a saved query."""
                url = reverse('saved-queries-detail', kwargs={'pk': self.saved_query.id})
                data = {
                    'name': 'Updated Test Query', 
                    'username': self.user.username,
                    'country_code': "COL",
                    'indicator_code': 'IS.FOSEP.56.F500.M',
                    'end_year': 2020,
                    'start_year': 2000,
                    'comment': 'This is a test comment',
                    'created_at': '2020-12-12T00:00:00Z'  
                }
                response = self.client.put(url, data, format='json')
                updated_saved_query = SavedQuery.objects.get(pk=self.saved_query.id)
                self.assertEqual(response.status_code, status.HTTP_200_OK)
                self.assertEqual(updated_saved_query.name, 'Updated Test Query')

        def test_partial_update_saved_query(self): 
            """Ensure we can partially update a saved query."""
            url = reverse('saved-queries-detail', kwargs={'pk': self.saved_query.id})
            data = {
                'name': 'Partial Updated Test Query', 
            }
            response = self.client.patch(url, data, format='json')
            updated_saved_query = SavedQuery.objects.get(pk=self.saved_query.id)
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            self.assertEqual(updated_saved_query.name, 'Partial Updated Test Query')

        def test_delete_saved_query(self):
            """Ensure we can delete a saved query."""
            url = reverse('saved-queries-detail', kwargs={'pk': self.saved_query.id})
            response = self.client.delete(url, format='json')
            self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
            self.assertEqual(SavedQuery.objects.count(), 0) 

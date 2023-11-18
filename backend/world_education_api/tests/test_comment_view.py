from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from django.contrib.auth.models import User
from ..models import Comment, SavedQuery

class CommentTests(APITestCase):
    """ 
    Test module for Comment model 
    """
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
        self.comment = Comment.objects.create(
            saved_query=self.saved_query, 
            username=self.user.username, 
            text='This is a test comment'
            )
    def test_create_comment(self):
        """
        Ensure we can create a new comment object.
        """
        url = reverse('comments-list')
        data = {
            'saved_query': self.saved_query.id ,
            'username': self.user.username,
            'text': 'This is a test comment'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['message'], 'Comment created successfully')
    
    def test_create_comment_with_nonexistent_saved_query(self):
        """
        Ensure we cannot create a comment with a SavedQuery that does not exist.
        """
        url = reverse('comments-list')
        data = {
            'saved_query': 9999999999, 
            'text': 'This is a test comment'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_get_comments(self):
        """
        Ensure we can get all comments.
        """
        url = reverse('comments-list')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], 'Comments retrieved successfully')

    def test_update_comment(self):
        """Ensure we can update a comment."""
        url = reverse('comments-detail', kwargs={'pk': self.comment.id})
        data = {
            'saved_query': self.saved_query.id ,
            'username': self.user.username,
            'text': 'This is an updated test comment'
        }
        response = self.client.put(url, data, format='json')
        updated_comment = Comment.objects.get(pk=self.comment.id)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], 'Comment updated successfully')
        self.assertEqual(updated_comment.text, 'This is an updated test comment')
    
    def test_partial_update_comment(self):
        """Ensure we can partially update a comment."""
        url = reverse('comments-detail', kwargs={'pk': self.comment.id})
        data = {
            'text': 'This is an updated test comment'
        }
        response = self.client.patch(url, data, format='json')
        updated_comment = Comment.objects.get(pk=self.comment.id)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], 'Comment updated successfully')
        self.assertEqual(updated_comment.text, 'This is an updated test comment')

    def test_delete_comment(self):
        """Ensure we can delete a comment."""
        url = reverse('comments-detail', kwargs={'pk': self.comment.id})
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(response.data['message'], 'Comment deleted successfully')
        self.assertEqual(Comment.objects.count(), 0)
        

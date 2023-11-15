from django.db import models

class SavedQuery(models.Model):
    name = models.CharField(max_length=255) 
    username = models.CharField(max_length=255)
    comment = models.TextField(blank=False)  
    created_at = models.DateTimeField(auto_now_add=True)
    country_code = models.CharField(max_length=3)
    indicator_code = models.CharField(max_length=255)
    start_year = models.IntegerField()
    end_year = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.name} by {self.username}"

class Comment(models.Model):
    saved_query = models.ForeignKey(SavedQuery, related_name='comments', on_delete=models.CASCADE)
    username = models.CharField(max_length=255, db_index=True)  
    text = models.TextField()  
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment by {self.username} on {self.saved_query.name}"
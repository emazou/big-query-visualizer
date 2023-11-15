from django.contrib import admin

from .models import SavedQuery, Comment

admin.site.register(SavedQuery)
admin.site.register(Comment)

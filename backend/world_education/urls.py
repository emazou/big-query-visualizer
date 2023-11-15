
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('world_education_api.routers')),
    path('users/', include('users.urls')),
    path('data-query/', include('data_query_api.urls')),
]

# urls.py
from django.urls import path
from .views.country_summary_view import CountrySummaryAPIView
from .views.education_data_view import EducationDataAPIView
from .views.indicator_summary_view import IndicatorSummaryAPIView

urlpatterns = [
    path('country-summary/', CountrySummaryAPIView.as_view(), name='country-summary'),
    path('education-data/', EducationDataAPIView.as_view(), name='education-data'),
    path('indicator-summary/', IndicatorSummaryAPIView.as_view(), name='indicator-summary')
]

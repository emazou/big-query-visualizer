from rest_framework.routers import DefaultRouter
from .views.query_view import SavedQueryViewSet
from .views.comment_view import CommentViewSet

router = DefaultRouter()

router.register(r'saved-queries', SavedQueryViewSet, basename="saved-queries")
router.register(r'comments', CommentViewSet, basename="comments")

urlpatterns = router.urls

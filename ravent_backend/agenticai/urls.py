# agenticai/urls.py

from django.urls import path
from .views import FileUploadListCreateView, FileUploadDeleteView, ChatAPIView

urlpatterns = [
    # GET & POST  /api/agenticai/files/
    path("files/", FileUploadListCreateView.as_view(), name="file-list-create"),
    # DELETE  /api/agenticai/files/<pk>/
    path("files/<int:pk>/", FileUploadDeleteView.as_view(), name="file-delete"),
    # POST  /api/agenticai/chat/
    path("chat/", ChatAPIView.as_view(), name="chat"),
]

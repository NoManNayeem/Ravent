# agenticai/views.py

from rest_framework import generics, permissions, status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import AnonymousUser
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from .models import FileUpload
from .serializers import (
    FileUploadSerializer,
    ChatRequestSerializer,
    ChatResponseSerializer
)


class FileUploadListCreateView(generics.ListCreateAPIView):
    """
    get:
    List all files owned by the authenticated user.

    post:
    Upload a new file (multipart/form-data). Only PDF, DOCX, or TXT allowed.
    """
    serializer_class = FileUploadSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    def get_queryset(self):
        # During schema generation (swagger_fake_view=True), request.user is AnonymousUser.
        if getattr(self, "swagger_fake_view", False):
            return FileUpload.objects.none()
        return FileUpload.objects.filter(owner=self.request.user).order_by("-uploaded_at")

    @swagger_auto_schema(
        operation_summary="List uploaded files",
        responses={
            200: FileUploadSerializer(many=True),
            401: "Unauthorized: Missing or invalid JWT token"
        }
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_summary="Upload a new file",
        request_body=FileUploadSerializer,  # Use the serializer rather than a raw Schema
        responses={
            201: FileUploadSerializer(),
            400: "Bad Request (e.g., invalid extension)",
            401: "Unauthorized: Missing or invalid JWT token"
        }
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class FileUploadDeleteView(generics.DestroyAPIView):
    """
    delete:
    Delete a file by its ID if it belongs to the current user. Also removes the file from filesystem.
    """
    serializer_class = FileUploadSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_url_kwarg = "pk"

    def get_queryset(self):
        if getattr(self, "swagger_fake_view", False):
            return FileUpload.objects.none()
        return FileUpload.objects.filter(owner=self.request.user)

    @swagger_auto_schema(
        operation_summary="Delete a file",
        responses={
            204: "No Content (file successfully deleted)",
            401: "Unauthorized: Missing or invalid JWT token",
            403: "Forbidden: Attempting to delete someone else's file",
            404: "Not Found: File ID does not exist or not owned by user"
        }
    )
    def delete(self, request, *args, **kwargs):
        return super().delete(request, *args, **kwargs)

    def perform_destroy(self, instance):
        # Delete the file from storage first, then the DB record
        instance.file.delete(save=False)
        instance.delete()


class ChatAPIView(APIView):
    """
    post:
    Dummy chat endpoint. Accepts { "query": "<user’s question>" }
    Returns 200 { "content": { "query", "answer", "type", "sources" } }.
    """
    permission_classes = [permissions.AllowAny]

    @swagger_auto_schema(
        operation_summary="Get a dummy chat response",
        request_body=ChatRequestSerializer,
        responses={
            200: ChatResponseSerializer(),
            400: "Bad Request (missing or invalid 'query' field)"
        }
    )
    def post(self, request, *args, **kwargs):
        # 1. Validate incoming data
        serializer = ChatRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user_query = serializer.validated_data["query"]

        # 2. Build a dummy response
        dummy_answer = (
            "In a Dynamic Bayesian Stackelberg Game, the leader's main objective is to maximize "
            "her utility over multiple rounds rather than just identifying the follower type. The leader "
            "commits to a Dynamic Bayesian Stackelberg Policy (DSP) before the game starts, which specifies "
            "the leader's strategy at each round. This policy is observed by the follower in advance. This "
            "type of commitment is common in literature related to dynamic pricing problems, dynamic "
            "mechanism design, and Stackelberg security games. The optimal DSP is referred to as the "
            "Dynamic Bayesian Stackelberg Equilibrium (DSE)."
        )
        dummy_type = "Knowledge/RAG"
        dummy_sources = ["CSE_1.pdf"]

        # 3. Print to console
        print(f"Query: {user_query}")
        print(f"Answer: {dummy_answer}")
        print(f"Type: {dummy_type}")
        print(f"Sources: {dummy_sources}")

        # 4. Return structured response
        response_payload = {
            "content": {
                "query": user_query,
                "answer": dummy_answer,
                "type": dummy_type,
                "sources": dummy_sources,
            }
        }
        return Response(response_payload, status=status.HTTP_200_OK)

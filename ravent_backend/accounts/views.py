# accounts/views.py

from django.contrib.auth.models import User
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from .serializers import RegisterSerializer


class RegisterView(generics.CreateAPIView):
    """
    post:
    Register a new user by providing a unique username (and optional email)
    along with a password (minimum 8 characters).
    Returns a success message on creation.
    """
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = (permissions.AllowAny,)

    @swagger_auto_schema(
        operation_summary="Register a new user",
        request_body=RegisterSerializer,
        responses={
            201: openapi.Response(
                description="User registered successfully.",
                examples={"application/json": {"detail": "User registered successfully."}}
            ),
            400: "Bad request (e.g., username already exists, invalid data)."
        }
    )
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {"detail": "User registered successfully."},
            status=status.HTTP_201_CREATED
        )


class ProfileView(APIView):
    """
    get:
    Retrieve the authenticated user's basic profile information:
    - id
    - username
    - email
    This endpoint requires a valid JWT access token.
    """
    permission_classes = [permissions.IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="Get user profile",
        responses={
            200: openapi.Response(
                description="User profile data",
                examples={
                    "application/json": {
                        "id": 1,
                        "username": "alice",
                        "email": "alice@example.com"
                    }
                }
            ),
            401: "Unauthorized (no or invalid token)."
        }
    )
    def get(self, request):
        return Response(
            {
                "id": request.user.id,
                "username": request.user.username,
                "email": request.user.email or "",
            }
        )

# accounts/serializers.py

from django.contrib.auth.models import User
from rest_framework import serializers

class RegisterSerializer(serializers.ModelSerializer):
    """
    Serializer for user registration.
    """
    username = serializers.CharField(
        max_length=150,
        help_text="Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only."
    )
    password = serializers.CharField(
        write_only=True,
        min_length=8,
        help_text="Required. At least 8 characters."
    )
    email = serializers.EmailField(
        required=False,
        allow_blank=True,
        help_text="Optional. Provide a valid email address."
    )

    class Meta:
        model = User
        fields = ("username", "password", "email")

    def validate_username(self, value):
        """
        Check that the username is not already taken.
        """
        if User.objects.filter(username__iexact=value).exists():
            raise serializers.ValidationError("A user with that username already exists.")
        return value

    def create(self, validated_data):
        """
        Create and return a new User instance, with a hashed password. 
        If email was provided, save it too.
        """
        username = validated_data["username"]
        password = validated_data["password"]
        email = validated_data.get("email", "").strip()

        user = User(username=username)
        if email:
            user.email = email
        user.set_password(password)
        user.save()
        return user

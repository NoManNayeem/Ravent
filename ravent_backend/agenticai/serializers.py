# agenticai/serializers.py

from rest_framework import serializers
from .models import FileUpload
import os


class FileUploadSerializer(serializers.ModelSerializer):
    """
    Serializer for uploading and listing user files.
    Validates that the file has an allowed extension (.pdf, .docx, .txt).
    """
    file = serializers.FileField(
        help_text="Upload a PDF, DOCX, or TXT file. Server‐enforced size limits apply."
    )
    uploaded_at = serializers.DateTimeField(
        read_only=True,
        help_text="Timestamp when the file was uploaded."
    )

    class Meta:
        model = FileUpload
        fields = ("id", "file", "uploaded_at")
        read_only_fields = ("id", "uploaded_at")

    def validate_file(self, value):
        """
        Ensure the uploaded file has an allowed extension: .pdf, .docx, or .txt
        """
        valid_extensions = [".pdf", ".docx", ".txt"]
        ext = os.path.splitext(value.name)[1].lower()
        if ext not in valid_extensions:
            raise serializers.ValidationError(
                f"Unsupported file extension '{ext}'. "
                f"Allowed extensions are: {', '.join(valid_extensions)}."
            )
        return value


class ChatRequestSerializer(serializers.Serializer):
    """
    Serializer for the chat request body.
    """
    query = serializers.CharField(
        help_text="The user's question in plain text."
    )


class ChatContentSerializer(serializers.Serializer):
    """
    Serializer for the content field of the chat response.
    """
    query = serializers.CharField(
        help_text="Echoed‐back user query."
    )
    answer = serializers.CharField(
        help_text="The (dummy) answer to the query."
    )
    type = serializers.CharField(
        help_text="Category of the response (e.g., Knowledge/RAG)."
    )
    sources = serializers.ListField(
        child=serializers.CharField(help_text="Filename of a source document."),
        help_text="List of source filenames used to generate the answer."
    )


class ChatResponseSerializer(serializers.Serializer):
    """
    Wrapper serializer for chat response, nesting ChatContentSerializer under 'content'.
    """
    content = ChatContentSerializer()

# agenticai/admin.py

from django.contrib import admin
from .models import FileUpload

@admin.register(FileUpload)
class FileUploadAdmin(admin.ModelAdmin):
    list_display = ("id", "owner", "file", "uploaded_at")
    list_filter = ("owner", "uploaded_at")
    search_fields = ("owner__username", "file")

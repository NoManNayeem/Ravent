# agenticai/models.py

from django.db import models
from django.contrib.auth.models import User

class FileUpload(models.Model):
    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="uploaded_files"
    )
    file = models.FileField(upload_to="uploads/")
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.file.name} (by {self.owner.username})"

    def delete(self, using=None, keep_parents=False):
        # First delete the file from storage
        storage = self.file.storage
        if self.file and storage.exists(self.file.name):
            storage.delete(self.file.name)

        # Then delete the model record
        return super().delete(using=using, keep_parents=keep_parents)

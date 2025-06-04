# agenticai/signals.py

import os
from django.db.models.signals import post_delete
from django.dispatch import receiver
from .models import FileUpload

@receiver(post_delete, sender=FileUpload)
def delete_file_from_storage(sender, instance, **kwargs):
    """
    After a FileUpload instance is deleted, remove its file from disk.
    """
    if instance.file:
        storage = instance.file.storage
        name = instance.file.name
        if storage.exists(name):
            storage.delete(name)

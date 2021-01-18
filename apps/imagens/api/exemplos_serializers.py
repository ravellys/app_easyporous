import os
from datetime import datetime

import django
from rest_framework import serializers

os.environ['DJANGO_SETTINGS_MODULE'] = 'project.settings'
django.setup()


class Comment:
    def __init__(self, email, content, created=None):
        self.email = email
        self.content = content
        self.created = created or datetime.now()


class CommentSerializer(serializers.Serializer):
    email = serializers.EmailField()
    content = serializers.CharField(max_length=200)
    created = serializers.DateTimeField()


if __name__ == '__main__':
    comment = Comment(email='leila@example.com', content='foo bar')
    serializer = CommentSerializer(comment)
    print(serializer.data)

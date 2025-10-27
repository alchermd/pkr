import pytest
from django.contrib.auth import get_user_model


@pytest.fixture
def authenticated_client(client, User):
    test_user = User.objects.create_user(username="testuser", password="testpass")
    client.login(username="testuser", password="testpass")
    return client


@pytest.fixture
def User():
    return get_user_model()

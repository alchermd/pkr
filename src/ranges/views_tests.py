import pytest
from django.contrib.auth import get_user_model
from django.test import Client
from django.urls import reverse
from pytest_django.asserts import assertTemplateUsed

from ranges.models import PreFlopRange


@pytest.fixture
def authenticated_client(client):
    User = get_user_model()
    test_user = User.objects.create_user(username="testuser", password="testpass")
    client.login(username="testuser", password="testpass")
    return client


@pytest.mark.django_db
class TestRangeListView:
    def test_renders_expected_template(self, authenticated_client: Client):
        response = authenticated_client.get(reverse("ranges:range_list"))
        assertTemplateUsed(response, "ranges/range_list.html")


@pytest.mark.django_db
class TestRangeDetailView:
    def test_renders_expected_template(self, authenticated_client: Client):
        pfr = PreFlopRange.objects.create(name="Test Range", description="A test range")
        response = authenticated_client.get(
            reverse("ranges:range_detail", args=[pfr.id])
        )
        assertTemplateUsed(response, "ranges/range_detail.html")

    def test_404_for_invalid_id(self, authenticated_client: Client):
        response = authenticated_client.get(reverse("ranges:range_detail", args=[42]))
        assert 404 == response.status_code


@pytest.mark.django_db
class TestRangeDetailView:
    def test_renders_expected_template(self, authenticated_client: Client):
        pfr = PreFlopRange.objects.create(name="Test Range", description="A test range")
        response = authenticated_client.get(reverse("ranges:range_quiz", args=[pfr.id]))
        assertTemplateUsed(response, "ranges/range_quiz.html")

    def test_404_for_invalid_id(self, authenticated_client: Client):
        response = authenticated_client.get(reverse("ranges:range_quiz", args=[42]))
        assert 404 == response.status_code

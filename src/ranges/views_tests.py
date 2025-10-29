from http import HTTPStatus

import pytest
from django.test import Client
from django.urls import reverse
from pytest_django.asserts import assertTemplateUsed

from ranges.models import PreFlopRange


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
        assert response.status_code == HTTPStatus.NOT_FOUND


@pytest.mark.django_db
class TestRangeQuizView:
    def test_renders_expected_template(self, authenticated_client: Client):
        pfr = PreFlopRange.objects.create(name="Test Range", description="A test range")
        response = authenticated_client.get(reverse("ranges:range_quiz", args=[pfr.id]))
        assertTemplateUsed(response, "ranges/range_quiz.html")

    def test_404_for_invalid_id(self, authenticated_client: Client):
        response = authenticated_client.get(reverse("ranges:range_quiz", args=[42]))
        assert response.status_code == HTTPStatus.NOT_FOUND

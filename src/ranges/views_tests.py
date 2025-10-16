import pytest
from django.test import Client
from django.urls import reverse
from pytest_django.asserts import assertTemplateUsed


@pytest.mark.django_db
class TestRangeListView:
    def test_renders_expected_template(self, client: Client):
        response = client.get(reverse("ranges:range_list"))
        assertTemplateUsed(response, "ranges/range_list.html")

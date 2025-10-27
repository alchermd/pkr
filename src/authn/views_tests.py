import pytest
from django.test.client import Client
from django.urls.base import reverse
from pytest_django.asserts import assertTemplateUsed


@pytest.mark.django_db
class TestLoginView:
    def test_renders_expected_template(self, client: Client):
        response = client.get(reverse("authn:login"))
        assertTemplateUsed(response, "authn/login.html")

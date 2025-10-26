import pytest
from django.conf import settings
from django.contrib.auth.models import AnonymousUser
from django.http import HttpRequest, HttpResponse

from authn.decorators import guest_required  # adjust import path


@pytest.fixture
def mock_view():
    def view(request, *args, **kwargs):
        return HttpResponse("OK")

    return view


def make_request(user=None):
    request = HttpRequest()
    request.user = user or AnonymousUser()
    return request


class MockAuthenticatedUser:
    """
    Lightweight stub that simulates an authenticated user.
    """

    @property
    def is_authenticated(self):
        return True


class TestGuestRequired:
    def test_guest_required_redirects_authenticated_user(self, mock_view):
        # Given an authenticated user
        user = MockAuthenticatedUser()
        request = make_request(user)

        @guest_required
        def view(request):
            return HttpResponse("OK")

        # When they access a guest-only view
        response = view(request)

        # Then they are redirected to the LOGIN_REDIRECT_URL
        assert 302 == response.status_code
        assert settings.LOGIN_REDIRECT_URL == response.url

    def test_guest_required_allows_anonymous_user(self, mock_view):
        # Given an anonymous user
        request = make_request()

        @guest_required
        def view(request):
            return HttpResponse("OK")

        # When they access a guest-only view
        response = view(request)

        # Then they receive a normal response
        assert response.status_code == 200
        assert response.content == b"OK"

    def test_guest_required_as_function_call(self, mock_view):
        # Given an anonymous user
        request = make_request()

        # When view is decorated with @guest_required without parentheses
        decorated = guest_required(mock_view)
        response = decorated(request)

        # Then the user gets a normal response
        assert response.status_code == 200
        assert response.content == b"OK"

    def test_guest_required_authenticated_with_parentheses(self, mock_view):
        # Given an authenticated user
        request = make_request(MockAuthenticatedUser())

        # When view is decorated with @guest_required without parentheses
        decorated = guest_required(mock_view)
        response = decorated(request)

        # Then the user is redirected to LOGIN_REDIRECT_URL
        assert 302 == response.status_code
        assert settings.LOGIN_REDIRECT_URL == response.url

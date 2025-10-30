import pytest
from allauth.socialaccount.models import SocialAccount


@pytest.mark.django_db
class TestUser:
    def test_can_resolve_profile_picture_through_google(self, User):
        user = User.objects.create_user(username="testuser", password="testpass")
        SocialAccount.objects.create(
            user=user,
            provider="google",
            extra_data={"picture": "example.com/picture.jpg"},
        )
        assert user.profile_picture == "example.com/picture.jpg"

    def test_blank_profile_pictures_for_users_without_google_accounts(self, User):
        user = User.objects.create_user(username="testuser", password="testpass")
        assert user.profile_picture == ""

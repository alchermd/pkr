from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    @property
    def profile_picture(self) -> str:
        google_account = self.socialaccount_set.filter(provider="google").first()
        if google_account is None:
            return ""

        return google_account.extra_data.get("picture", "")

from pathlib import Path

from django.core.management import BaseCommand

from core.range import RANGE_FILES_DIR, load_range
from ranges.models import PreFlopRange


class Command(BaseCommand):
    help = "Load default preflop ranges into the database if they do not exist"

    def handle(self, *_args, **_options) -> None:
        deleted, _ = PreFlopRange.objects.filter(is_default=True).delete()
        self.stdout.write(
            self.style.WARNING(f"Deleted {deleted} existing default ranges.")
        )

        loaded_ranges_count = 0
        for path in Path(RANGE_FILES_DIR).glob("*.csv"):
            base_name = path.stem
            domain_preflop_range = load_range(base_name)
            preflop_range = PreFlopRange.objects.from_domain(domain_preflop_range)
            preflop_range.is_default = True
            preflop_range.save()
            loaded_ranges_count += 1

        self.stdout.write(
            self.style.SUCCESS(f"Loaded {loaded_ranges_count} preflop ranges.")
        )

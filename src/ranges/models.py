from django.contrib.postgres.fields import ArrayField
from django.db import models

from core import constants
from core.range import PreFlopRange as DomainPreFlopRange, make_grid


class PreFlopRangeManager(models.Manager):
    def from_domain(self, preflop_range: DomainPreFlopRange) -> "PreFlopRange":
        return self.model(
            name=preflop_range.name,
            description=preflop_range.description,
            entries={
                f"{pos},{hand}": action
                for (pos, hand), action in preflop_range.entries.items()
            },
            positions=list(preflop_range.positions),
        )


class PreFlopRange(models.Model):
    class Meta:
        verbose_name = "Preflop Range"
        verbose_name_plural = "Preflop Ranges"

    name = models.CharField(max_length=50)
    # Dict[str(tuple(position, hand))] -> action
    entries = models.JSONField(default=dict)
    positions = ArrayField(models.CharField(max_length=10), default=list)
    # Whether the range is provided by the site as a default
    is_default = models.BooleanField(default=False)
    description = models.TextField(blank=True)

    objects = PreFlopRangeManager()

    def to_domain(self) -> DomainPreFlopRange:
        preflop_range = DomainPreFlopRange(self.name)
        preflop_range.entries = {
            tuple(key.split(",")): value for key, value in self.entries.items()
        }
        preflop_range.positions = set(self.positions)
        preflop_range.description = self.description
        return preflop_range

    def __str__(self):
        return self.name

    def format_grids(self) -> list[tuple[str, list[dict]]]:
        """
        Transforms the PreFlopRange data into a list of grids per position
        that's easier to consume in the frontend.

        Example format: [
         ('UTG', [{'action': 'open', 'label': 'AA'}, {'action': 'fold', 'label': '72o'}]),
         ('MP', [{...}, {...}]),
        ]
        """
        return [
            (pos, make_grid(self.to_domain(), pos))
            for pos in sorted(
                self.positions,
                key=lambda p: constants.POSITION_ORDER.index(p)
                if p in constants.POSITION_ORDER
                else 999,
            )
        ]

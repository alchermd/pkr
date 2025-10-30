import pytest

from ranges.models import PreFlopRange
from core.range import PreFlopRange as CorePreFlopRange


@pytest.mark.django_db
class TestRange:
    def test_can_format_grids(self):
        # Given a PreFlopRange
        pfr = CorePreFlopRange("Test Range")
        pfr.set_action("UTG", "AA", "open")
        pfr.set_action("CO", "ATs", "open")
        pfr.set_action("SB", "72o", "fold")
        preflop_range = PreFlopRange.objects.from_domain(pfr)

        # When formatting its grids
        grids = preflop_range.format_grids()

        # Then it returns the expected structure
        grid_positions = [pos for pos, _ in grids]
        assert "UTG" in grid_positions
        assert "CO" in grid_positions
        assert "SB" in grid_positions

        # ... and the expected actions are present
        self._assert_action_in_grids(grids, "UTG", {"label": "AA", "action": "open"})
        self._assert_action_in_grids(grids, "CO", {"label": "ATs", "action": "open"})
        self._assert_action_in_grids(grids, "SB", {"label": "72o", "action": "fold"})

    def _assert_action_in_grids(self, grids, position, action):
        """
        Helper to assert that a given action is present in the grids for a given position.
        """
        is_position_found = False
        is_action_found = False
        found_action = None
        for pos, grid in grids:
            if pos == position:
                is_position_found = True
                for row in grid:
                    matching_action = next(
                        (cell for cell in row if cell["label"] == action["label"]), None
                    )
                    if matching_action:
                        is_action_found = True
                        found_action = matching_action
                        break
                if found_action:
                    break

        assert is_position_found, f"Position {position} not found in grids"
        assert is_action_found, (
            f"Action with label {action['label']} not found in position {position}"
        )
        assert found_action["action"] == action["action"], (
            f"Expected action {action['action']} but found {found_action['action']}"
        )

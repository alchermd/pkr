from unittest import TestCase

from core.range import PreFlopRange


class TestPreFlopRange(TestCase):
    def test_can_set_and_get_actions(self):
        # Given a range
        pfr = PreFlopRange("test-range")

        # When an action is set
        pfr.set_action("BTN", "AKs", "open")

        # Then the action can be retrieved
        assert "open" == pfr.get_action("BTN", "AKs")

    def test_keeps_track_of_available_positions(self):
        # Given a range
        pfr = PreFlopRange("test-range")

        # When actions are set for different positions
        pfr.set_action("BTN", "AKs", "open")
        pfr.set_action("CO", "AQo", "call")

        # Then the positions set contains those positions
        assert {"BTN", "CO"} == pfr.positions

    def test_checks_for_invalid_positions(self):
        # Given a range
        pfr = PreFlopRange("test-range")

        # When an invalid position is set
        # Then a ValueError is raised
        with self.assertRaises(ValueError):
            pfr.set_action("INVALID_POS", "AKs", "open")

    def test_checks_for_invalid_hands(self):
        # Given a range
        pfr = PreFlopRange("test-range")

        # When an invalid hand is set
        # Then a ValueError is raised
        with self.assertRaises(ValueError):
            pfr.set_action("BTN", "INVALID_HAND", "open")

    def test_checks_for_invalid_actions(self):
        # Given a range
        pfr = PreFlopRange("test-range")

        # When an invalid action is set
        # Then a ValueError is raised
        with self.assertRaises(ValueError):
            pfr.set_action("BTN", "AKs", "INVALID_ACTION")

    def test_defaults_to_fold_for_unset_entries(self):
        # Given a range
        pfr = PreFlopRange("test-range")

        # When getting an action for an unset entry
        action = pfr.get_action("BTN", "AKs")

        # Then the action defaults to "fold"
        assert "fold" == action

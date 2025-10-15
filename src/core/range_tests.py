from unittest import TestCase
from unittest.mock import patch, mock_open

from core.range import PreFlopRange, load_range_from_csv, load_range


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


class TestRangeUtilities(TestCase):
    def test_can_load_range_from_csv(self):
        # Given a csv range file
        csv_content = "pos,hand,action\nBTN,AKs,open\nCO,AQo,call\n"

        # When loading the range file
        with patch("builtins.open", mock_open(read_data=csv_content)):
            pfr = load_range_from_csv("dummy.csv", name="Test Range")

        # Then the range instance created contains the expected actions
        self.assertEqual("open", pfr.get_action("BTN", "AKs"))
        self.assertEqual("call", pfr.get_action("CO", "AQo"))
        self.assertEqual("fold", pfr.get_action("UTG", "22"))

    @patch("pathlib.Path.exists")
    @patch("builtins.open")
    def test_can_load_range_by_name(self, mock_open_func, mock_exists):
        # Given a range file and an accompanying metadata file
        mock_exists.return_value = True
        mock_json = '{"name": "Test Range", "description": "A test range"}'
        mock_csv = "pos,hand,action\nBTN,AKs,open\n"
        mock_open_func.side_effect = [
            mock_open(read_data=mock_json)(),
            mock_open(read_data=mock_csv)(),
        ]

        # When the range is loaded by name
        pfr = load_range("test_range")

        # Then the range instance created contains the expected metadata and actions
        self.assertEqual("Test Range", pfr.name)
        self.assertEqual("A test range", pfr.description)
        self.assertEqual("open", pfr.get_action("BTN", "AKs"))

    @patch("pathlib.Path.exists")
    def test_can_handle_missing_metadata_when_loading_range_by_filename(
        self, mock_exists
    ):
        # Given no metadata file exists
        mock_exists.return_value = False

        # When loading the range by name
        # Then a FileNotFoundError is raised
        with self.assertRaises(FileNotFoundError) as context:
            load_range("missing_range")

    @patch("pathlib.Path.exists")
    def test_load_range_missing_csv(self, mock_exists):
        # Given a metadata file exists but no CSV file
        mock_exists.side_effect = [True, False]
        mock_json = '{"name": "Test Range", "description": "A test range"}'

        # When loading the range by name
        # Then a FileNotFoundError is raised
        with patch("builtins.open", mock_open(read_data=mock_json)):
            with self.assertRaises(FileNotFoundError) as context:
                load_range("incomplete_range")

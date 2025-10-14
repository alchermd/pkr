from unittest import TestCase

from core.constants import generate_hands


class TestConstants(TestCase):
    def test_generate_hands_structure(self):
        hands = generate_hands()

        # 13 ranks -> 13 pairs, 78 combinations * 2 suited/offsuit = 169 hands total
        assert len(hands) == 169

        # Pairs exist and are in correct format
        assert "AA" in hands
        assert "22" in hands

        # Suited and offsuit variants exist
        assert "AKs" in hands
        assert "AKo" in hands

        # Order roughly matches rank order (optional)
        assert hands.index("AKs") < hands.index("AQs")

        # No duplicates
        assert len(hands) == len(set(hands))

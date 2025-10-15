from core.constants import generate_hands


class TestConstants:
    def test_generate_hands_structure(self):
        # When generating hands
        hands = generate_hands()

        # Then there are 13 ranks -> 13 pairs, 78 combinations * 2 suited/offsuit = 169 hands total
        assert len(hands) == 169

        # ... and pairs exist and are in correct format
        assert "AA" in hands
        assert "22" in hands

        # ... and suited and offsuit variants exist
        assert "AKs" in hands
        assert "AKo" in hands

        # ... and order roughly matches rank order
        assert hands.index("AKs") < hands.index("AQs")

        # ... and no duplicates
        assert len(hands) == len(set(hands))

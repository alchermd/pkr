from typing import List

POSITIONS = ["UTG", "MP", "CO", "BTN", "SB", "BB"]
ACTIONS = ["fold", "open", "call", "3bet", "4bet"]


# Generate canonical 169 hands (pairs, suited, offsuit)
def generate_hands() -> List[str]:
    ranks = "AKQJT98765432"
    hands = []

    for i, r1 in enumerate(ranks):
        for j, r2 in enumerate(ranks):
            if i < j:
                hands.append(r1 + r2 + "s")  # suited
                hands.append(r1 + r2 + "o")  # offsuit
            elif i == j:
                hands.append(r1 + r2)  # pair
    return hands


HANDS = generate_hands()

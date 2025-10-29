
POSITIONS = ["UTG", "HJ", "CO", "BTN", "SB", "BB"]
ACTIONS = ["fold", "open", "call", "3bet", "4bet"]
RANKS = "AKQJT98765432"
POSITION_ORDER = ["UTG", "HJ", "CO", "BTN", "SB", "BB"]


# Generate canonical 169 hands (pairs, suited, offsuit)
def generate_hands() -> list[str]:
    hands = []

    for i, r1 in enumerate(RANKS):
        for j, r2 in enumerate(RANKS):
            if i < j:
                hands.append(r1 + r2 + "s")  # suited
                hands.append(r1 + r2 + "o")  # offsuit
            elif i == j:
                hands.append(r1 + r2)  # pair
    return hands


HANDS = generate_hands()

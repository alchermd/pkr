from range import load_range_from_csv
from session import TrainingSession

if __name__ == "__main__":
    # Create a sample range
    r = load_range_from_csv("6max_100bb_rfi.csv", "6max 100bb RFI")

    session = TrainingSession(r)

    pos, hand = session.random_scenario()
    while pos != "UTG":
        pos, hand = session.random_scenario()

    print(f"Scenario: {pos} with {hand}")
    answer = input("What action? (fold/open/call/3bet/4bet): ")

    result = session.check_answer(pos, hand, answer)
    print("Correct!" if result else "Wrong!")
    print("Stats:", session.stats())

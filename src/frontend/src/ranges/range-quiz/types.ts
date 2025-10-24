import { Position } from "@/ranges/types";

export type Attempt = {
  answerIsCorrect: boolean;
  scenario: Scenario;
};

export type Attempts = Array<Attempt>;

export type Scenario = {
  position: Position;
  dealtCard: string;
  answer: string;
};

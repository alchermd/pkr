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

export type Stats = {
  [P in Position]?: {
    correct: number;
    total: number;
  };
};

export type Stat = {
  correct: number;
  total: number;
};

export type Accuracy = {
  [P in Position]?: number;
};

export type Cards = Array<string>;

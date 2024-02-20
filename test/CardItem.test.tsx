import { render, screen } from "@testing-library/react";
import CardItem from "../components/CardItem";

import fetch from "cross-fetch";
global.fetch = fetch;

describe("CardItem", () => {
  it("renders the game name", () => {
    const game = {
      name: "Test Game",
      categories: ["slots"],
      image: "//stage.whgstage.com/scontent/images/games/NEWILDWATER.jpg",
      id: "NEWILDWATER",
    };

    render(<CardItem game={game} activeCategory="top" jackpots={[]} />);

    const gameName = screen.getByText("Test Game");
    expect(gameName).toBeInTheDocument();
  });
});

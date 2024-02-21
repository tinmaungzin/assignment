import { useEffect, useState } from "react";
import CardItem from "./CardItem";
import styled from "styled-components";

type Game = {
  name: string;
  categories: string[];
  image: string;
  id: string;
};

const Grid = styled.div`
  padding: 5rem;
  background-color: #f8f9fa; // Lighter background color
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15); // Shadow for depth

  @media (max-width: 1200px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

type CardsProps = {
  activeCategory: string;
};

type Jackpot = {
  game: string;
  amount: number;
};

const Cards: React.FC<CardsProps> = ({ activeCategory }) => {
  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [jackpots, setJackpots] = useState<Jackpot[]>([]);


  useEffect(() => {
    fetch("http://stage.whgstage.com/front-end-test/games.php")
      .then((response) => response.json())
      .then((data) => setGames(data))
      .catch((error) => console.error("Error:", error));

    const fetchJackpots = () => {
      fetch("http://stage.whgstage.com/front-end-test/jackpots.php")
        .then((response) => response.json())
        .then((data) => setJackpots(data))
        .catch((error) => console.error("Error:", error));
    };

    fetchJackpots();

    const intervalId = setInterval(fetchJackpots, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const filteredGames = games.filter((game) => {
      if (activeCategory === "others") {
        return game.categories.some((category) =>
          ["ball", "virtual", "fun"].includes(category)
        );
      }
      return game.categories.includes(activeCategory);
    });
    filteredGames.sort((a, b) => {
      if (a.categories.includes("top") || a.categories.includes("new")) {
        return -1;
      }
      if (b.categories.includes("top") || b.categories.includes("new")) {
        return 1;
      }
      return 0;
    });
    setFilteredGames(filteredGames);
  }, [activeCategory, games]);

  return (
    <Grid>
      {filteredGames.map((game) => (
        <CardItem key={game.id} game={game} activeCategory={activeCategory} jackpots={jackpots} />
      ))}
    </Grid>
  );
};
export default Cards;

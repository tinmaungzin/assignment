import Image from "next/image";
import styled from "styled-components";
import { useState, useEffect } from "react";

const CardWrapper = styled.div`
  cursor: pointer;
  position: relative;
  width: 200px;
  height: 150px;
  overflow: hidden;
  border-radius: 20px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }

  &:hover .game-info,
  &:hover .play-button {
    opacity: 1;
  }
`;

const Ribbon = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  padding: 5px 10px;
  background-color: #8dc63f;
  color: white;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
`;
const GameInfo = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  color: white;
  opacity: 0;
  transition: opacity 0.3s ease;
`;

const PlayButton = styled.button`
  position: absolute;
  cursor: pointer;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px 30px;
  background-color: #8dc63f;
  color: white;
  border: none;
  border-radius: 10px;
  opacity: 0;
  transition: opacity 0.3s ease;
`;

const Banner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 10px 10px;
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
`;

const GameImage = styled(Image)`
  transition: opacity 0.3s ease;

  ${CardWrapper}:hover & {
    opacity: 0.5;
  }
`;

type Game = {
  name: string;
  categories: string[];
  image: string;
  id: string;
};

type Jackpot = {
  game: string;
  amount: number;
};

type CardItemProps = {
  game: Game;
  activeCategory: string;
};

const CardItem: React.FC<CardItemProps> = ({ game, activeCategory }) => {
  const imageUrl = game.image.startsWith("//")
    ? `https:${game.image}`
    : game.image;

  const hasRibbon =
    activeCategory !== "top" &&
    activeCategory !== "new" &&
    (game.categories.includes("top") || game.categories.includes("new"));

  const ribbonText = game.categories.includes("top") ? "top" : "new";

  const [jackpots, setJackpots] = useState<Jackpot[]>([]);
  const [jackpot, setJackpot] = useState<Jackpot | null>(null);

  useEffect(() => {
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
    const jackpot = jackpots.find((jackpot) => jackpot.game === game.id);
    setJackpot(jackpot || null);
  }, [jackpots, game.id]);

  return (
    <CardWrapper>
      {jackpot && <Banner>£ {jackpot.amount}</Banner>}

      {hasRibbon && <Ribbon>{ribbonText}</Ribbon>}
      <GameImage
        src={imageUrl}
        alt={game.name}
        width={200}
        height={150}
        priority
      />
      <GameInfo className="game-info">{game.name}</GameInfo>
      <PlayButton className="play-button">Play</PlayButton>
    </CardWrapper>
  );
};

export default CardItem;

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
const BaseRibbon = styled.div`
  position: absolute;
  top: -15px;
  width: 150px;
  height: 150px;
  overflow: hidden;

  &::before,
  &::after {
    position: absolute;
    z-index: -1;
    content: "";
    display: block;
    border: 5px solid #8dc63f;
    border-top-color: transparent;
    border-right-color: transparent;
  }

  &::before {
    top: 0;
    left: 0;
  }

  &::after {
    bottom: 0;
    right: 0;
  }

  & span {
    position: absolute;
    display: block;
    width: 225px;
    padding: 8px 0;

    color: #fff;
    font: 700 12px/1 "Lato", sans-serif;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    text-transform: uppercase;
    text-align: center;
    top: 30px;
  }
`;

const Ribbon = styled(BaseRibbon)`
  right: -15px;

  & span {
    left: -10px;
    background-color: #8dc63f;
    transform: rotate(45deg);
  }
`;

const LeftRibbon = styled(BaseRibbon)`
  left: -15px;

  & span {
    right: -10px;
    background-color: #993fc6;
    transform: rotate(320deg);
  }
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
  jackpots: Jackpot[];
};

const CardItem: React.FC<CardItemProps> = ({
  game,
  activeCategory,
  jackpots,
}) => {
  const imageUrl = game.image.startsWith("//")
    ? `https:${game.image}`
    : game.image;

  const hasRibbon =
    game.categories.includes("top") || game.categories.includes("new");

  const ribbonText = game.categories.includes("top") ? "top" : "new";

  const [jackpot, setJackpot] = useState<Jackpot | null>(null);

  useEffect(() => {
    const jackpot = jackpots.find((jackpot) => jackpot.game === game.id);
    setJackpot(jackpot || null);
  }, [jackpots, game.id]);

  return (
    <CardWrapper>
      {jackpot && <Banner>£ {jackpot.amount}</Banner>}

      {hasRibbon &&
        (ribbonText === "top" &&
        (activeCategory === "new" || activeCategory !== "top") ? (
          <LeftRibbon>
            <span>{ribbonText}</span>
          </LeftRibbon>
        ) : (ribbonText === "new" && activeCategory === "top") ||
          (activeCategory !== "new" && activeCategory !== "top") ? (
          <Ribbon>
            <span>{ribbonText}</span>
          </Ribbon>
        ) : null)}
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

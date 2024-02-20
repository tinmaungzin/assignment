import styled from "styled-components";

const NavigationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #373737;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const NavigationLink = styled.a<{ $isActive: boolean }>`
  color: white;
  cursor: pointer;
  padding: 1rem;
  text-decoration: none;
  background-color: ${({ $isActive }) =>
    $isActive ? "#8DC63F" : "transparent"};
  margin-bottom: 1rem;


  @media (min-width: 769px) {
    margin-bottom: 0;
  }
`;

type NavigationProps = {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
};

const Navigation: React.FC<NavigationProps> = ({
  activeCategory,
  setActiveCategory,
}) => {
  return (
    <NavigationWrapper>
      <NavigationLink
        $isActive={activeCategory === "top"}
        onClick={() => setActiveCategory("top")}
      >
        Top Games
      </NavigationLink>
      <NavigationLink
        $isActive={activeCategory === "new"}
        onClick={() => setActiveCategory("new")}
      >
        New Games{" "}
      </NavigationLink>
      <NavigationLink
        $isActive={activeCategory === "slots"}
        onClick={() => setActiveCategory("slots")}
      >
        Slot
      </NavigationLink>
      <NavigationLink
        $isActive={activeCategory === "classic"}
        onClick={() => setActiveCategory("classic")}
      >
        Classic
      </NavigationLink>
      <NavigationLink
        $isActive={activeCategory === "poker"}
        onClick={() => setActiveCategory("poker")}
      >
        Poker
      </NavigationLink>
      <NavigationLink
        $isActive={activeCategory === "roulette"}
        onClick={() => setActiveCategory("roulette")}
      >
        Roulette
      </NavigationLink>
      <NavigationLink
        $isActive={activeCategory === "blackjack"}
        onClick={() => setActiveCategory("blackjack")}
      >
        Blackjack
      </NavigationLink>
      <NavigationLink
        $isActive={activeCategory === "others"}
        onClick={() => setActiveCategory("others")}
      >
        Others
      </NavigationLink>
    </NavigationWrapper>
  );
};

export default Navigation;

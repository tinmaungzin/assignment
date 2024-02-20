import Head from "next/head";
import Navigation from "../components/Navigation";
import Cards from "../components/Cards";
import { useState } from "react";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<string>("top");
  return (
    <>
      <Head>
        <title>Casino Games</title>
        <meta name="description" content="All-in-one casino game portal" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <Cards activeCategory={activeCategory} />
    </>
  );
}

import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";
import Home from "./index.js";
import "./App.css";
import PlussButton from "../components/Buttons/buttons.js";

// import SimpleMap from "../components/Map/googleMap.js";
// import Map from "../components/Map/index.js";

export default function App() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Capstone Project</title>
      </Head>

      <section>
        <button type="button">Lost</button>
        <button type="button">Located</button>
      </section>

      <main>
        <PlussButton />
      </main>
      <Home />
    </>
  );
}

/*    <button type="button" onClick={() => router.push()}>
          +
        </button> */

/*
            <p>
          <img
            src="https://xixerone.com/en/wp-content/uploads/sites/2/2023/01/Hamburg-Altstadt-Accommodation-Map.jpg"
            width="300"
            height="350"
            alt="Picture of a city map"
          />
        </p>*/

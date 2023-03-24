import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";
import Home from "./index.js";
import "./App.css";

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
        <img src="pages/img/HHmap.png" width="300" height="350" />
        <button type="button" onClick={() => router.push()}>
          +
        </button>
      </main>
      <Home />
    </>
  );
}

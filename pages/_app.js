import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";
import Home from "./index.js";
import "./App.css";
import PlussButton from "../components/Buttons/buttons.js";
import { StateProvider } from "../context/state.js";
import dynamic from "next/dynamic";

const App = () => {
  const center = [53.5674, 10.034];
  const zoom = 10;
  const router = useRouter();

  const Map = dynamic(() => import("../components/Map/index.js"), {
    ssr: false,
  });

  return (
    <StateProvider>
      <Head>
        <title>Capstone Project</title>
      </Head>

      <section>
        <button type="button">Lost</button>
        <button type="button">Located</button>
      </section>

      <div>
        <Map center={center} zoom={zoom} />
      </div>

      <main>
        <PlussButton />
      </main>
      <Home />
    </StateProvider>
  );
};
export default App;

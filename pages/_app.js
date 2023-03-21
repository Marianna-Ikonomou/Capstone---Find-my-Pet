import GlobalStyle from "../styles";
import Head from "next/head";
import Map from "../components/Map";
import React from "react";
import "./App.css";
import { useRouter } from "next/router";
import PetForm from "../components/Form";

// import { MapContainer, TileLayer } from "react-leaflet";

/*
const center = [53.5778, 10.0216];

export default function App() {
  return (
    <MapContainer
      center={center}
      zoom={10}
      style={{ height: "100vh", width: "100vw" }}
    ></MapContainer>
  );
}
*/

export default function App() {
  const router = useRouter();

  return (
    <>
      <GlobalStyle />
      <Head>
        <title>Capstone Project</title>
      </Head>
      <button type="button">Lost</button>
      <button type="button">Located</button>
      <Map />
      <button type="button" onClick={() => router.push("/components/Form")}>
        +
      </button>
      <PetForm />
    </>
  );
}

import Heading from "../components/Heading";
import PetForm from "../components/Form/index";
// import Map from "../components/Map";

export default function Home() {
  async function handleAddProduct(event) {
    event.preventDefault();
  }

  return (
    <main>
      <Heading>AppName</Heading>
      <PetForm onSubmit={handleAddProduct} />
      {/* <Map /> */}
    </main>
  );
}

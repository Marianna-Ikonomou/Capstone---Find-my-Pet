import Heading from "../components/Heading";
import PetForm from "../components/Form";
// import Map from "../components/Map";

export default function Home() {
  async function handleAddProduct(event) {
    event.preventDefault();
  }

  return (
    <>
      <Heading>Find my Pet (working title)</Heading>

      {/* <Map /> */}
    </>
  );
}
//<PetForm onSubmit={handleAddProduct} />

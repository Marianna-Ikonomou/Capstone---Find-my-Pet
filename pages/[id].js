import PetForm from "../components/Form";
import { useRouter } from "next/router";

export default function PetDetailsPage() {
  const router = useRouter();
  const {
    query: { id },
    push,
  } = router;

  async function updatePet(url, { arg }) {
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(arg),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      await response.json();
    } else {
      console.error(`Error: ${response.status}`);
    }
  }
}
async function handleEditPet(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const productData = Object.fromEntries(formData);

  await trigger(productData);
  push("/");

  return (
    <>
      <PetForm onSubmit={handleEditPet} />
    </>
  );
}

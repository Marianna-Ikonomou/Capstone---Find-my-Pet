import PetForm from "../components/Form";
import { useRouter } from "next/router";
import useSWRMutation from "swr/mutation";

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

async function handleDeletePet(event) {
  const response = await fetch(`/api/products/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    await response.json();
    push("/");
  } else {
    return (
      <>
        <PetForm onDelete={handleDeletePet} onSubmit={handleEditPet} />
      </>
    );
  }
}

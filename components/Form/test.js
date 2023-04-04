import Heading from "../components/Heading";
import { CldImage, CldUploadButton } from "next-cloudinary";
import { useState } from "react";

export default function Home() {
  const [publicId, setPublicId] = useState(null);
  return (
    <main>
      <Heading>🔱Atlantis Capstone Template🔱</Heading>
      <CldUploadButton
        onUpload={(result) => {
          console.log("result", result);
          if (result.event === "success") {
            setPublicId(result.info.public_id);
          }
        }}
        onError={(error, widget) => {
          console.log("error", error);
        }}
        uploadPreset="fm25fsqo"
      />
      {publicId && (
        <CldImage
          width="200"
          height="200"
          src={publicId}
          sizes="100vw"
          alt="Turtle in the ocean"
        />
      )}
      <p>public_id: {publicId}</p>
    </main>
  );
}

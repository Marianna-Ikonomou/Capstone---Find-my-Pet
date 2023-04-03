import Heading from "../components/Heading";
import { useContext } from "react";
import { StateContext } from "./state.js";
import { CldImage } from "next-cloudinary";

// import PetForm from "../components/Form";
// import Map from "../components/Map";

export default function Home() {
  const [submissions] = useContext(StateContext);

  return (
    <div>
      <Heading>Find my Pet (working title)</Heading>
      {submissions.length > 0 && (
        <ul class="no-bullets">
          {submissions.map((submission, index) => (
            <li key={index}>
              <p>
                <h1>{submission.lostLocated}</h1>
              </p>
              {submission.photo && (
                <CldImage
                  src={submission.photo}
                  alt="Pet"
                  width="200"
                  height="150"
                />
              )}
              <p>
                <h2>{submission.name}</h2>
              </p>
              <p>
                <h4>Description: {submission.description}</h4>
              </p>
              <p>Contact: {submission.contact}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

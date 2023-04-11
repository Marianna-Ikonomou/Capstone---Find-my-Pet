import Heading from "../components/Heading";
import { useContext } from "react";
import { StateContext } from "../context/state.js";
import { CldImage } from "next-cloudinary";

// import Map from "../components/Map";

export default function Home() {
  const [submissions] = useContext(StateContext);

  return (
    <div>
      <Heading>Find my Pet (working title)</Heading>

      {submissions && submissions.length > 0 && (
        <ul className="no-bullets">
          {submissions.map((submission, index) => (
            <li key={index}>
              <p>
                <h1>{submission.lostLocated}</h1>
              </p>
              {submission.cloudinaryId && (
                <CldImage
                  src={submission.cloudinaryId}
                  alt="Pet"
                  width="200"
                  height="130"
                />
              )}
              <p>
                <h2>{submission.name}</h2>
              </p>
              <p>
                <h4>{submission.description}</h4>
              </p>
              <p>Contact: {submission.contact}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

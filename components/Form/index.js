import { StyledForm, StyledHeading, StyledLabel } from "./Form.styled.js";
import { useState } from "react";
import React, { useContext } from "react";
import Image from "next/image";
import { CldImage, CldOgImage } from "next-cloudinary";
import { StateContext } from "../../context/state.js";
import { createClient } from "next-cloudinary";

export default function PetForm({ onSubmit }) {
  const [photoUrl, setPhotoUrl] = useState(null);
  const [submissions, setSubmissions] = useContext(StateContext);

  const cloudinary = createClient({
    cloud: {
      cloudName: "dqkllpzwy",
      apiKey: "186634241844163",
      apiSecret: "bIg8N0waTTc-2wVp0I4-Z4fXc5A",
    },
  });

  const handleSubmit = async (event) => {
    if (event) {
      event.preventDefault();
    }

    const lostLocated = document.getElementById("lostLocated").value;
    const photo = document.getElementById("photo").files[0];
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const contact = document.getElementById("contact").value;

    const result = await cloudinary.uploader.upload(photo, {
      folder: "my_folder",
      use_filename: true,
      unique_filename: false,
    });

    const newSubmission = {
      lostLocated,
      photo: result.secure_url,
      name,
      description,
      contact,
    };
    setSubmissions([...submissions, newSubmission]);
    // localStorage.setItem(
    //   "submissions",
    //   JSON.stringify([...submissions, newSubmission])
    // );

    onSubmit(newSubmission);
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);

    setPhotoUrl(url);
  };

  return (
    <StyledForm>
      <fieldset>
        <legend>
          <StyledHeading>Lost</StyledHeading>
        </legend>
        <StyledLabel htmlFor="photo">Photo: </StyledLabel>
        <input
          type="file"
          id="photo"
          name="photo"
          accept="image/*"
          onChange={handlePhotoChange}
        />

        <StyledLabel htmlFor="lostLocated">Lost/Located:</StyledLabel>
        <input type="text" id="lostLocated" name="lostLocated" />

        <StyledLabel htmlFor="name">Pets Name:</StyledLabel>
        <input type="text" id="name" name="name" />

        <StyledLabel htmlFor="description">Description:</StyledLabel>
        <input type="text" id="description" name="description" />

        <StyledLabel htmlFor="contact">Contact Information:</StyledLabel>
        <input type="text" id="contact" name="contact" />
      </fieldset>
      <button onClick={handleSubmit}>Post</button>

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
    </StyledForm>
  );
}

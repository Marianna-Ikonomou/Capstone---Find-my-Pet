import { StyledForm, StyledHeading, StyledLabel } from "./Form.styled.js";
import { useState } from "react";
import React, { useContext } from "react";
import { CldImage, CldUploadButton } from "next-cloudinary";
import { StateContext } from "../../context/state.js";

export default function PetForm({ onSubmit }) {
  const [photoUrl, setPhotoUrl] = useState(null);
  const [submissions, setSubmissions] = useContext(StateContext);

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
    onSubmit(newSubmission);
  };

  const [publicId, setPublicId] = useState(null);

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

        <CldUploadButton
          onUpload={(result) => {
            if (result.event === "success") {
              setPublicId(result.info.public_id);
            }
          }}
          onError={(error, widget) => {
            console.log("error", error);
          }}
          uploadPreset="jvkne0m7"
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
              {publicId && (
                <CldImage src={publicId} alt="Pet" width="200" height="150" />
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
/*    <input
          type="file"
          id="photo"
          name="photo"
          accept="image/*"
          onChange={handlePhotoChange}
        />
 */

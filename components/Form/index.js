import { StyledForm, StyledHeading, StyledLabel } from "./Form.styled.js";
import { useState } from "react";
import React, { useContext } from "react";
import { CldImage, CldUploadButton } from "next-cloudinary";
import { StateContext } from "../../context/state.js";

export default function PetForm({ onSubmit }) {
  const [photoUrl, setPhotoUrl] = useState(null);
  const [submissions, setSubmissions] = useContext(StateContext);
  const [publicId, setPublicId] = useState(null);
  const [lostLocated, setLostLocated] = useState(null);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [contact, setContact] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newSubmission = {
      lostLocated: lostLocated,
      name: name,
      description: description,
      contact: contact,
      cloudinaryId: publicId,
    };
    setSubmissions([...submissions, newSubmission]);
    onSubmit(newSubmission);
  };
  const handleDelete = (index) => {
    const newSubmissions = [...submissions];
    newSubmissions.splice(index, 1);
    setSubmissions(newSubmissions);
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
        <input
          type="text"
          id="lostLocated"
          name="lostLocated"
          value={lostLocated}
          onChange={(event) => setLostLocated(event.target.value)}
        />

        <StyledLabel htmlFor="name">Pets Name:</StyledLabel>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <StyledLabel htmlFor="description">Description:</StyledLabel>
        <input
          type="text"
          id="description"
          name="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />

        <StyledLabel htmlFor="contact">Contact Information:</StyledLabel>
        <input
          type="text"
          id="contact"
          name="contact"
          value={contact}
          onChange={(event) => setContact(event.target.value)}
        />
      </fieldset>
      <button onClick={handleSubmit}>Post</button>

      {submissions.length > 0 && (
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
              <button onClick={() => handleDelete(index)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </StyledForm>
  );
}

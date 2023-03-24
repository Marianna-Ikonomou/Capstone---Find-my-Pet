import { StyledForm, StyledHeading, StyledLabel } from "./Form.styled.js";
import { useState } from "react";

export default function PetForm({ onSubmit }) {
  const [photoUrl, setPhotoUrl] = useState(null);
  const [submissions, setSubmissions] = useState([]);

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }

    const photo = document.getElementById("photo").files[0];
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const contact = document.getElementById("contact").value;

    console.log(
      `Submitting photo: ${photo} name: ${name} description: ${description} contact: ${contact}`
    );

    const newSubmission = {
      photo: URL.createObjectURL(photo),
      name,
      description,
      contact,
    };
    setSubmissions([...submissions, newSubmission]);

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
              <img src={submission.photo} alt="Pet" />
              <p>Name: {submission.name}</p>
              <p>Description: {submission.description}</p>
              <p>Contact: {submission.contact}</p>
            </li>
          ))}
        </ul>
      )}
    </StyledForm>
  );
}

import { StyledForm, StyledHeading, StyledLabel } from "../Form/Form.styled.js";

export default function PetForm({ onSubmit }) {
  return (
    <StyledForm onSubmit={onSubmit}>
      <fieldset>
        <legend>
          <StyledHeading>Lost</StyledHeading>
        </legend>
        <StyledLabel htmlFor="photo">Photo: </StyledLabel>
        <input type="file" id="photo" name="photo" accept="image/*" />

        <StyledLabel htmlFor="name">Pets Name:</StyledLabel>
        <input type="text" id="name" name="name" />

        <StyledLabel htmlFor="description">Description:</StyledLabel>
        <input type="text" id="description" name="description" />

        <StyledLabel htmlFor="contact">Contact Information:</StyledLabel>
        <input type="text" id="contact" name="contact" />
      </fieldset>
      <button type="submit">Post</button>
    </StyledForm>
  );
}

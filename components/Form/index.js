import { StyledForm, StyledHeading, StyledLabel } from "./Form.styled.js";
import { useState } from "react";
import React from "react";
import Image from "next/image.js";
import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image as PDFImage,
} from "@react-pdf/renderer";

export default function PetForm({ onSubmit }) {
  const [photoUrl, setPhotoUrl] = useState(null);
  const [submissions, setSubmissions] = useState([]);

  const [showPDFDownloadLink, setShowPDFDownloadLink] = useState(false);

  const generatePDF = () => {
    const styles = StyleSheet.create({
      page: {
        flexDirection: "column",
        padding: 10,
      },
      section: {
        margin: 10,
        padding: 10,
      },
      heading: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
      },
      label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
      },
      text: {
        fontSize: 14,
        marginBottom: 10,
      },
      input: {
        marginBottom: 20,
        padding: 5,
        borderRadius: 5,
        border: "1px solid #ccc",
        fontSize: 14,
      },
      image: {},
    });

    const pdfDoc = (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.heading}>
              {document.getElementById("lostLocated").value}
            </Text>

            {photoUrl && (
              <PDFImage style={{ marginBottom: 10 }} src={photoUrl} alt="Pet" />
            )}

            <Text style={styles.text}>
              {document.getElementById("name").value}
            </Text>

            <Text style={styles.text}>
              {document.getElementById("description").value}
            </Text>
            <Text style={styles.label}>Contact Information:</Text>
            <Text style={styles.text}>
              {document.getElementById("contact").value}
            </Text>
          </View>
        </Page>
      </Document>
    );

    return pdfDoc;
  };

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }

    const lostLocated = document.getElementById("lostLocated").value;
    const photo = document.getElementById("photo").files[0];
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const contact = document.getElementById("contact").value;

    const newSubmission = {
      lostLocated,
      photo: URL.createObjectURL(photo),
      name,
      description,
      contact,
    };
    setSubmissions([...submissions, newSubmission]);
    localStorage.setItem(
      "submissions",
      JSON.stringify([...submissions, newSubmission])
    );

    onSubmit(newSubmission);

    setShowPDFDownloadLink(true);
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

        {photoUrl && (
          <div className={Image}>
            <PDFImage src={photoUrl} width={200} height={150} alt="Pet" />
          </div>
        )}

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
              <Image
                src={submission.photo}
                alt="Pet"
                width="200"
                height="150"
              />
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
      {showPDFDownloadLink && (
        <PDFDownloadLink document={generatePDF()} fileName="pet-form.pdf">
          Download PDF
        </PDFDownloadLink>
      )}
    </StyledForm>
  );
}

import { StyledForm, StyledHeading, StyledLabel } from "./Form.styled.js";
import { useState } from "react";
import React, { useContext } from "react";
import { CldImage, CldUploadButton } from "next-cloudinary";
import { StateContext } from "../../context/state.js";
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
  const [submissions, setSubmissions] = useContext(StateContext);
  const [publicId, setPublicId] = useState(null);
  const [lostLocated, setLostLocated] = useState(null);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [contact, setContact] = useState(null);
  const [location, setLocation] = useState(null);

  const [showPDFDownloadLink, setShowPDFDownloadLink] = useState(false);

  const generatePDF = (data) => {
    const styles = StyleSheet.create({
      page: {
        flexDirection: "column",
        padding: 10,
        textAlign: "center",
      },
      section: {
        margin: 10,
        padding: 10,
      },
      heading: {
        fontSize: 30,
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

    const photoCloudinaryUrl = publicId
      ? `https://res.cloudinary.com/your_cloud_name/image/upload/${publicId}`
      : null;

    const pdfDoc = (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.heading}>
              {document.getElementById("lostLocated").value}
            </Text>

            {photoCloudinaryUrl && (
              <PDFImage
                style={{ marginBottom: 10 }}
                src={photoCloudinaryUrl}
                alt="Pet"
              />
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newSubmission = {
      lostLocated: lostLocated,
      name: name,
      description: description,
      contact: contact,
      cloudinaryId: publicId,
      location: location,
    };
    setSubmissions([...submissions, newSubmission]);
    onSubmit(newSubmission);
    setShowPDFDownloadLink(true);
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

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleMapClick = (latlng) => {
    setLocation(latlng);
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
          onError={(error, widget) => {}}
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

        <StyledLabel htmlFor="location">Location:</StyledLabel>
        <input
          type="text"
          id="location"
          name="location"
          value={location}
          onChange={handleLocationChange}
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
              {showPDFDownloadLink && (
                <PDFDownloadLink
                  document={generatePDF()}
                  fileName="pet-form.pdf"
                >
                  Download PDF
                </PDFDownloadLink>
              )}
            </li>
          ))}
        </ul>
      )}
    </StyledForm>
  );
}

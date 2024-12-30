// import { useState } from "react";
// import styles from "./../css/dashboard.module.css";
// import axios from "axios";

// export default function DoctorNotePad({ editData, onEditComplete }) {
//   console.log("editData", editData);
//   const [inputs, setInputs] = useState({
//     // Personal details
//     name: editData?.name || "",
//     gender: editData?.gender || "male",
//     age: editData?.age || "",
//     maritalStatus: editData?.maritalStatus || "unMarried",
//     phoneNumber: editData?.phoneNumber || "",
//     email: editData?.email || "",
//     dateOfBirth: editData?.dateOfBirth || "",

//     // Patient Vitals
//     heartRate: editData?.heartRate || "",
//     bloodPressureSystolic: editData?.bloodPressureSystolic || "",
//     bloodPressureDiastolic: editData?.bloodPressureDiastolic || "",
//     bodyTemperature: editData?.bodyTemperature || "",
//     respiratoryRate: editData?.respiratoryRate || "",
//     oxygenSaturation: editData?.oxygenSaturation || "",
//     bloodSugarFasting: editData?.bloodSugarFasting || "",
//     bloodSugarPostprandial: editData?.bloodSugarPostprandial || "",
//     weight: editData?.weight || "",
//     height: editData?.height || "",
//     bmi: editData?.bmi || "",

//     // Appointment details
//     doctorName: editData?.doctorName || "",
//     apno: editData?.apno || "", // Appointment number (ticket)
//     docnotes: editData?.docnotes || "",
//   });
//   // Handle form input changes
//   const handleChange = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;
//     setInputs((values) => ({ ...values, [name]: value }));
//   };
//   // Handle form submission
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (validateForm()) {
//       const generatedApno = generateAPNO(); // Generate APNO and update the state
//       try {
//         if (editData) {
//           // Updating an existing appointment
//           const res = await axios.put(
//             `http://localhost:3000/appointment/update/${editData?._id}`,
//             { ...inputs, apno: generatedApno } // Include the updated APNO
//           );
//           if (res.status === 200) {
//             alert(
//               `Appointment updated successfully! Your Appointment Number (APNO) is ${generatedApno}`
//             );
//             // Call the onEditComplete callback after a successful update
//             onEditComplete();
//           }
//         } else {
//           // Creating a new appointment
//           const res = await axios.post(
//             "http://localhost:3000/appointment/create",
//             { ...inputs, apno: generatedApno } // Include the updated APNO
//           );
//           if (res.status === 200) {
//             alert(
//               `Form submitted successfully! Your Appointment Number (APNO) is ${generatedApno}`
//             );
//             // Call the onEditComplete callback after a successful creation
//             onEditComplete();
//           }
//         }
//       } catch (error) {
//         console.error("Error submitting the form:", error);
//         alert("An error occurred while submitting the form.");
//       }
//     }
//   };
//   return <div></div>;
// }

import { useState } from "react";
import styles from "./../css/dashboard.module.css";
import axios from "axios";

export default function DoctorNotePad({ editData, onEditComplete }) {
  const [inputs, setInputs] = useState({
    // Personal details (Read-only)
    name: editData?.name || "",
    gender: editData?.gender || "male",
    age: editData?.age || "",
    apno: editData?.apno || "", // Appointment number (ticket)
    doctorName: editData?.doctorName || "",

    // Patient Vitals
    heartRate: editData?.heartRate || "",
    bloodPressureSystolic: editData?.bloodPressureSystolic || "",
    bloodPressureDiastolic: editData?.bloodPressureDiastolic || "",
    bodyTemperature: editData?.bodyTemperature || "",
    respiratoryRate: editData?.respiratoryRate || "",
    oxygenSaturation: editData?.oxygenSaturation || "",
    bloodSugarFasting: editData?.bloodSugarFasting || "",
    bloodSugarPostprandial: editData?.bloodSugarPostprandial || "",
    weight: editData?.weight || "",
    height: editData?.height || "",
    bmi: editData?.bmi || "",

    // Doctor Notes
    docnotes: editData?.docnotes || "",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = editData
        ? await axios.put(
            `http://localhost:3000/appointment/update/${editData?._id}`,
            inputs
          )
        : await axios.post("http://localhost:3000/appointment/create", inputs);

      if (res.status === 200) {
        alert(
          `${
            editData ? "Updated" : "Created"
          } successfully! Appointment Number: ${inputs.apno}`
        );
        onEditComplete();
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  return (
    <div className={styles.cardX}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <table className={styles.table}>
          <tbody>
            {/* Read-only Fields */}
            <tr>
              <td>
                <label>Appointment Number:</label>
              </td>
              <td>
                <input type="text" value={inputs.apno} readOnly />
              </td>
              <td>
                <label>Patient Name:</label>
              </td>
              <td>
                <input type="text" value={inputs.name} readOnly />
              </td>
            </tr>
            <tr>
              <td>
                <label>Age:</label>
              </td>
              <td>
                <input type="text" value={inputs.age} readOnly />
              </td>
              <td>
                <label>Gender:</label>
              </td>{" "}
              <td>
                <input type="text" value={inputs.gender} readOnly />
              </td>
            </tr>
          </tbody>
        </table>
        <table>
          <tr>
            <td>Heart Rate:</td>
            <td>
              <input
                type="number"
                name="heartRate"
                value={inputs.heartRate}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>Body Temperature:</td>
            <td>
              <input
                type="number"
                name="bodyTemperature"
                value={inputs.bodyTemperature}
                onChange={handleChange}
              />
            </td>{" "}
            <td>Respiratory Rate:</td>
            <td>
              <input
                type="number"
                name="respiratoryRate"
                value={inputs.respiratoryRate}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>Oxygen Saturation:</td>
            <td>
              <input
                type="number"
                name="oxygenSaturation"
                value={inputs.oxygenSaturation}
                onChange={handleChange}
              />
            </td>{" "}
            <td>Fasting Blood Sugar:</td>
            <td>
              <input
                type="number"
                name="bloodSugarFasting"
                value={inputs.bloodSugarFasting}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>Weight:</td>
            <td>
              <input
                type="number"
                name="weight"
                value={inputs.weight}
                onChange={handleChange}
              />
            </td>{" "}
            <td>Height:</td>
            <td>
              <input
                type="number"
                name="height"
                value={inputs.height}
                onChange={handleChange}
              />
            </td>{" "}
            <td>BMI:</td>
            <td>
              <input
                type="number"
                name="bmi"
                value={inputs.bmi}
                onChange={handleChange}
              />
            </td>
          </tr>{" "}
          <tr>
            <td>Blood Pressure (Systolic/Diastolic):</td>
            <td
              colSpan={4}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <input
                type="number"
                name="bloodPressureSystolic"
                placeholder="Systolic"
                value={inputs.bloodPressureSystolic}
                onChange={handleChange}
                style={{ width: "45%" }}
              />
              <span style={{ padding: "0 5px" }}>/</span>
              <input
                type="number"
                name="bloodPressureDiastolic"
                placeholder="Diastolic"
                value={inputs.bloodPressureDiastolic}
                onChange={handleChange}
                style={{ width: "45%" }}
              />
            </td>
          </tr>
        </table>
        {/* Doctor Notes */}

        <label>Doctor Notes:</label>
        <textarea
          name="docnotes"
          value={inputs.docnotes}
          onChange={handleChange}
          rows="8"
          style={{ width: "100%", fontSize: "1.25rem" }} // Increase font size by 4 points
        ></textarea>

        {/* Submit Button */}
        <button type="submit" className={styles.buttonX}>
          {editData ? "Update Appointment" : "Create Appointment"}
        </button>
        <button className={styles.buttonX} onClick={(e) => onEditComplete()}>
          Cancel
        </button>
      </form>
    </div>
  );
}

import { useState } from "react";
import styles from "./../css/dashboard.module.css";
import axios from "axios";

export default function Dashboard({ editData, onEditComplete, noap }) {
  console.log("editData", editData);
  const [inputs, setInputs] = useState({
    // Personal details
    name: editData?.name || "",
    gender: editData?.gender || "male",
    age: editData?.age || "",
    maritalStatus: editData?.maritalStatus || "unMarried",
    phoneNumber: editData?.phoneNumber || "",
    email: editData?.email || "",
    dateOfBirth: editData?.dateOfBirth || "",

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

    // Appointment details
    doctorName: editData?.doctorName || "",
    apno: editData?.apno || "", // Appointment number (ticket)
    docnotes: editData?.docnotes || "",
  });

  const [apnoCounter, setApnoCounter] = useState(1000); // Start counter from 1000

  // Handle form input changes
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const generateAPNO = (noap) => {
    const newApno = 1000 + noap + 1; // Increment APNO counter
    setApnoCounter(newApno); // Update the counter state
    console.log("Apno");
    console.log(newApno);
    setInputs((values) => ({ ...values, apno: newApno })); // Update the form input
    return newApno;
  };

  // Validation function for form fields
  const validateForm = () => {
    // Validate Personal Details
    if (!inputs.name) {
      alert("Name is required");
      return false;
    }
    // if (!inputs.dateOfBirth) {
    //   alert("Date of Birth is required");
    //   return false;
    // }
    if (!inputs.age || inputs.age <= 0) {
      alert("Please enter a valid age");
      return false;
    }
    if (!inputs.phoneNumber) {
      alert("Phone number must not be empty");
      return false;
    }
    if (!inputs.email || !/\S+@\S+\.\S+/.test(inputs.email)) {
      alert("Please enter a valid email address");
      return false;
    }

    // // Validate Patient Vitals
    // if (!inputs.heartRate || inputs.heartRate <= 0) {
    //   alert("Please enter a valid heart rate");
    //   return false;
    // }
    // if (!inputs.bloodPressureSystolic || !inputs.bloodPressureDiastolic) {
    //   alert("Please enter valid blood pressure values");
    //   return false;
    // }
    // if (!inputs.bodyTemperature) {
    //   alert("Body temperature is required");
    //   return false;
    // }
    // if (!inputs.respiratoryRate || inputs.respiratoryRate <= 0) {
    //   alert("Please enter a valid respiratory rate");
    //   return false;
    // }
    // if (
    //   !inputs.oxygenSaturation ||
    //   inputs.oxygenSaturation < 95 ||
    //   inputs.oxygenSaturation > 100
    // ) {
    //   alert("Oxygen saturation should be between 95% and 100%");
    //   return false;
    // }
    // if (!inputs.bloodSugarFasting || inputs.bloodSugarFasting <= 0) {
    //   alert("Please enter a valid fasting blood sugar level");
    //   return false;
    // }
    // if (!inputs.weight || inputs.weight <= 0) {
    //   alert("Please enter a valid weight");
    //   return false;
    // }
    // if (!inputs.height || inputs.height <= 0) {
    //   alert("Please enter a valid height");
    //   return false;
    // }
    // if (!inputs.bmi || inputs.bmi <= 0) {
    //   alert("Please enter a valid BMI");
    //   return false;
    // }

    // // Validate Appointment Details
    // if (!inputs.doctorName) {
    //   alert("Doctor's name is required");
    //   return false;
    // }

    return true;
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const generatedApno = generateAPNO(noap); // Generate APNO and update the state
      try {
        if (editData) {
          // Updating an existing appointment
          const res = await axios.put(
            `http://localhost:3000/appointment/update/${editData?._id}`,
            { ...inputs, apno: generatedApno } // Include the updated APNO
          );
          if (res.status === 200) {
            alert(
              `Appointment updated successfully! Your Appointment Number (APNO) is ${generatedApno}`
            );
            // Call the onEditComplete callback after a successful update
            onEditComplete();
          }
        } else {
          // Creating a new appointment
          const res = await axios.post(
            "http://localhost:3000/appointment/create",
            { ...inputs, apno: generatedApno } // Include the updated APNO
          );
          if (res.status === 200) {
            alert(
              `Form submitted successfully! Your Appointment Number (APNO) is ${generatedApno}`
            );
            // Call the onEditComplete callback after a successful creation
            onEditComplete();
          }
        }
      } catch (error) {
        console.error("Error submitting the form:", error);
        alert("An error occurred while submitting the form.");
      }
    }
  };

  return (
    <div>
      <h1>Create Appointment</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.cardX}>
          {" "}
          <h2>Personal Details</h2>
          <table>
            <tr>
              <td>Name:</td>
              <td>
                <input
                  type="text"
                  name="name"
                  value={inputs.name}
                  onChange={handleChange}
                />
              </td>
              <td>Gender:</td>
              <td>
                <select
                  name="gender"
                  value={inputs.gender}
                  onChange={handleChange}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Date of Birth:</td>
              <td>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={inputs.dateOfBirth}
                  onChange={handleChange}
                />
              </td>
              <td>Age:</td>
              <td>
                <input
                  type="number"
                  name="age"
                  value={inputs.age}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Marital Status:</td>
              <td>
                <select
                  name="maritalStatus"
                  value={inputs.maritalStatus}
                  onChange={handleChange}
                >
                  <option value="unMarried">Unmarried</option>
                  <option value="married">Married</option>
                  <option value="divorced">Divorced</option>
                  <option value="widowed">Widowed</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Phone Number:</td>
              <td>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={inputs.phoneNumber}
                  onChange={handleChange}
                />
              </td>
              <td>Email:</td>
              <td>
                <input
                  type="email"
                  name="email"
                  value={inputs.email}
                  onChange={handleChange}
                />
              </td>
            </tr>
          </table>{" "}
          <h2>Patient Vitals</h2>
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
                colSpan={3}
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
          </table>{" "}
          <h2>Appointment Details</h2>
          <table>
            <tr>
              <td>Doctor's Name:</td>
              <td>
                <input
                  type="text"
                  name="doctorName"
                  value={inputs.doctorName}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Appointment Number (APNO):</td>
              <td>{inputs.apno}</td>
            </tr>
          </table>{" "}
          <button type="submit" className={styles.buttonX}>
            {editData ? "Update Appointment" : "Create Appointment "}
          </button>
          <button className={styles.buttonX} onClick={(e) => onEditComplete()}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

import { useEffect, useState } from "react";
import styles from "./../css/appointments.module.css";
import { FaEdit, FaTrash, FaPrint } from "react-icons/fa";
import Dashboard from "./Dashboard";

export default function ReceptionAppointments() {
  const [patients, setPatients] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState(null);
  const [noap, setnoap] = useState(0);

  useEffect(() => {
    getdata();
  }, []);

  const getdata = () => {
    fetch("http://localhost:3000/appointment")
      .then((res) => res.json())
      .then((data) => {
        setPatients(data);
      });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/appointment/delete/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        getdata();
      });
  };

  const handlePrint = (patient) => {
    const printableContent = `
      <div>
        <h2>Patient Details</h2>
        <p><strong>Name:</strong> ${patient.name || "N/A"}</p>
        <p><strong>Age:</strong> ${patient.age || "N/A"}</p>
        <p><strong>Birth Date:</strong> ${
          patient.birth_date
            ? new Date(patient.birth_date).toLocaleDateString()
            : "N/A"
        }</p>
        <p><strong>Gender:</strong> ${patient.gender || "N/A"}</p>

        <h2>Patient Vitals</h2>
        <p><strong>Heart Rate:</strong> ${patient.heartRate || "N/A"}</p>
        <p><strong>Blood Pressure:</strong> ${
          patient.bloodPressureSystolic
            ? `${patient.bloodPressureSystolic}/${patient.bloodPressureDiastolic}`
            : "N/A"
        }</p>
        <p><strong>Body Temperature:</strong> ${
          patient.bodyTemperature || "N/A"
        }</p>
        <p><strong>Respiratory Rate:</strong> ${
          patient.respiratoryRate || "N/A"
        }</p>
        <p><strong>Oxygen Saturation:</strong> ${
          patient.oxygenSaturation || "N/A"
        }</p>
        <p><strong>Blood Sugar (Fasting):</strong> ${
          patient.bloodSugarFasting || "N/A"
        }</p>
        <p><strong>Blood Sugar (Postprandial):</strong> ${
          patient.bloodSugarPostprandial || "N/A"
        }</p>
        <p><strong>Weight:</strong> ${patient.weight || "N/A"} kg</p>
        <p><strong>Height:</strong> ${patient.height || "N/A"} cm</p>
        <p><strong>BMI:</strong> ${patient.bmi || "N/A"}</p>
        
        <h2>Doctor Notes</h2>
        <p>${patient.docnotes || "No notes provided."}</p>

        <p><strong>Doctor Name:</strong> ${patient.doctorName || "N/A"}</p>
      </div>
    `;

    const printWindow = window.open("", "_blank", "width=800,height=600");
    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>Patient Info</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              margin: 20px;
            }
            h2 {
              color: #333;
              margin-bottom: 10px;
            }
            p {
              margin: 5px 0;
            }
          </style>
        </head>
        <body>
          ${printableContent}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
    printWindow.onafterprint = () => printWindow.close();
  };

  const handledit = (id) => {
    const patientToEdit = patients.find((patient) => patient._id === id);
    setEditData(patientToEdit); // Set the data of the patient to be edited
    setIsEdit(true); // Set isEdit to true to switch to the edit mode
  };

  const handleAddNewAppointment = () => {
    setEditData(null); // No editData for new appointments
    setIsEdit(true); // Enable edit mode for adding a new appointment
  };

  const handleEditComplete = () => {
    setIsEdit(false); // Return to the main appointments view
    setEditData(null); // Clear the edit data
    getdata(); // Refresh the appointments list
  };

  return (
    <div>
      {!isEdit && (
        <div className={styles.cardX}>
          <h1>Upcoming Appointments</h1>
          <button onClick={handleAddNewAppointment} className={styles.buttonX}>
            Add New Appointment
          </button>
          <div className={styles.centered}>
            <table>
              <thead>
                <tr>
                  <th>Appointment No.</th>
                  <th>Patient Name</th>
                  <th>Age</th>
                  <th>Email</th>
                  <th>Gender</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (
                  <tr key={patient._id}>
                    <td>{patient.apno}</td>
                    <td>{patient.name}</td>
                    <td>{patient.age}</td>
                    <td>{patient.email}</td>
                    <td>{patient.gender}</td>
                    <td className={styles.tableActions}>
                      <FaEdit
                        className={styles.editIcon}
                        onClick={(e) => {
                          e.stopPropagation();
                          handledit(patient._id);
                        }}
                      />
                      <FaTrash
                        className={styles.deleteIcon}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(patient._id);
                        }}
                      />
                      <FaPrint
                        className={styles.printIcon}
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePrint(patient);
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {isEdit && (
        <Dashboard
          editData={editData} // Pass editData if it's an edit operation
          onEditComplete={handleEditComplete} // Pass onEditComplete to handle the transition after editing
          noap={patients.length}
        />
      )}
    </div>
  );
}

import { useEffect, useState } from "react";
import styles from "./../css/appointments.module.css";
import DoctorNotePad from "./DoctorNotePad";

export default function DoctorAppointments() {
  const [patients, setPatients] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState(null);

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

  const handledit = (id) => {
    const patientToEdit = patients.find((patient) => patient._id === id);
    setEditData(patientToEdit); // Set the data of the patient to be edited
    setIsEdit(true); // Set isEdit to true to switch to the edit mode
  };

  const handleEditComplete = () => {
    setIsEdit(false); // Return to the main appointments view
    setEditData(null); // Clear the edit data
    getdata(); // Refresh the appointments list
  };

  return (
    <div>
      {" "}
      {!isEdit && (
        <div className={styles.cardX}>
          <h2>Appointments</h2>
          <div className={styles.centered}>
            <table>
              <thead>
                <tr>
                  <th>Appointment No.</th>
                  <th>Patient Name</th>
                  <th>Age</th>
                  <th>Email</th>
                  <th>Gender</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (
                  <tr
                    key={patient._id}
                    onClick={(e) => {
                      e.stopPropagation();
                      handledit(patient._id);
                    }}
                  >
                    <td style={{ textAlign: "center" }}>{patient.apno}</td>
                    <td>{patient.name}</td>
                    <td>{patient.age}</td>
                    <td>{patient.email}</td>
                    <td>{patient.gender}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}{" "}
      {isEdit && (
        <DoctorNotePad
          editData={editData} // Pass editData if it's an edit operation
          onEditComplete={handleEditComplete} // Pass onEditComplete to handle the transition after editing
        />
      )}
    </div>
  );
}

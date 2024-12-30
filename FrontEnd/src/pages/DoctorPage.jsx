import styles from "./../css/skeleton.module.css";
import { useState } from "react";
import DoctorAppointments from "./DoctorAppointments";
import staffOfHerms from "../assets/staffOfHerms.png";

export default function DoctorPage() {
  const [refreshFlag, setRefreshFlag] = useState(false);
  return (
    <div className={styles.defaultX}>
      <div className={styles.sideNav}>
        <div className={styles.logo}>
          <img src={staffOfHerms} alt="ICON" height="120" />
        </div>
        <h2>Clinic</h2>
        <p
          onClick={() => {
            setRefreshFlag(true);
            setTimeout(() => {
              setRefreshFlag(false);
            }, 0);
          }}
        >
          Refresh Appointments
        </p>
        <p onClick={() => window.location.reload()}>Log Out</p>
      </div>
      <div className={styles.main}>
        {!refreshFlag && <DoctorAppointments />}
      </div>
    </div>
  );
}

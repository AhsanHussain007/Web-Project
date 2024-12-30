import styles from "./../css/skeleton.module.css";
import ReceptionAppointments from "./ReceptionAppointments";
import { useState } from "react";

export default function ReceptionPage() {
  const [refreshFlag, setRefreshFlag] = useState(false);
  return (
    <div className={styles.defaultX}>
      <div className={styles.sideNav}>
        <div className={styles.logo}>
          <img src="src/assets/staffOfHerms.png" alt="ICON" height={"120"} />
        </div>
        <h2>RECEPTION</h2>
        <p
          onClick={() => {
            setRefreshFlag(true);
            setTimeout(() => {
              setRefreshFlag(false);
            }, 0);
          }}
        >
          {" "}
          Refresh Appointments
        </p>
        <p onClick={() => window.location.reload()}>Log Out</p>
      </div>
      <div className={styles.main}>
        {!refreshFlag && <ReceptionAppointments />}
      </div>
    </div>
  );
}

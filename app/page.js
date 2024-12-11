import Image from "next/image";
import styles from "./page.module.css";
import Weather from "./components/Weather";

export default function Home() {
  return (
    <div className={styles.page} >

      <main className={styles.main}>
        <h1>Weather Forecast</h1> <Weather />
      </main>
      <footer className={styles.footer}>
        @copyrights - kv gasyal
      </footer>

    </div>

  );
}

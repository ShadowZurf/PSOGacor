import Head from "next/head";
import DashboardLayout from "@/layouts/dashboard-psi";
import styles from "./mulaikonsultasi-psi.module.css";
import NoOrderPsikolog from "@/components/NoOrder/Psikolog";

export default function MulaiKonsultasiPsikolog() {
  return (
    <>
      <Head>
        <title>Mulai Konsultasi | ITS-OK</title>
        <meta name="description" content="Halaman memulai sesi konsultasi psikolog" />
        <link rel="icon" href="/logo/favicon.png" />
      </Head>
      <DashboardLayout>
        <div className={styles.pageWrapper}>
          <div className={styles.headerLine}>
            <h2 className={styles.sectionTitle}>
              Memulai Konsultasi Online Anda
            </h2>
          </div>
          {/* Komponen "Tidak Ada Pesanan" */}
          <NoOrderPsikolog />
        </div>
      </DashboardLayout>
    </>
  );
}

import { Button } from "react-bootstrap";
import styles from "./detailriwayat-mhs.module.css";
import Head from "next/head";
import DashboardLayout from "@/layouts/dashboard";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { useRouter } from "next/router";

const dummyRiwayat = [
  {
    id: "1",
    namaPsikolog: "dr. Europa",
    tanggalKonsultasi: "22 Mei 2025 02:00:00",
    jadwalKonsultasi: "Kamis, 22 Mei 2025",
    sesiKonsultasi: "02.00 – 04.00",
    keluhan:
      "Kalah final UEL dok",
  },
  {
    id: "2",
    namaPsikolog: "dr. Jlem M.Eng",
    tanggalKonsultasi: "26 Mei 2025 13:00:00",
    jadwalKonsultasi: "Senin, 26 Mei 2025",
    sesiKonsultasi: "13.00 – 14.30",
    keluhan:
      "Kecapean mencari source code",
  },
];

export default function DetailRiwayatView({ id }: { id: string }) {
  const router = useRouter();
  const riwayat = dummyRiwayat.find((item) => item.id === id);

  if (!riwayat) {
    return <div style={{ padding: "2rem" }}>Data riwayat tidak ditemukan.</div>;
  }

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <Head>
        <title>Detail Riwayat | ITS-OK</title>
        <meta name="description" content="Halaman detail riwayat konsultasi mahasiswa" />
        <link rel="icon" href="/logo/favicon.png" />
      </Head>
      <DashboardLayout>
        <div className={styles.pageWrapper}>
          <div className={styles.contentWrapper}>
            <section className={styles.headerSection}>
              <div className={styles.headerContent}>
                <h2 className={styles.pageTitle}>Detail Riwayat Pesanan</h2>
                <Button onClick={handleBack} className={styles.backButton}>
                  <ArrowLeft size={20} /> Kembali
                </Button>
              </div>
            </section>

            <div className={styles.detailContainer}>
              <div className={styles.consultationHeader}>
                <h3 className={styles.consultationTitle}>
                  Konsultasi Online : {riwayat.namaPsikolog}
                </h3>
                <div className={styles.submissionDate}>
                  <span className={styles.dateLabel}>TANGGAL KONSULTASI</span>
                  <span className={styles.dateValue}>{riwayat.tanggalKonsultasi}</span>
                </div>
                <div className={`${styles.statusBadge} ${styles.green}`}> 
                  <CheckCircle size={16} /> <span>Selesai</span>
                </div>
              </div>

              <div className={styles.detailGrid}>
                <div className={styles.detailRow}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>NAMA PSIKOLOG</span>
                    <span className={styles.detailValue}>{riwayat.namaPsikolog}</span>
                  </div>
                </div>
                <div className={styles.detailRow}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>JADWAL KONSULTASI</span>
                    <span className={styles.detailValue}>{riwayat.jadwalKonsultasi}</span>
                  </div>
                </div>
                <div className={styles.detailRow}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>SESI KONSULTASI</span>
                    <span className={styles.detailValue}>{riwayat.sesiKonsultasi}</span>
                  </div>
                </div>
                <div className={styles.detailRow}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>KELUHAN PASIEN</span>
                    <p className={styles.keluhanText}>{riwayat.keluhan}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}

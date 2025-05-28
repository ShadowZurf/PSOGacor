import { Button } from "react-bootstrap";
import styles from "./detail-konsuloff.module.css";
import Head from "next/head";
import DashboardLayout from "@/layouts/dashboard";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { useRouter } from "next/router";

interface StatusConfig {
  [key: string]: {
    color: string;
    backgroundColor: string;
    icon: string;
  };
}

const statusConfig: StatusConfig = {
  Terdaftar: {
    color: "green",
    backgroundColor: "#d1fae5",
    icon: "check",
  },
};

// Simulasi data dummy
const dummyData = [
  {
    id: "1",
    namaPsikolog: "SHCC ITS",
    tanggalPengajuan: "21 Mei 2025 14:15:00",
    jadwalKonsultasi: "Kamis, 29 Mei 2025",
    sesiKonsultasi: "13.00 – 14.30",
    lokasi: "Gedung PK2/SAC lantai 2 dekat kantin pusat",
    keluhan:
      "Cemas berlebihan menghadapi tugas akhir, sulit tidur, dan tekanan dari keluarga.",
    status: "Terdaftar",
  },
];

export default function DetailPesananOfflineView({ id }: { id: string }) {
  const router = useRouter();
  const pesanan = dummyData.find((item) => item.id === id);

  if (!pesanan) {
    return <div style={{ padding: "2rem" }}>Pesanan tidak ditemukan.</div>;
  }

  const getStatusIcon = (status: string) => {
    const config = statusConfig[status];
    if (!config) return null;

    return <CheckCircle size={16} />;
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <Head>
        <title>Konsultasi Offline | ITS-OK</title>
        <meta name="description" content="Halaman konsultasi offline mahasiswa" />
        <link rel="icon" href="/logo/favicon.png" />
      </Head>
      <DashboardLayout>
        <div className={styles.pageWrapper}>
          <div className={styles.contentWrapper}>
            <section className={styles.headerSection}>
              <div className={styles.headerContent}>
                <h2 className={styles.pageTitle}>Detail Konsultasi Offline</h2>
                <Button onClick={handleBack} className={styles.backButton}>
                  <ArrowLeft size={20} />
                  Kembali
                </Button>
              </div>
            </section>

            {/* Kartu Utama Detail */}
            <div className={styles.detailContainer}>
              <div className={styles.consultationHeader}>
                <h3 className={styles.consultationTitle}>
                  Konsultasi Offline : {pesanan.namaPsikolog}
                </h3>
                <div className={styles.submissionDate}>
                  <span className={styles.dateLabel}>TANGGAL PENGAJUAN</span>
                  <span className={styles.dateValue}>
                    {pesanan.tanggalPengajuan}
                  </span>
                </div>
                <div
                  className={styles.statusBadge}
                  style={{
                    backgroundColor:
                      statusConfig[pesanan.status]?.backgroundColor || "#e5e7eb",
                    color: statusConfig[pesanan.status]?.color || "#000",
                  }}
                >
                  {getStatusIcon(pesanan.status)}
                  <span>{pesanan.status}</span>
                </div>
              </div>

              <div className={styles.detailGrid}>
                <div className={styles.detailRow}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>NAMA PSIKOLOG</span>
                    <span className={styles.detailValue}>
                      {pesanan.namaPsikolog}
                    </span>
                  </div>
                </div>

                <div className={styles.detailRow}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>JADWAL KONSULTASI</span>
                    <span className={styles.detailValue}>
                      {pesanan.jadwalKonsultasi}
                    </span>
                  </div>
                </div>

                <div className={styles.detailRow}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>SESI KONSULTASI</span>
                    <span className={styles.detailValue}>
                      {pesanan.sesiKonsultasi}
                    </span>
                  </div>
                </div>

                <div className={styles.detailRow}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>LOKASI KONSULTASI</span>
                    <span className={styles.detailValue}>
                      {pesanan.lokasi}
                    </span>
                  </div>
                </div>

                <div className={styles.detailRow}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>KELUHAN PASIEN</span>
                    <p className={styles.keluhanText}>{pesanan.keluhan}</p>
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

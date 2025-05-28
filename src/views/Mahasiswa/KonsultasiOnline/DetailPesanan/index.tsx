import { Button } from "react-bootstrap";
import styles from "./detail-konsulonl.module.css";
import Head from "next/head";
import DashboardLayout from "@/layouts/dashboard";
import { Clock, ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/router";

interface StatusConfig {
  [key: string]: {
    color: string;
    backgroundColor: string;
    icon: string;
  };
}

const statusConfig: StatusConfig = {
  "Menunggu Persetujuan": {
    color: "blue",
    backgroundColor: "#dbeafe",
    icon: "clock",
  },
  "Telah Disetujui": {
    color: "green",
    backgroundColor: "#d1fae5",
    icon: "check",
  },
  Ditolak: {
    color: "red",
    backgroundColor: "#fee2e2",
    icon: "x",
  },
};

// Simulasi data dummy
const dummyData = [
  {
    id: "1",
    namaPsikolog: "dr. Ahmad Nabil Irawan",
    tanggalPengajuan: "23 Mei 2025 17:25:30",
    jadwalKonsultasi: "Senin, 25 Mei 2025",
    sesiKonsultasi: "09.00 – 10.30",
    keluhan:
      "Sakit perut, tidak bisa makan dua hari. Gara-gara ketikung sahabat sendiri, padahal tiap hari selalu curhat ke dia, tapi malah dia yang confess dan diterima.",
    status: "Menunggu Persetujuan",
  },
  {
    id: "2",
    namaPsikolog: "dr. Farel Danendra S.T.",
    tanggalPengajuan: "10 Mei 2025 17:25:30",
    jadwalKonsultasi: "Selasa, 13 Mei 2025",
    sesiKonsultasi: "10.00 – 11.30",
    keluhan:
      "Sakit kepala, susah tidur, tiap malam mikirin dia yang sekarang udah bahagia sama orang lain. Padahal dulu aku yang nemenin dari titik nol, sekarang dia naik daun malah ninggalin aku.",
    status: "Telah Disetujui",
  },
  {
    id: "3",
    namaPsikolog: "Afandi Wirawan Sutrisno, M.Psi.",
    tanggalPengajuan: "12 Mei 2025 17:25:30",
    jadwalKonsultasi: "Rabu, 14 Mei 2025",
    sesiKonsultasi: "10.00 – 11.30",
    keluhan: "Tim MU cupu banget gapernah menang dok",
    status: "Ditolak",
  },
];

export default function DetailPesananView({ id }: { id: string }) {
  const router = useRouter();
  const pesanan = dummyData.find((item) => item.id === id);

  if (!pesanan) {
    return <div style={{ padding: "2rem" }}>Pesanan tidak ditemukan.</div>;
  }

  const getStatusIcon = (status: string) => {
    const config = statusConfig[status];
    if (!config) return <Clock size={16} />;

    switch (config.icon) {
      case "check":
        return <CheckCircle size={16} />;
      case "x":
        return <XCircle size={16} />;
      default:
        return <Clock size={16} />;
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <Head>
        <title>Konsultasi Online | ITS-OK</title>
        <meta name="description" content="Halaman konsultasi online mahasiswa" />
        <link rel="icon" href="/logo/favicon.png" />
      </Head>
      <DashboardLayout>
        <div className={styles.pageWrapper}>
          <div className={styles.contentWrapper}>
            <section className={styles.headerSection}>
              <div className={styles.headerContent}>
                <h2 className={styles.pageTitle}>Detail Konsultasi Online</h2>
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
                  Konsultasi Online : {pesanan.namaPsikolog}
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
                      statusConfig[pesanan.status]?.backgroundColor ||
                      "#fef3c7",
                    color: statusConfig[pesanan.status]?.color || "#d97706",
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
                    <span className={styles.detailLabel}>KELUHAN PASIEN</span>
                    <p className={styles.keluhanText}>{pesanan.keluhan}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Kartu Link Zoom */}
            <div className={styles.detailContainer} style={{ marginTop: "2rem" }}>
              <div className={styles.consultationHeader}>
                <h3 className={styles.consultationTitle}>
                  Link Zoom Konsultasi Online
                </h3>
              </div>
              <div className={styles.detailGrid}>
                <div className={styles.detailRow}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>LINK ZOOM</span>
                    <span className={styles.detailValue}>
                      {pesanan.status === "Telah Disetujui" ? (
                        <a
                          href="buat link zoom ye"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "#2563eb", textDecoration: "underline" }}
                        >
                          https://its.ac.id/ZoomKonsultasi
                        </a>
                      ) : pesanan.status === "Menunggu Persetujuan" ? (
                        "Menunggu persetujuan psikolog"
                      ) : (
                        "Konsultasi ditolak"
                      )}
                    </span>
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

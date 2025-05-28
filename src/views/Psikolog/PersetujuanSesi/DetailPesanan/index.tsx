import { Button } from "react-bootstrap";
import styles from "./detail-sesi.module.css";
import Head from "next/head";
import DashboardLayout from "@/layouts/dashboard-psi";
import { Clock, ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/router";
import { dummyPersetujuanData } from "@/data/p-sesi";

interface StatusConfig {
  [key: string]: {
    color: string;
    backgroundColor: string;
    icon: string;
  };
}

const statusConfig: StatusConfig = {
  "Menunggu Persetujuan": {
    color: "#3b82f6",
    backgroundColor: "#dbeafe",
    icon: "clock",
  },
  "Telah Disetujui": {
    color: "#10b981",
    backgroundColor: "#d1fae5",
    icon: "check",
  },
  Ditolak: {
    color: "#ef4444",
    backgroundColor: "#fee2e2",
    icon: "x",
  },
};

// Mapping status dari number ke string
const mapStatusToText: Record<number, string> = {
  0: "Ditolak",
  1: "Menunggu Persetujuan",
  2: "Telah Disetujui",
};

export default function DetailPesananView({ id }: { id: string }) {
  const router = useRouter();

  // Cari pesanan berdasarkan ID dari data dummy
  const rawPesanan = dummyPersetujuanData.find((item) => item.id === id);

  if (!rawPesanan) {
    return <div style={{ padding: "2rem" }}>Pesanan tidak ditemukan.</div>;
  }

  // Convert raw pesanan dengan status yang sudah dimapping
  const pesanan = {
    ...rawPesanan,
    status: mapStatusToText[rawPesanan.status] || "Menunggu Persetujuan",
  };

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

  const handleApprove = () => {
    // Logic untuk menyetujui konsultasi
    console.log("Konsultasi disetujui untuk:", pesanan.namaMahasiswa);
    // TODO: Implementasi API call untuk approve
  };

  const handleReject = () => {
    // Logic untuk menolak konsultasi
    console.log("Konsultasi ditolak untuk:", pesanan.namaMahasiswa);
    // TODO: Implementasi API call untuk reject
  };

  return (
    <>
      <Head>
        <title>Detail Persetujuan Sesi | ITS-OK</title>
        <meta
          name="description"
          content="Halaman detail persetujuan sesi psikolog"
        />
        <link rel="icon" href="/logo/favicon.png" />
      </Head>
      <DashboardLayout>
        <div className={styles.pageWrapper}>
          <div className={styles.contentWrapper}>
            {/* Header dengan tombol kembali dan judul sejajar */}
            <section className={styles.headerSection}>
              <div className={styles.headerContent}>
                <h2 className={styles.pageTitle}>
                  Detail Persetujuan Sesi Konsultasi Online
                </h2>
                <Button onClick={handleBack} className={styles.backButton}>
                  <ArrowLeft size={20} />
                  Kembali
                </Button>
              </div>
            </section>

            {/* Detail Konsultasi */}
            <div className={styles.detailContainer}>
              <div className={styles.consultationHeader}>
                <h3 className={styles.consultationTitle}>
                  Konsultasi Online : {pesanan.namaMahasiswa}
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
                    <span className={styles.detailLabel}>NAMA MAHASISWA</span>
                    <span className={styles.detailValue}>
                      {pesanan.namaMahasiswa}
                    </span>
                  </div>
                </div>

                <div className={styles.detailRow}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>
                      JADWAL KONSULTASI
                    </span>
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
              {/* Action buttons */}
              <div className={styles.actionButtons}>
                <Button
                  variant="primary"
                  className={styles.approveButton}
                  onClick={handleApprove}
                >
                  Setujui
                </Button>
                <Button
                  variant="outline-danger"
                  className={styles.rejectButton}
                  onClick={handleReject}
                >
                  Tolak
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button } from "react-bootstrap";
import Head from "next/head";
import DashboardLayout from "@/layouts/dashboard";
import styles from "./detail-konsuloff.module.css";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface StatusConfig {
  [key: string]: {
    color: string;
    backgroundColor: string;
  };
}

const statusConfig: StatusConfig = {
  Terdaftar: {
    color: "green",
    backgroundColor: "#d1fae5",
  },
};

interface PesananData {
  namaPsikolog: string;
  tanggalPengajuan: string;
  tanggal: string;
  sesi: string;
  lokasi: string;
  keluhan: string;
  status: string;
}

export default function DetailPesananOfflineView() {
  const router = useRouter();
  const { id } = router.query;

  const [pesanan, setPesanan] = useState<PesananData | null>(null);
  const [loading, setLoading] = useState(true);

  const handleBack = () => router.back();

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const docRef = doc(db, "konsultasi_offline", String(id));
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setPesanan({
            namaPsikolog: data.namaPsikolog || "-",
            tanggalPengajuan: data.tanggalPengajuan?.toDate().toLocaleString() || "-",
            tanggal: data.tanggal || "-",
            sesi: data.sesi || "-",
            lokasi: data.lokasi || "-",
            keluhan: data.keluhan || "-",
            status: data.status || "Terdaftar",
          });
        } else {
          setPesanan(null);
        }
      } catch (err) {
        console.error("Gagal mengambil data detail:", err);
        setPesanan(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Terdaftar":
        return <CheckCircle size={16} />;
      // bisa tambahkan status lain nanti
      default:
        return null;
    }
  };

  if (loading) return <div style={{ padding: "2rem" }}>Memuat detail...</div>;
  if (!pesanan) return <div style={{ padding: "2rem" }}>Pesanan tidak ditemukan.</div>;

  return (
    <>
      <Head>
        <title>Konsultasi Offline | ITS-OK</title>
        <meta name="description" content="Halaman detail konsultasi offline mahasiswa" />
        <link rel="icon" href="/logo/favicon.png" />
      </Head>
      <DashboardLayout>
        <div className={styles.pageWrapper}>
          <div className={styles.contentWrapper}>
            <section className={styles.headerSection}>
              <div className={styles.headerContent}>
                <h2 className={styles.pageTitle}>Detail Konsultasi Offline</h2>
                <Button onClick={handleBack} className={styles.backButton}>
                  <ArrowLeft size={20} /> Kembali
                </Button>
              </div>
            </section>

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
                    <span className={styles.detailValue}>{pesanan.namaPsikolog}</span>
                  </div>
                </div>

                <div className={styles.detailRow}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>JADWAL KONSULTASI</span>
                    <span className={styles.detailValue}>{pesanan.tanggal}</span>
                  </div>
                </div>

                <div className={styles.detailRow}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>SESI KONSULTASI</span>
                    <span className={styles.detailValue}>{pesanan.sesi}</span>
                  </div>
                </div>

                <div className={styles.detailRow}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>LOKASI KONSULTASI</span>
                    <span className={styles.detailValue}>{pesanan.lokasi}</span>
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
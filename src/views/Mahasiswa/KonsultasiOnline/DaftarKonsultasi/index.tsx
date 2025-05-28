import { useRouter } from "next/router";
import Head from "next/head";
import DashboardLayout from "@/layouts/dashboard";
import styles from "./daftar-konsulonl.module.css";
import { Button, Form } from "react-bootstrap";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import SuccessOrder from "@/components/SuccessOrder";

// Dummy data psikolog
const dummyPsikolog = [
  { id: "1", nama: "dr. Ahmad Nabil Irawan" },
  { id: "2", nama: "dr. Farel Danendra S.T." },
  { id: "3", nama: "Afandi Wirawan, M.Psi." },
  { id: "4", nama: "dr. Arya Putra Tsabitah M.Pd." },
  { id: "5", nama: "dr. Zaidan Fawwazh." },
  { id: "6", nama: "dr. Reyhan Ilung." },
  { id: "7", nama: "dr. Khalid Wildan." },
  { id: "8", nama: "dr. Andika Insan Patria" },
];

export default function FormKonsultasiOnline() {
  const router = useRouter();
  const { nama, id } = router.query;

  const [selectedSesi, setSelectedSesi] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    namaPsikolog: "",
    tanggal: "",
    keluhan: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (typeof nama === "string") {
      setFormData((prev) => ({ ...prev, namaPsikolog: nama }));
    } else if (typeof id === "string") {
      const found = dummyPsikolog.find((p) => p.id === id);
      if (found) {
        setFormData((prev) => ({ ...prev, namaPsikolog: found.nama }));
      }
    }
  }, [nama, id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBack = () => {
    if (id) {
      router.push(`/mahasiswa/konsultasionline/detailpsikolog/${id}`);
    } else {
      router.push("/mahasiswa/konsultasionline");
    }
  };

  const handleSubmit = () => {
    if (!formData.tanggal || !selectedSesi || !formData.keluhan) return;

    console.log({ ...formData, sesi: selectedSesi });
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      router.push("/mahasiswa/konsultasionline");
    }, 2000);
  };

  const sesiList = ["10.00 – 11.30", "12.00 – 13.30", "14.00 – 15.30"];
  const isFormValid =
    formData.namaPsikolog && formData.tanggal && selectedSesi && formData.keluhan;

  return (
    <>
      <Head>
        <title>Konsultasi Online | ITS-OK</title>
        <meta name="description" content="Formulir daftar konsultasi online" />
        <link rel="icon" href="/logo/favicon.png" />
      </Head>
      <DashboardLayout>
        <div className={styles.pageWrapper}>
          <div className={styles.contentWrapper}>
            <section className={styles.headerSection}>
              <div className={styles.headerContent}>
                <h2 className={styles.pageTitle}>Daftar Konsultasi Online</h2>
                <Button onClick={handleBack} className={styles.backButton}>
                  <ArrowLeft size={20} /> Kembali
                </Button>
              </div>
            </section>

            <div className={styles.detailContainer}>
              <div className={styles.detailGrid}>
                <div className={styles.detailRow}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>NAMA PSIKOLOG</span>
                    <div className={styles.detailValue}>
                      {formData.namaPsikolog || "Tidak diketahui"}
                    </div>
                  </div>
                </div>

                <div className={styles.detailRow}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>JADWAL KONSULTASI</span>
                    <Form.Control
                      type="date"
                      name="tanggal"
                      value={formData.tanggal}
                      onChange={handleChange}
                    />
                  </div>

                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>SESI KONSULTASI</span>
                    <div className={styles.sesiButtonsWrapper}>
                      {sesiList.map((sesi) => (
                        <button
                          key={sesi}
                          type="button"
                          className={`${styles.sesiButton} ${
                            selectedSesi === sesi ? styles.selectedSesi : ""
                          }`}
                          onClick={() => setSelectedSesi(sesi)}
                        >
                          {sesi}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={styles.detailRow}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>KELUHAN PASIEN</span>
                    <Form.Control
                      as="textarea"
                      name="keluhan"
                      rows={4}
                      placeholder="Tuliskan keluhan anda disini......"
                      value={formData.keluhan}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.actionButtons}>
                <Button
                  type="button"
                  onClick={handleSubmit}
                  className={styles.confirmButton}
                  disabled={!isFormValid}
                >
                  Konfirmasi Pesanan
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>

      <SuccessOrder show={showSuccess} />
    </>
  );
}

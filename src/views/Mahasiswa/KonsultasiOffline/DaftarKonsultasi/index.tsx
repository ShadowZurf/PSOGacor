import { useRouter } from "next/router";
import Head from "next/head";
import DashboardLayout from "@/layouts/dashboard";
import styles from "./daftar-konsuloff.module.css";
import { Button, Form } from "react-bootstrap";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function FormKonsultasiOnline() {
  const router = useRouter();

  const [selectedSesi, setSelectedSesi] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    namaPsikolog: "",
    tanggal: "",
    keluhan: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBack = () => {
    router.push("/mahasiswa/konsultasioffline");
  };

  const handleSubmit = () => {
    console.log({ ...formData, sesi: selectedSesi });
    alert("Pesanan berhasil dikonfirmasi!");
  };

  const sesiList = ["10.00 – 11.30", "12.00 – 13.30", "14.00 – 15.30"];

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
                    <Form.Select
                      name="namaPsikolog"
                      value={formData.namaPsikolog}
                      onChange={handleChange}
                    >
                      <option value="">-- Pilih Psikolog --</option>
                      <option value="dr. Ahmad Nabil Irawan">dr. Ahmad Nabil Irawan</option>
                      <option value="dr. Farel Danendra S.T.">dr. Farel Danendra S.T.</option>
                      <option value="Afandi Wirawan Sutrisno, M.Psi.">
                        Afandi Wirawan Sutrisno, M.Psi.
                      </option>
                    </Form.Select>
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
                <Button type="button" onClick={handleSubmit} className={styles.confirmButton}>
                  Konfirmasi Pesanan
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}

import { useRouter } from "next/router";
import Head from "next/head";
import DashboardLayout from "@/layouts/dashboard";
import styles from "./daftar-konsuloff.module.css";
import { Button, Form } from "react-bootstrap";
import { ArrowLeft, XCircle } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import SuccessOrder from "@/components/SuccessOrder";
import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export default function FormKonsultasiOffline() {
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedSesi, setSelectedSesi] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [formData, setFormData] = useState({
    nama: "",
    nrp: "",
    jurusan: "",
    email: "",
    tanggal: "",
    keluhan: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isTuesdayOrThursday = (dateString: string): boolean => {
    const date = new Date(dateString);
    const day = date.getDay();
    return day === 2 || day === 4;
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    if (!isTuesdayOrThursday(selectedDate)) {
      setAlertMessage("Mohon pilih hari Selasa atau Kamis saja");
      setShowAlert(true);
      // Kosongkan tanggal agar user tidak bisa submit dengan tanggal salah
      setFormData((prev) => ({ ...prev, tanggal: "" }));
      return;
    }
    setFormData((prev) => ({ ...prev, tanggal: selectedDate }));
  };

  const handleBack = () => {
    router.push("/mahasiswa/konsultasioffline");
  };

  const handleSubmit = async () => {
    // Validasi semua field yang wajib diisi
    if (
      !formData.nama.trim() || // .trim() untuk menghapus spasi di awal/akhir
      !formData.nrp.trim() ||
      !formData.jurusan.trim() ||
      !formData.email.trim() ||
      !formData.tanggal ||
      !selectedSesi ||
      !formData.keluhan.trim() // Keluhan juga dianggap wajib
    ) {
      setAlertMessage("Mohon lengkapi semua data formulir terlebih dahulu.");
      setShowAlert(true);
      return; // Hentikan proses submit jika ada field kosong
    }

    try {
      await addDoc(collection(db, "konsultasi_offline"), {
        nama: formData.nama,
        nrp: formData.nrp,
        jurusan: formData.jurusan,
        email: formData.email,
        tanggal: formData.tanggal,
        sesi: selectedSesi,
        keluhan: formData.keluhan,
        status: "Terdaftar",
        tanggalPengajuan: Timestamp.now(),
        namaPsikolog: "SHCC ITS",
        lokasi: "Gedung PK2/SAC lantai 2 dekat kantin pusat",
      });

      setShowSuccess(true);
      setTimeout(() => {
        router.push("/mahasiswa/konsultasioffline");
      }, 2000);
    } catch (error) {
      console.error("Gagal menyimpan ke Firestore:", error);
      setAlertMessage("Gagal menyimpan data. Silakan coba lagi.");
      setShowAlert(true);
    }
  };

  const sesiList = ["09.00 – 10.30", "11.00 – 12.30", "13.30 – 15.00"];

  return (
    <>
      <Head>
        <title>Konsultasi Offline | ITS-OK</title>
        <meta name="description" content="Formulir daftar konsultasi offline" />
        <link rel="icon" href="/logo/favicon.png" />
      </Head>
      <DashboardLayout>
        <div className={styles.pageWrapper}>
          <div className={styles.contentWrapper}>
            <section className={styles.headerSection}>
              <div className={styles.headerContent}>
                <h2 className={styles.pageTitle}>Daftar Konsultasi Offline</h2>
                <Button onClick={handleBack} className={styles.backButton}>
                  <ArrowLeft size={20} /> Kembali
                </Button>
              </div>
            </section>

            <div className={styles.detailContainer}>
              <div className={styles.shccBanner}>
                <Image
                  src="/assets/SHCC.png"
                  alt="SHCC Banner"
                  width={220}
                  height={150}
                  className={styles.shccImage}
                />
                <div className={styles.shccText}>
                  <h3 className={styles.shccTitle}>Student Health Care Center</h3>
                  <p className={styles.shccDesc}>
                    Konsultasikan masalah mental health kamu{" "}
                    <span className={styles.greenText}>GRATIS!</span>
                    <br />
                    Dengan psikolog dari Dear Astrid di SHCC
                  </p>
                  <p className={styles.shccLocation}>
                    Lokasi :{" "}
                    <span className={styles.blueText}>
                      Lantai 2, Kantin Pusat ITS
                    </span>
                  </p>
                </div>
              </div>

              <div className={styles.detailGrid}>
                <div className={styles.detailRow}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>NAMA LENGKAP</span>
                    <Form.Control
                      type="text"
                      name="nama"
                      placeholder="Contoh: Jane Doe"
                      value={formData.nama}
                      onChange={handleChange}
                      required // Tambahkan atribut required HTML5
                    />
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>NRP</span>
                    <Form.Control
                      type="text"
                      name="nrp"
                      placeholder="Contoh: 502622XXXX"
                      value={formData.nrp}
                      onChange={handleChange}
                      required // Tambahkan atribut required HTML5
                    />
                  </div>
                </div>

                <div className={styles.detailRow}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>JURUSAN</span>
                    <Form.Control
                      type="text"
                      name="jurusan"
                      placeholder="Contoh: Sistem Informasi"
                      value={formData.jurusan}
                      onChange={handleChange}
                      required // Tambahkan atribut required HTML5
                    />
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>EMAIL</span>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="email@student.its.ac.id"
                      value={formData.email}
                      onChange={handleChange}
                      required // Tambahkan atribut required HTML5
                    />
                  </div>
                </div>

                <div className={styles.detailRow}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>JADWAL KONSULTASI</span>
                    <Form.Control
                      type="date"
                      name="tanggal"
                      value={formData.tanggal}
                      onChange={handleDateChange}
                      required // Tambahkan atribut required HTML5
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
                      required // Tambahkan atribut required HTML5
                    />
                  </div>
                </div>
              </div>

              <div className={styles.actionButtons}>
                <Button
                  type="button"
                  onClick={handleSubmit}
                  className={styles.confirmButton}
                >
                  Konfirmasi Pesanan
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>

      {/* Custom Alert */}
      {showAlert && (
        <div className={styles.customAlert}>
          <div className={styles.alertBox}>
            <div className={styles.alertIcon}>
              <XCircle size={48} color="#ef4444" strokeWidth={2.5} />
            </div>
            <p>{alertMessage}</p>
            <button onClick={() => setShowAlert(false)}>OK</button>
          </div>
        </div>
      )}

      <SuccessOrder show={showSuccess} />
    </>
  );
}
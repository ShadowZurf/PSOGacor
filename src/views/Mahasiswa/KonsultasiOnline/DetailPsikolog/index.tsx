import Head from "next/head";
import { useRouter } from "next/router";
import DashboardLayout from "@/layouts/dashboard";
import styles from "./detail-psikolog.module.css";
import Image from "next/image";
import { Button } from "react-bootstrap";
import { ArrowLeft } from "lucide-react";

const dummyPsikolog = [
  {
    id: "1",
    nama: "dr. Ahmad Nabil Irawan",
    rating: 5,
    foto: "/assets/psikolog2.png",
    sertifikasi: "004JKH5–678–PSI",
    deskripsi:
      "Seorang Public Speaker yang profesional memberikan edukasi terkait kesehatan mental, keturunan Bugis Makassar yang melanjutkan profesi Psikolog Klinis di Universitas Indonesia. Melakukan banyak penelitian terkait isu seksualitas dan gender. Mari berdiskusi jika kamu menghargai sebuah proses.",
    jadwal: "Senin & Kamis",
    sesi: ["10.00 – 11.30", "12.00 – 13.30", "14.00 – 15.30"],
  },
  {
    id: "2",
    nama: "dr. Farel Danendra S.T.",
    rating: 5,
    foto: "/assets/psikolog3.png",
    sertifikasi: "024APL5–913–PSI",
    deskripsi:
      "Seorang Dokter Profesional yang telah menangani berbagai kasus permasalahan anak muda dan remaja",
    jadwal: "Selasa & Jumat",
    sesi: ["10.00 – 11.30", "12.00 – 13.30", "14.00 – 15.30"],
  },
  {
    id: "3",
    nama: "Afandi Wirawan, M.Psi.",
    rating: 5,
    foto: "/assets/psikolog1.png",
    sertifikasi: "401MSP–321–PSI",
    deskripsi:
      "Seorang Magister Psikolog yang telah mengetahui berbagai masalah terkait mental dan emosional, merupakan fans manchester united sejati",
    jadwal: "Rabu & Sabtu",
    sesi: ["10.00 – 11.30", "12.00 – 13.30", "14.00 – 15.30"],
  },
];

export default function DetailPsikologView({ id }: { id: string }) {
  const router = useRouter();
  const psikolog = dummyPsikolog.find((p) => p.id === id);

  if (!psikolog) {
    return <div style={{ padding: "2rem" }}>Data psikolog tidak ditemukan.</div>;
  }

  const handleBack = () => {
    router.back();
  };

  const handleDaftar = () => {
  router.push(`/mahasiswa/konsultasionline/daftarkonsultasi?id=${psikolog.id}`);
  };

  return (
    <>
      <Head>
        <title>Detail Psikolog | ITS-OK</title>
        <meta name="description" content="Halaman detail profil psikolog" />
        <link rel="icon" href="/logo/favicon.png" />
      </Head>
      <DashboardLayout>
        <div className={styles.pageWrapper}>
          <div className={styles.headerLine}>
            <h2 className={styles.sectionTitle}>Detail Profil Psikolog</h2>
            <Button onClick={handleBack} className={styles.backButton}>
              <ArrowLeft size={20} />
              Kembali
            </Button>
          </div>

          <div className={styles.container}>
            <div className={styles.profileCard}>
              <div className={styles.profileTop}>
                <Image
                  src={psikolog.foto}
                  alt={psikolog.nama}
                  width={120}
                  height={120}
                  className={styles.avatar}
                />
                <div className={styles.profileInfo}>
                  <h3 className={styles.nama}>{psikolog.nama}</h3>
                  <p className={styles.subInfo}>Nomor Sertifikasi : {psikolog.sertifikasi}</p>
                  <p className={styles.subInfo}>Rating : {psikolog.rating.toFixed(1)}</p>
                </div>
              </div>

              <div className={styles.profileDetail}>
                <h5 className={styles.label}>Profil Psikolog</h5>
                <p className={styles.deskripsi}>{psikolog.deskripsi}</p>

                <h5 className={styles.label}>Jadwal Psikolog</h5>
                <p className={styles.subInfo}>{psikolog.jadwal}</p>

                <h5 className={styles.label}>Sesi Tersedia</h5>
                <div className={styles.sesiWrapper}>
                    {psikolog.sesi.map((item, idx) => (
                        <span key={idx} className={styles.sesiBox} style={{ cursor: "not-allowed", opacity: 0.6 }}>
                         {item}
                        </span>
                    ))}
                </div>
                <div className={styles.buttonWrapper}>
                    <Button className={styles.daftarButton} onClick={handleDaftar}>
                    Daftar Sekarang
                    </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}
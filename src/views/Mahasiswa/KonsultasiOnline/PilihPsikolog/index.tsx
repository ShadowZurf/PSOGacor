import Head from "next/head";
import { useRouter } from "next/router";
import DashboardLayout from "@/layouts/dashboard";
import styles from "./pilih-psikolog.module.css";
import { Button, Form } from "react-bootstrap";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const dummyPsikolog = [
  {
    id: "1",
    nama: "dr. Ahmad Nabil Irawan",
    rating: 5,
    foto: "/assets/psikolog2.png",
  },
  {
    id: "2",
    nama: "dr. Farel Danendra S.T.",
    rating: 5,
    foto: "/assets/psikolog3.png",
  },
  {
    id: "3",
    nama: "Afandi Wirawan, M.Psi.",
    rating: 5,
    foto: "/assets/psikolog1.png",
  },
  {
    id: "4",
    nama: "dr. Arya Putra Tsabitah M.Pd.",
    rating: 5,
    foto: "/assets/Psikolog4.png",
  },
  {
    id: "5",
    nama: "dr. Zaidan Fawwazh.",
    rating: 5,
    foto: "/assets/Psikolog5.webp",
  },
  {
    id: "6",
    nama: "dr. Reyhan Ilung.",
    rating: 3,
    foto: "/assets/Psikolog6.jpg",
  },
  {
    id: "7",
    nama: "dr. Khalid Wildan.",
    rating: 5,
    foto: "/assets/Psikolog7.webp",
  },
  {
    id: "8",
    nama: "dr. Andika Insan Patria",
    rating: 5,
    foto: "/assets/Psikolog8.png",
  },
];

export default function PilihPsikologPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleBack = () => {
    router.back();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredPsikolog = dummyPsikolog.filter((psikolog) =>
    psikolog.nama.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const goToDetail = (id: string) => {
    router.push(`/mahasiswa/konsultasionline/detailpsikolog/${id}`);
  };

  return (
    <>
      <Head>
        <title>Pilih Psikolog | ITS-OK</title>
        <meta name="description" content="Pilih psikolog konsultasi online" />
        <link rel="icon" href="/logo/favicon.png" />
      </Head>
      <DashboardLayout>
        <div className={styles.pageWrapper}>
          <div className={styles.headerLine}>
            <h2 className={styles.sectionTitle}>Daftar Konsultasi Online</h2>
            <Button onClick={handleBack} className={styles.backButton}>
              <ArrowLeft size={20} />
              Kembali
            </Button>
          </div>

          <div className={styles.cardContainer}>
            <h4 className={styles.subTitle}>Pilih Psikolog yang Tersedia</h4>
            <div className={styles.searchWrapper}>
              <Form.Control
                type="text"
                placeholder="Masukkan nama psikolog..."
                className={styles.searchInput}
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <Button variant="outline-secondary" className={styles.filterButton}>
                Filter
              </Button>
            </div>

            <div className={styles.psychologistGrid}>
              {filteredPsikolog.map((psikolog) => (
                <div
                  key={psikolog.id}
                  className={styles.psychologistCard}
                  onClick={() => goToDetail(psikolog.id)}
                  role="button"
                  style={{ cursor: "pointer" }}
                >
                  <div className={styles.imageWrapper}>
                    <Image
                      src={psikolog.foto}
                      alt={psikolog.nama}
                      width={100}
                      height={100}
                      className={styles.avatar}
                    />
                  </div>
                  <h5 className={styles.psychologistName}>{psikolog.nama}</h5>
                  <div className={styles.stars}>
                    {Array.from({ length: psikolog.rating }).map((_, i) => (
                      <span key={i}>⭐</span>
                    ))}
                  </div>
                </div>
              ))}

              {filteredPsikolog.length === 0 && (
                <p style={{ textAlign: "center", gridColumn: "1 / -1", marginTop: "1rem" }}>
                  Tidak ada psikolog ditemukan.
                </p>
              )}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}
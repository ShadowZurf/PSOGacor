import Head from "next/head";
import DashboardLayout from "@/layouts/dashboard";
import styles from "./lagutenang.module.css";
import { useState } from "react";
import { Form } from "react-bootstrap";
import Image from 'next/image'

interface LaguItem {
  id: string;
  judul: string;
  file: string;
  cover: string;
}

export default function LaguTenangMahasiswaPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const daftarLagu: LaguItem[] = [
    {
      id: "1",
      judul: "Melodi Senja",
      file: "/assets/audio/music1.mp3",
      cover: "/assets/audio/music1.png",
    },
    {
      id: "2",
      judul: "Langit Tenang",
      file: "/assets/audio/music2.mp3",
      cover: "/assets/audio/music2.png",
    },
    {
      id: "3",
      judul: "Pagi Damai",
      file: "/assets/audio/music3.mp3",
      cover: "/assets/audio/music3.png",
    },
    {
      id: "4",
      judul: "Sunyi Dalam Nada",
      file: "/assets/audio/music4.mp3",
      cover: "/assets/audio/music4.png",
    },
    {
      id: "5",
      judul: "Senandung Malam",
      file: "/assets/audio/music5.mp3",
      cover: "/assets/audio/music5.png",
    },
  ];

  const filteredLagu = daftarLagu.filter((lagu) =>
    lagu.judul.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Head>
        <title>Lagu Tenang | ITS-OK</title>
        <meta name="description" content="Halaman lagu-lagu tenang untuk relaksasi" />
        <link rel="icon" href="/logo/favicon.png" />
      </Head>

      <DashboardLayout>
        <div className={styles.pageWrapper}>
          <div className={styles.headerLine}>
            <h2 className={styles.sectionTitle}>Daftar Lagu Tenang</h2>
          </div>

          <div className={styles.searchBarContainer}>
            <Form.Control
              type="text"
              placeholder="Cari lagu tenang..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.wrapper}>
            {filteredLagu.map((lagu) => (
              <div key={lagu.id} className={styles.card}>
                <div className={styles.coverWrapper}>
                  <Image
                    src={lagu.cover}
                    alt={lagu.judul}
                    width={300}  // <-- HARUS kasih width & height di Next.js <Image />
                    height={300}
                    className={styles.coverImage}
                    onError={(e) => (e.currentTarget.src = "/assets/audio/placeholder.png")}
                  />
                </div>

                <div className={styles.content}>
                  <h3 className={styles.title}>{lagu.judul}</h3>
                  <audio controls className={styles.audioPlayer}>
                    <source src={lagu.file} type="audio/mpeg" />
                    Browsermu tidak mendukung pemutar audio.
                  </audio>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}

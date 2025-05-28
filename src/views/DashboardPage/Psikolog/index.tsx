import Head from "next/head";
import { Container, Row, Col, Button } from "react-bootstrap";
import styles from "./dashboard-psi.module.css";
import DashboardLayout from "@/layouts/dashboard-psi";
import Image from "next/image";

export default function PsikologDashboardPage() {
  return (
    <>
      <Head>
        <title>Dashboard Psikolog | ITS-OK</title>
        <meta
          name="description"
          content="Halaman utama dashboard untuk psikolog ITS-OK."
        />
        <link rel="icon" href="/logo/favicon.png" />
      </Head>
      <DashboardLayout>
        <div className={styles.pageWrapper}>
          <section className={styles.greetingSection}>
            <Container fluid="xl" className={styles.sectionContainer}>
              <h1 className={styles.greeting}>
                Selamat datang, dr. Ahmad Nabil Irawan
              </h1>
              <p className={styles.role}>Psikolog</p>
            </Container>
          </section>

          <section className={styles.serviceSectionWrapper}>
            <Container fluid="xl" className={styles.sectionContainer}>
              <div className={styles.serviceSection}>
                <h2 className={styles.serviceTitle}>
                  Mulai Kelola Layanan Konsultasi Anda
                </h2>
                <p className={styles.serviceSubtitle}>
                  Atur seluruh aktivitas konsultasi mulai dari menyetujui
                  pesanan konsultasi, memulai sesi online, dan mengatur jadwal
                  Anda.
                </p>

                <Row className={styles.cardRow}>
                  <Col md={6} lg={4} className="mb-4 d-flex">
                    <div className={`${styles.cardBox} d-flex flex-column`}>
                      <div className={styles.imagePlaceholder}>
                        <Image
                          src="/assets/gambar-persetujuan-sesi-pesanan.png"
                          alt="Persetujuan Sesi Pesanan"
                          // layout="fill"
                          objectFit="cover"
                          width={240}
                          height={10}
                        />
                      </div>
                      <h3 className={styles.cardTitle}>
                        Persetujuan Sesi Pesanan
                      </h3>
                      <p className={styles.cardText}>
                        Lihat dan setujui permintaan konsultasi dari pengguna
                        sesuai dengan jadwal dan ketersediaan Anda.
                      </p>
                      <Button
                        variant="primary"
                        className={`${styles.primaryButton} mt-auto`}
                        href="/psikolog/persetujuansesi"
                      >
                        Lihat Pesanan
                      </Button>
                    </div>
                  </Col>
                  <Col md={6} lg={4} className="mb-4 d-flex">
                    <div className={`${styles.cardBox} d-flex flex-column`}>
                      <div className={styles.imagePlaceholder}>
                        <Image
                          src="/assets/gambar-mulai-konsultasi-online.png"
                          alt="Mulai Konsultasi Online"
                          // layout="fill"
                          objectFit="cover"
                          width={240}
                          height={10}
                        />
                      </div>
                      <h3 className={styles.cardTitle}>
                        Mulai Konsultasi Online
                      </h3>
                      <p className={styles.cardText}>
                        Mulai sesi konsultasi online dan berikan pendampingan
                        kesehatan mental secara virtual kepada mahasiswa.
                      </p>
                      <Button
                        variant="primary"
                        className={`${styles.primaryButton} mt-auto`}
                        href="/psikolog/mulaikonsultasi"
                      >
                        Mulai
                      </Button>
                    </div>
                  </Col>
                  <Col md={6} lg={4} className="mb-4 d-flex">
                    <div className={`${styles.cardBox} d-flex flex-column`}>
                      <div className={styles.imagePlaceholder}>
                        <Image
                          src="/assets/gambar-atur-jadwal-konsultasi.png"
                          alt="Atur Jadwal Konsultasi"
                          // layout="fill"
                          objectFit="cover"
                          width={240}
                          height={10}
                        />
                      </div>
                      <h3 className={styles.cardTitle}>
                        Atur Jadwal Konsultasi
                      </h3>
                      <p className={styles.cardText}>
                        Atur dan perbarui ketersediaan jadwal Anda untuk sesi
                        konsultasi agar mahasiswa dapat memilih waktu yang
                        sesuai.
                      </p>
                      <Button
                        variant="primary"
                        className={`${styles.primaryButton} mt-auto`}
                      >
                        Lihat Jadwal
                      </Button>
                    </div>
                  </Col>
                </Row>
              </div>
            </Container>
          </section>
        </div>
      </DashboardLayout>
    </>
  );
}

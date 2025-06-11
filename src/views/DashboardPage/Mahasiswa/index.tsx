import Head from "next/head";
import { Container, Row, Col, Button } from "react-bootstrap";
import styles from "./dashboard-mhs.module.css";
import DashboardLayout from "@/layouts/dashboard";
import Image from "next/image";
import React from "react";


export default function MahasiswaDashboardPage() {
  return (
    <>
      <Head>
        <title>Dashboard Mahasiswa | ITS-OK</title>
        <meta
          name="description"
          content="Halaman utama dashboard untuk mahasiswa ITS-OK."
        />
        <link rel="icon" href="/logo/favicon.png" />
      </Head>
      <DashboardLayout>
        <div className={styles.pageWrapper}>
          <section className={styles.greetingSection}>
            <Container fluid="xl" className={styles.sectionContainer}>
              <h1 className={`${styles.greeting} ${styles.greetingAnimated}`}>
                Selamat datang di ITS-OK!
              </h1>
              <p className={`${styles.role} ${styles.greetingAnimated} ${styles.greetingAnimatedDelay}`}>
                Platform layanan kesehatan mental untuk mahasiswa ITS
              </p>
            </Container>
          </section>

          <section className={styles.serviceSectionWrapper}>
            <Container fluid="xl" className={styles.sectionContainer}>
              <div className={styles.serviceSection}>
                <h2 className={styles.serviceTitle}>
                  Pilih Layanan Sesuai Kebutuhan Anda
                </h2>
                <p className={styles.serviceSubtitle}>
                  Pilih layanan yang Anda butuhkan dan rasakan manfaat nyata
                  dari konsultasi offline atau terapi mandiri.
                </p>

                <Row className={styles.cardRow}>
                  {/* Daftar Konsultasi Offline */}
                  <Col md={6} lg={6} className="mb-4 d-flex">
                    <div className={`${styles.cardBox} d-flex flex-column`}>
                      <div className={styles.imagePlaceholder}>
                        <Image
                          src="/assets/gambar-daftar-konsultasi-offline.png"
                          alt="Konsultasi Offline"
                          objectFit="cover"
                          width={240}
                          height={10}
                        />
                      </div>
                      <h3 className={styles.cardTitle}>
                        Daftar Konsultasi Offline
                      </h3>
                      <p className={styles.cardText}>
                        Konsultasikan kesehatan mental Anda secara langsung
                        melalui konsultasi offline bersama psikolog dari SHCC
                        ITS.
                      </p>
                      <Button
                        variant="primary"
                        className={`${styles.primaryButton} mt-auto`}
                        href="/mahasiswa/konsultasioffline"
                      >
                        Daftar
                      </Button>
                    </div>
                  </Col>

                  {/* Lagu Tenang */}
                  <Col md={6} lg={6} className="mb-4 d-flex">
                    <div className={`${styles.cardBox} d-flex flex-column`}>
                      <div className={styles.imagePlaceholder}>
                        <Image
                          src="/assets/gambar-terapi-mandiri.png"
                          alt="Lagu Tenang"
                          objectFit="cover"
                          width={240}
                          height={10}
                        />
                      </div>
                      <h3 className={styles.cardTitle}>Lagu Tenang</h3>
                      <p className={styles.cardText}>
                        Dengarkan musik santai yang menenangkan hati untuk
                        membantu Anda mengelola stres dan meningkatkan suasana
                        hati.
                      </p>
                      <Button
                        variant="primary"
                        className={`${styles.primaryButton} mt-auto`}
                        href="/mahasiswa/lagutenang"
                      >
                        Mulai
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

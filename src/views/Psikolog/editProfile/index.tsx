import Head from "next/head";
import { Form, Button } from "react-bootstrap";
import styles from "./editprofile-psi.module.css";
import DashboardLayout from "@/layouts/dashboard-psi";

export default function EditProfilePsikolog() {
  return (
    <>
      <Head>
        <title>Pengaturan - Edit Profil | ITS-OK</title>
        <meta name="description" content="Edit profil psikolog ITS-OK." />
        <link rel="icon" href="/logo/favicon.png" />
      </Head>
      <DashboardLayout>
        <div className={styles.pageWrapper}>
          <div className={styles.contentWrapper}>
            {/* Judul Halaman */}
            <section className={styles.sectionTitleWrapper}>
              <h2 className={styles.pageTitle}>Edit Profil</h2>
            </section>
            {/* Form Edit Profil */}
            <div className={styles.formContainer}>
              <Form className={styles.profileForm}>
                {/* Email */}
                <Form.Group className={styles.formGroup} controlId="formEmail">
                  <Form.Label className={styles.formLabel}>EMAIL</Form.Label>
                  <Form.Control
                    type="email"
                    defaultValue="ahmadnabilirawan@mail.com"
                    disabled
                    className={styles.formControl}
                  />
                </Form.Group>
                {/* Username */}
                <Form.Group className={styles.formGroup} controlId="formUsername">
                  <Form.Label className={styles.formLabel}>USERNAME</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue="Ahmad Nabil Irawan"
                    className={styles.formControl}
                  />
                </Form.Group>
                {/* Jenis Kelamin */}
                <Form.Group className={styles.formGroup} controlId="formGender">
                  <Form.Label className={styles.formLabel}>JENIS KELAMIN</Form.Label>
                  <Form.Select className={styles.formControl} defaultValue="Laki - laki">
                    <option value="Laki - laki">Laki – laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </Form.Select>
                </Form.Group>
                {/* Umur */}
                <Form.Group className={styles.formGroup} controlId="formUmur">
                  <Form.Label className={styles.formLabel}>UMUR</Form.Label>
                  <Form.Control
                    type="number"
                    min={18}
                    max={99}
                    defaultValue="24"
                    className={styles.formControl}
                  />
                </Form.Group>
                {/* Nomor Sertifikasi */}
                <Form.Group className={styles.formGroup} controlId="formSertif">
                  <Form.Label className={styles.formLabel}>NOMOR SERTIFIKASI</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue="Nomor Sertifikasi : 004.JKH5-678-PSI"
                    className={styles.formControl}
                  />
                </Form.Group>
                {/* Deskripsi Profil */}
                <Form.Group className={styles.formGroup} controlId="formDeskripsi">
                  <Form.Label className={styles.formLabel}>DESKRIPSI PROFIL</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    defaultValue="Seorang Public Speaker yang profesional memberikan edukasi terkait kesehatan mental, keturunan Bugis Makassar yang melanjutkan profesi Psikolog Klinis di Universitas Indonesia. Melakukan banyak penelitian terkait isu seksualitas dan gender. Mari berdiskusi jika kamu menghargai sebuah proses."
                    className={styles.formControl}
                  />
                </Form.Group>
                {/* Simpan Button */}
                <div className="d-flex justify-content-end mt-4">
                  <Button type="submit" className={styles.saveButton}>
                    Simpan
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}

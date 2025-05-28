import Head from "next/head";
import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import styles from "./edit-profil-mhs.module.css";
import DashboardLayout from "@/layouts/dashboard";

export default function EditProfilMahasiswa() {
  // State untuk form
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [umur, setUmur] = useState<number | "">("");

  // Simulasi fetch data user (nanti ganti dengan fetch dari API/backend)
  useEffect(() => {
    const fetchData = async () => {
      // Contoh data dummy dari backend
      const userData = {
        email: "ahmadnabilkurniawan@email.com",
        username: "Nabil Irawan Kurniawan",
        jenisKelamin: "Laki - laki",
        umur: 17,
      };

      setEmail(userData.email);
      setUsername(userData.username);
      setJenisKelamin(userData.jenisKelamin);
      setUmur(userData.umur);
    };

    fetchData();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Nanti kirim data ke backend di sini
    console.log({ email, username, jenisKelamin, umur });
  };

  return (
    <>
      <Head>
        <title>Edit Profil Mahasiswa | ITS-OK</title>
        <meta name="description" content="Halaman edit profil mahasiswa" />
        <link rel="icon" href="/logo/favicon.png" />
      </Head>
      <DashboardLayout>
        <div className={styles.pageWrapper}>
          <div className={styles.headerLine}>
            <h2 className={styles.sectionTitle}>Edit Profil</h2>
          </div>
          <div className={styles.formWrapper}>
            <div className={styles.formContainer}>
              <Form onSubmit={handleSubmit}>
                {/* Email */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className={styles.formLabel}>EMAIL</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    readOnly
                    className={styles.formControl}
                  />
                </Form.Group>

                {/* Username */}
                <Form.Group className="mb-3" controlId="formBasicUsername">
                  <Form.Label className={styles.formLabel}>USERNAME</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={styles.formControl}
                  />
                </Form.Group>

                {/* Jenis Kelamin (Dropdown) */}
                <Form.Group className="mb-3" controlId="formBasicGender">
                  <Form.Label className={styles.formLabel}>JENIS KELAMIN</Form.Label>
                  <Form.Select
                    value={jenisKelamin}
                    onChange={(e) => setJenisKelamin(e.target.value)}
                    className={styles.formControl}
                  >
                    <option value="Laki - laki">Laki - laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </Form.Select>
                </Form.Group>

                {/* Umur */}
                <Form.Group className="mb-3" controlId="formBasicAge">
                  <Form.Label className={styles.formLabel}>UMUR</Form.Label>
                  <Form.Control
                    type="number"
                    value={umur}
                    onChange={(e) => setUmur(Number(e.target.value))}
                    className={styles.formControl}
                  />
                </Form.Group>

                <div className={styles.buttonContainer}>
                  <Button variant="primary" type="submit" className={styles.saveButton}>
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

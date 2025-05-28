import Head from "next/head";
import DashboardLayout from "@/layouts/dashboard";
import styles from "./riwayatpesanan-mhs.module.css";
import NoOrderMahasiswa from "@/components/NoRiwayat/Mahasiswa";
import PaginationComponent from "@/components/Pagination/Mahasiswa";
import RiwayatPesananMahasiswa from "@/components/Order/RiwayatPesanan/Mahasiswa";
import { useState } from "react";
import { Form } from "react-bootstrap";

interface RiwayatItem {
  id: string;
  namaPemesan: string;
  tanggal: string;
  sesi: string;
}

export default function RiwayatPesananMahasiswaPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const [daftarRiwayat] = useState<RiwayatItem[]>([
    {
      id: "1",
      namaPemesan: "dr. Europa",
      tanggal: "22 Mei 2025",
      sesi: "Sesi 1 (09.00 - 10.30)",
    },
    {
      id: "2",
      namaPemesan: "dr. Jlem M.Eng",
      tanggal: "26 Mei 2025",
      sesi: "Sesi 2 (13.00 - 14.30)",
    },
    {
      id: "3",
      namaPemesan: "dr. P S.T.",
      tanggal: "27 Mei 2025",
      sesi: "Sesi 1 (09.00 - 10.30)",
    },
    {
      id: "4",
      namaPemesan: "dr. Hendrick S.Kom",
      tanggal: "28 Mei 2025",
      sesi: "Sesi 2 (13.00 - 14.30)",
    },
    {
      id: "5",
      namaPemesan: "dr. Tes S.T.",
      tanggal: "29 Mei 2025",
      sesi: "Sesi 2 (13.00 - 14.30)",
    },
  ]);

  const [isLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const filteredRiwayat = daftarRiwayat.filter((item) =>
    item.namaPemesan.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredRiwayat.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const currentTableData = filteredRiwayat.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <Head>
        <title>Riwayat Konsultasi | ITS-OK</title>
        <meta name="description" content="Halaman riwayat konsultasi mahasiswa" />
        <link rel="icon" href="/logo/favicon.png" />
      </Head>
      <DashboardLayout>
        <div className={styles.pageWrapper}>
          <div className={styles.headerLine}>
            <h2 className={styles.sectionTitle}>
              Riwayat Konsultasi Online Anda
            </h2>
          </div>

          <div className={styles.searchBarContainer}>
            <Form.Control
              type="text"
              placeholder="Cari riwayat konsultasi..."
              value={searchQuery}
              onChange={handleSearchChange}
              className={styles.searchInput}
            />
          </div>

          {isLoading ? (
            <div style={{ textAlign: "center", margin: "2rem 0" }}>
              Memuat data riwayat...
            </div>
          ) : currentTableData.length === 0 ? (
            <NoOrderMahasiswa />
          ) : (
            <RiwayatPesananMahasiswa data={currentTableData} />
          )}

          {totalPages > 1 && !isLoading && (
            <PaginationComponent
              currentPage={currentPage}
              totalPages={totalPages}
              isLoading={isLoading}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </DashboardLayout>
    </>
  );
}

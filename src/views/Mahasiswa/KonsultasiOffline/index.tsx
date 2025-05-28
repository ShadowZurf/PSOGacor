import Head from "next/head";
import DashboardLayout from "@/layouts/dashboard";
import styles from "./konsuloff-mhs.module.css";
import { Button } from "react-bootstrap";
import { Plus } from "lucide-react";
import NoOrderMahasiswa from "@/components/NoOrder/Mahasiswa";
import OrderMahasiswa from "@/components/Order/KonsultasiOffline"; // Pastikan komponen ini ada
import PaginationComponent from "@/components/Pagination/Mahasiswa";
import { useState } from "react";
import { useRouter } from "next/router";

interface SesiData {
  id: string;
  namaPemesan: string;
  tanggal: string;
  sesi: string;
  status: "terdaftar";
}

export default function KonsultasiOfflineMahasiswa() {
  const [orderData] = useState<SesiData[]>([
    {
      id: "1",
      namaPemesan: "SHCC ITSSS",
      tanggal: "24 Mei 2025",
      sesi: "Sesi 1 (08.00 - 09.30)",
      status: "terdaftar",
    },
    {
      id: "2",
      namaPemesan: "SHCC ITS",
      tanggal: "25 Mei 2025",
      sesi: "Sesi 2 (10.00 - 11.30)",
      status: "terdaftar",
    },
    {
      id: "3",
      namaPemesan: "SHCC ITS",
      tanggal: "26 Mei 2025",
      sesi: "Sesi 3 (13.00 - 14.30)",
      status: "terdaftar",
    },
    {
      id: "4",
      namaPemesan: "SHCC ITS",
      tanggal: "27 Mei 2025",
      sesi: "Sesi 1 (08.00 - 09.30)",
      status: "terdaftar",
    },
    {
      id: "5",
      namaPemesan: "SHCC ITS",
      tanggal: "28 Mei 2025",
      sesi: "Sesi 2 (10.00 - 11.30)",
      status: "terdaftar",
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(orderData.length / itemsPerPage);
  const [isLoading] = useState(false);

  const router = useRouter();

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const currentPageData = orderData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <Head>
        <title>Konsultasi Offline | ITS-OK</title>
        <meta name="description" content="Halaman konsultasi offline mahasiswa" />
        <link rel="icon" href="/logo/favicon.png" />
      </Head>
      <DashboardLayout>
        <div className={styles.pageWrapper}>
          <div className={styles.headerLine}>
            <h2 className={styles.sectionTitle}>Pesanan Konsultasi Offline Anda</h2>
            <Button
              className={styles.registerButton}
              onClick={() => router.push("/mahasiswa/konsultasioffline/daftarkonsultasi")}
            >
              <Plus size={16} className={styles.plusIcon} />
              Daftar Konsultasi Offline
            </Button>
          </div>

          {orderData.length === 0 ? (
            <NoOrderMahasiswa />
          ) : (
            <>
              <OrderMahasiswa data={currentPageData} />
              <PaginationComponent
                currentPage={currentPage}
                totalPages={totalPages}
                isLoading={isLoading}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </DashboardLayout>
    </>
  );
}

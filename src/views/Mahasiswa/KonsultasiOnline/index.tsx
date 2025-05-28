import Head from "next/head";
import DashboardLayout from "@/layouts/dashboard";
import styles from "./konsulonline-mhs.module.css";
import { Button } from "react-bootstrap";
import { Plus } from "lucide-react";
import NoOrderMahasiswa from "@/components/NoOrder/Mahasiswa";
import OrderMahasiswa from "@/components/Order/KonsultasiOnline";
import PaginationComponent from "@/components/Pagination/Mahasiswa";
import { useState } from "react";
import { useRouter } from "next/router"; // Tambahkan router

interface SesiData {
  id: string;
  namaPemesan: string;
  tanggal: string;
  sesi: string;
  status: "menunggu" | "disetujui" | "ditolak";
}

export default function KonsultasiOnlineMahasiswa() {
  const [orderData] = useState<SesiData[]>([
    {
      id: "1",
      namaPemesan: "dr. Ahmad Nabil Irawan",
      tanggal: "25 Mei 2025",
      sesi: "Sesi 1 (09.00 - 10.30)",
      status: "menunggu",
    },
    {
      id: "2",
      namaPemesan: "dr. Farel Danendra S.T.",
      tanggal: "26 Mei 2025",
      sesi: "Sesi 2 (13.00 - 14.30)",
      status: "disetujui",
    },
    {
      id: "3",
      namaPemesan: "Afandi Wirawan Sutrisno, M.Psi.",
      tanggal: "27 Mei 2025",
      sesi: "Sesi 3 (15.00 - 16.30)",
      status: "ditolak",
    },
    {
      id: "4",
      namaPemesan: "dr. Arya Putra Tsabitah M.Pd.",
      tanggal: "28 Mei 2025",
      sesi: "Sesi 1 (09.00 - 10.30)",
      status: "menunggu",
    },
    {
      id: "5",
      namaPemesan: "dr. Zaidan Fawwazh.",
      tanggal: "28 Mei 2025",
      sesi: "Sesi 1 (09.00 - 10.30)",
      status: "menunggu",
    },
    {
      id: "6",
      namaPemesan: "dr. Reyhan Ilung.",
      tanggal: "28 Mei 2025",
      sesi: "Sesi 1 (09.00 - 10.30)",
      status: "menunggu",
    },
    {
      id: "7",
      namaPemesan: "dr. Khalid Wildan.",
      tanggal: "28 Mei 2025",
      sesi: "Sesi 1 (09.00 - 10.30)",
      status: "menunggu",
    },
    {
      id: "8",
      namaPemesan: "dr. Andika Insan Patria.",
      tanggal: "28 Mei 2025",
      sesi: "Sesi 1 (09.00 - 10.30)",
      status: "menunggu",
    },
    {
      id: "9",
      namaPemesan: "dr. Christoper Carlos.",
      tanggal: "28 Mei 2025",
      sesi: "Sesi 1 (09.00 - 10.30)",
      status: "menunggu",
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(orderData.length / itemsPerPage);
  const [isLoading] = useState(false);

  const router = useRouter(); // Inisialisasi router

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
        <title>Konsultasi Online | ITS-OK</title>
        <meta name="description" content="Halaman konsultasi online mahasiswa" />
        <link rel="icon" href="/logo/favicon.png" />
      </Head>
      <DashboardLayout>
        <div className={styles.pageWrapper}>
          <div className={styles.headerLine}>
            <h2 className={styles.sectionTitle}>Pesanan Konsultasi Online Anda</h2>
            <Button
              className={styles.registerButton}
              onClick={() => router.push("/mahasiswa/konsultasionline/pilihpsikolog")}
            >
              <Plus size={16} className={styles.plusIcon} />
              Daftar Sekarang
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

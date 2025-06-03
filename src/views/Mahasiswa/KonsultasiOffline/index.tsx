import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import DashboardLayout from "@/layouts/dashboard";
import styles from "./konsuloff-mhs.module.css";
import { Button } from "react-bootstrap";
import { Plus } from "lucide-react";
import NoOrderMahasiswa from "@/components/NoOrder/Mahasiswa";
import OrderMahasiswa from "@/components/Order/KonsultasiOffline";
import PaginationComponent from "@/components/Pagination/Mahasiswa";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

interface SesiData {
  id: string;
  namaPemesan: string;
  tanggal: string;
  sesi: string;
  status: "terdaftar";
}

// Helper untuk format tanggal Indonesia
function formatTanggalIndo(tanggal: string) {
  const bulanIndo = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  const dateObj = new Date(tanggal);
  if (isNaN(dateObj.getTime())) return tanggal; // fallback jika error
  const d = dateObj.getDate();
  const m = bulanIndo[dateObj.getMonth()];
  const y = dateObj.getFullYear();
  return `${d.toString().padStart(2, "0")} ${m} ${y}`;
}

export default function KonsultasiOfflineMahasiswa() {
  const [orderData, setOrderData] = useState<SesiData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await getDocs(collection(db, "konsultasi_offline"));
        const result: SesiData[] = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            namaPemesan: "Konsultasi Offline",
            tanggal: data.tanggal || "-",
            sesi: data.sesi || "-",
            status: "terdaftar" as const,
          };
        });
        setOrderData(result);
      } catch (err) {
        console.error("Gagal mengambil data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Sort & pagination
  const sortedData = [...orderData].sort(
    (a, b) => new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime()
  );
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const currentPageData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Group by tanggal (string: array of SesiData)
  const groupedByTanggal: { [key: string]: SesiData[] } = {};
  currentPageData.forEach((item) => {
    if (!groupedByTanggal[item.tanggal]) groupedByTanggal[item.tanggal] = [];
    groupedByTanggal[item.tanggal].push(item);
  });
  const tanggalList = Object.keys(groupedByTanggal).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
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

          {isLoading ? (
            <p style={{ padding: "1rem" }}>Memuat data...</p>
          ) : orderData.length === 0 ? (
            <NoOrderMahasiswa />
          ) : (
            <>
              <div>
                {tanggalList.map((tanggal) => (
                  <div key={tanggal} style={{ marginBottom: "2rem" }}>
                    <h6 className={styles.dateGroupLabel}>
                      {formatTanggalIndo(tanggal)}
                    </h6>
                    <OrderMahasiswa data={groupedByTanggal[tanggal]} />
                  </div>
                ))}
              </div>
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

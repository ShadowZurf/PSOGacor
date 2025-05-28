import Head from "next/head";
import DashboardLayout from "@/layouts/dashboard-psi";
import styles from "./riwayatpesanan-psi.module.css";
import NoOrderPsikolog from "@/components/NoRiwayat/Psikolog";
import { useState, useMemo } from "react";
import { Form, Pagination } from "react-bootstrap";

interface RiwayatItem {
  id: number | string;
  title: string;
}

export default function RiwayatPesananPsikologPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [daftarRiwayat] = useState<RiwayatItem[]>([
    { id: 1, title: "Konsultasi dengan Psikolog A - 20 Mei 2025" },
    { id: 2, title: "Sesi Psikolog B - 15 Mei 2025" },
    { id: 3, title: "Konsultasi Emosi Psikolog C" },
    { id: 4, title: "Tes Kepribadian - Psikolog D" },
    { id: 5, title: "Sesi Refleksi Diri Psikolog E" },
    { id: 6, title: "Diskusi Kasus - Psikolog F" },
    { id: 7, title: "Sesi Coaching - Psikolog G" },
    { id: 8, title: "Evaluasi Diri - Psikolog H" },
    { id: 9, title: "Terapi Perilaku - Psikolog I" },
    { id: 1, title: "Konsultasi dengan Psikolog A - 20 Mei 2025" },
    { id: 2, title: "Sesi Psikolog B - 15 Mei 2025" },
    { id: 3, title: "Konsultasi Emosi Psikolog C" },
    { id: 4, title: "Tes Kepribadian - Psikolog D" },
    { id: 5, title: "Sesi Refleksi Diri Psikolog E" },
    { id: 6, title: "Diskusi Kasus - Psikolog F" },
    { id: 7, title: "Sesi Coaching - Psikolog G" },
    { id: 8, title: "Evaluasi Diri - Psikolog H" },
    { id: 9, title: "Terapi Perilaku - Psikolog I" },
  ]);
  const [isLoading] = useState(false); 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

 
  const filteredRiwayat = useMemo(() => {
    if (!searchQuery) {
      return daftarRiwayat;
    }
    const lowerCaseQuery = searchQuery.toLowerCase();
    return daftarRiwayat.filter((item) =>
      item.title?.toLowerCase().includes(lowerCaseQuery)
    );
  }, [daftarRiwayat, searchQuery]);

  
  const totalPages = useMemo(() => {
    return Math.ceil(filteredRiwayat.length / itemsPerPage);
  }, [filteredRiwayat.length, itemsPerPage]);

  
  const currentTableData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredRiwayat.slice(startIndex, endIndex);
  }, [filteredRiwayat, currentPage, itemsPerPage]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); 
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPaginationControls = () => {
    if (totalPages <= 1 || isLoading) return null;

    const pageNumbers = [];
    
    const maxPageButtons = 5; 
    let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

    if (endPage - startPage + 1 < maxPageButtons) {
      startPage = Math.max(1, endPage - maxPageButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }

    return (
      <div className={styles.paginationContainer}>
        <Pagination className={styles.customPagination}>
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt; Previous
          </Pagination.Prev>
          {startPage > 1 && <Pagination.Item disabled>...</Pagination.Item>}
          {pageNumbers}
          {endPage < totalPages && <Pagination.Item disabled>...</Pagination.Item>}
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next &gt;
          </Pagination.Next>
        </Pagination>
      </div>
    );
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div style={{ textAlign: 'center', margin: '2rem 0' }}>
          Loading historical data...
        </div>
      );
    }

    if (filteredRiwayat.length === 0 && searchQuery === "") {
      return <NoOrderPsikolog />;
    }

    if (currentTableData.length === 0 && searchQuery !== "") {
        return (
        <div style={{ textAlign: 'center', margin: '2rem 0' }}>
         Riwayat Tidak Ditemukan.
        </div>
        );
    }

    if (currentTableData.length === 0 && filteredRiwayat.length > 0) {
      return (
        <div style={{ textAlign: 'center', margin: '2rem 0' }}>
          No history found on this page.
        </div>
      );
    }

    return (
      <div className={styles.resultContainer}>
        {currentTableData.map((item) => (
          <div key={item.id} className={styles.resultItem}>
            {item.title}
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>Riwayat Konsultasi | ITS-OK</title>
        <meta name="description" content="Student consultation history page" />
        <link rel="icon" href="/logo/favicon.png" />
      </Head>
      <DashboardLayout>
        <div className={styles.pageWrapper}>
          <div className={styles.headerLine}>
            <h2 className={styles.sectionTitle}>Riwayat Konsultasi Online Anda</h2>
          </div>

          <div className={styles.searchBarContainer}>
            <Form.Control
              type="text"
              placeholder="Cari Riwayat Konsultasi..."
              value={searchQuery}
              onChange={handleSearchChange}
              className={styles.searchInput}
            />
          </div>

          {renderContent()}
          {renderPaginationControls()}
        </div>
      </DashboardLayout>
    </>
  );
}
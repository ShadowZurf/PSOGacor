import Head from "next/head";
import DashboardLayout from "@/layouts/dashboard-psi";
import styles from "./persetujuansesi-psi.module.css";
import NoOrderPsikolog from "@/components/NoOrder/Psikolog";
import OrderPsikolog from "@/components/Order/PersetujuanSesi";
import PaginationComponent from "@/components/Pagination/Psikolog";
import { useState } from "react";
import { dummyPersetujuanData, Pesanan as RawSesiData } from "@/data/p-sesi";

interface SesiData extends Omit<RawSesiData, "status"> {
  status: "menunggu" | "disetujui" | "ditolak";
}

const mapStatus: Record<number, "menunggu" | "disetujui" | "ditolak"> = {
  0: "ditolak",
  1: "menunggu",
  2: "disetujui",
};

export default function PersetujuanSesiPsikolog() {
  const [sesiData] = useState<SesiData[]>(
    dummyPersetujuanData.map((data) => ({
      ...data,
      status: mapStatus[data.status] || "menunggu",
    }))
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [isLoading] = useState(false);

  const totalPages = Math.ceil(sesiData.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const currentPageData = sesiData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <Head>
        <title>Persetujuan Sesi | ITS-OK</title>
        <meta name="description" content="Halaman persetujuan sesi psikolog" />
        <link rel="icon" href="/logo/favicon.png" />
      </Head>
      <DashboardLayout>
        <div className={styles.pageWrapper}>
          <div className={styles.headerLine}>
            <h2 className={styles.sectionTitle}>
              Persetujuan Sesi Konsultasi Online Anda
            </h2>
          </div>
          {sesiData.length === 0 ? (
            <NoOrderPsikolog />
          ) : (
            <>
              <OrderPsikolog data={currentPageData} />
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

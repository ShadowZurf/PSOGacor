import React, { useState } from "react";
import Link from "next/link";
import styles from "./konsultasi-offline.module.css";
import { UsersRound, CheckCircle, Trash2 } from "lucide-react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface SesiData {
  id: string;
  namaPemesan: string;
  tanggal: string;
  sesi: string;
  status: "terdaftar";
}

interface OrderMahasiswaProps {
  data?: SesiData[];
  detailLinkPrefix?: string; // default: /mahasiswa/konsultasi/detailpesanan/
}

const OrderMahasiswa: React.FC<OrderMahasiswaProps> = ({
  data = [],
  detailLinkPrefix = "/mahasiswa/konsultasioffline/detailpesanan/", // default path
}) => {
  const getStatusConfig = (status: SesiData["status"]) => {
    switch (status) {
      case "terdaftar":
        return {
          text: "Terdaftar",
          color: "green",
          icon: CheckCircle,
        };
      default:
        return {
          text: "Terdaftar",
          color: "green",
          icon: CheckCircle,
        };
    }
  };

const [hoveredId, setHoveredId] = useState<string | null>(null);

  if (data.length === 0) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <div className={styles.iconContainer}>
            <UsersRound size={24} className={styles.icon} />
          </div>
          <span className={styles.message}>Tidak Ada Pesanan</span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      {data.map((sesi) => {
        const statusConfig = getStatusConfig(sesi.status);
        const StatusIcon = statusConfig.icon;

        const handleDelete = async (
          e: React.MouseEvent<HTMLButtonElement, MouseEvent>
        ) => {
          e.preventDefault(); // prevent link click
          if (confirm("Yakin ingin menghapus pesanan ini?")) {
            await deleteDoc(doc(db, "konsultasi_offline", sesi.id));
            location.reload(); // refresh list
          }
        };

        return (
          <Link
            key={sesi.id}
            href={`${detailLinkPrefix}${sesi.id}`}
            className={styles.cardLink}
            onMouseEnter={() => setHoveredId(sesi.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className={styles.card}>
              <div className={styles.iconContainer}>
                <UsersRound size={24} className={styles.icon} />
              </div>

              <div className={styles.content}>
                <h3 className={styles.title}>Konsultasi Offline</h3>
                <p className={styles.dateTime}>
                  {sesi.tanggal} | {sesi.sesi}
                </p>
                <div className={`${styles.status} ${styles[statusConfig.color]}`}>
                  <StatusIcon size={16} className={styles.statusIcon} />
                  {statusConfig.text}
                </div>
              </div>

              {hoveredId === sesi.id && (
                <button
                  className={styles.deleteButton}
                  onClick={handleDelete}
                  title="Hapus"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default OrderMahasiswa;

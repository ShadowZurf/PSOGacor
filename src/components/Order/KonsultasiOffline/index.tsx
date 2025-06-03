import React, { useState } from "react";
import Link from "next/link";
import styles from "./konsultasi-offline.module.css";
import { UsersRound, CheckCircle, Trash2, XCircle, CheckCircle2 } from "lucide-react";
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
  detailLinkPrefix?: string;
}

const OrderMahasiswa: React.FC<OrderMahasiswaProps> = ({
  data = [],
  detailLinkPrefix = "/mahasiswa/konsultasioffline/detailpesanan/",
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const getStatusConfig = () => {
    return {
      text: "Terdaftar",
      color: "green",
      icon: CheckCircle,
    };
  };

  const handleDeleteRequest = (id: string) => {
    setSelectedId(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    if (selectedId) {
      await deleteDoc(doc(db, "konsultasi_offline", selectedId));
      setShowConfirm(false);
      setShowSuccess(true);
      setTimeout(() => {
        location.reload();
      }, 1500);
    }
  };

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
    <>
      <div className={styles.wrapper}>
        {data.map((sesi) => {
          const statusConfig = getStatusConfig();
          const StatusIcon = statusConfig.icon;

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
                    onClick={(e) => {
                      e.preventDefault();
                      handleDeleteRequest(sesi.id);
                    }}
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

      {/* Modal Konfirmasi */}
      {showConfirm && (
        <div className={styles.customAlert}>
          <div className={styles.alertBox}>
            <div className={styles.alertIcon}>
              <XCircle size={48} color="#ef4444" strokeWidth={2.5} />
            </div>
            <p>Yakin ingin menghapus pesanan ini?</p>
            <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
              <button onClick={confirmDelete}>Ya</button>
              <button onClick={() => setShowConfirm(false)} style={{ backgroundColor: "#d1d5db", color: "#1f2937" }}>
                Tidak
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Sukses */}
      {showSuccess && (
        <div className={styles.customAlert}>
          <div className={styles.alertBox}>
            <div className={styles.alertIcon}>
              <CheckCircle2 size={64} color="#22c55e" />
            </div>
            <p>Pesanan Berhasil Terhapus!</p>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderMahasiswa;

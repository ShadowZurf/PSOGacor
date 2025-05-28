import { useRouter } from "next/router";
import DetailRiwayatView from "@/views/Mahasiswa/RiwayatPesanan/DetailRiwayat";

export default function DetailRiwayatPage() {
  const { id } = useRouter().query;

  if (!id || typeof id !== "string") {
    return <div style={{ padding: "2rem" }}>Memuat detail riwayat...</div>;
  }

  return <DetailRiwayatView id={id} />;
}
import { useRouter } from "next/router";
import DetailPesananView from "@/views/Mahasiswa/KonsultasiOnline/DetailPesanan";

export default function DetailPesananPage() {
  const router = useRouter();
  const { id } = router.query;

  // Tambahkan pengecekan saat `id` belum tersedia
  if (!id || typeof id !== 'string') {
    return <div style={{ padding: "2rem" }}>Memuat detail pesanan...</div>;
  }

  return <DetailPesananView id={id} />;
}

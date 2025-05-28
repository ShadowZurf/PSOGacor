import { useRouter } from "next/router";
import DetailPsikologView from "@/views/Mahasiswa/KonsultasiOnline/DetailPsikolog";

export default function DetailPsikologPage() {
  const { id } = useRouter().query;

  if (!id || typeof id !== "string") {
    return <div style={{ padding: "2rem" }}>Memuat detail psikolog...</div>;
  }

  return <DetailPsikologView id={id} />;
}
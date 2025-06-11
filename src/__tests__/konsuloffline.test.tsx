import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import KonsultasiOfflineMahasiswa from "@/views/Mahasiswa/KonsultasiOffline";
import * as firestore from "firebase/firestore";
import { useRouter } from "next/router";

// ---- Type untuk Order ----
type SesiData = {
  id: string;
  namaPemesan: string;
  tanggal: string;
  sesi: string;
  status: string;
};

// ---- Mock Firestore ----
jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  getDocs: jest.fn(),
  deleteDoc: jest.fn(),
  doc: jest.fn(),
  getFirestore: jest.fn(() => ({})),
}));

// ---- Mock useRouter ----
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

// ---- Helper Mock Data ----
const MOCK_ORDER_LIST: SesiData[] = [
  {
    id: "a1",
    namaPemesan: "Konsultasi Offline",
    tanggal: "2025-07-10",
    sesi: "11.00 – 12.30",
    status: "terdaftar",
  },
  {
    id: "b2",
    namaPemesan: "Konsultasi Offline",
    tanggal: "2025-06-26",
    sesi: "11.00 – 12.30",
    status: "terdaftar",
  },
  {
    id: "c3",
    namaPemesan: "Konsultasi Offline",
    tanggal: "2025-06-12",
    sesi: "09.00 – 10.30",
    status: "terdaftar",
  },
  {
    id: "d4",
    namaPemesan: "Konsultasi Offline",
    tanggal: "2025-06-05",
    sesi: "09.00 – 10.30",
    status: "terdaftar",
  },
];

// ---- Utility: Mock getDocs Firestore ----
function setupGetDocsMock(orderList: SesiData[]) {
  (firestore.getDocs as jest.Mock).mockResolvedValue({
    docs: orderList.map((order: SesiData) => ({
      id: order.id,
      data: () => order,
    })),
  });
}

beforeEach(() => {
  jest.clearAllMocks();
  (useRouter as jest.Mock).mockReturnValue({
    pathname: "/mahasiswa/konsultasioffline",
    push: jest.fn(),
  });
});

describe("Halaman Konsultasi Offline Mahasiswa", () => {
  it("should render sidebar, header, title, and daftar button", async () => {
    setupGetDocsMock(MOCK_ORDER_LIST);

    render(<KonsultasiOfflineMahasiswa />);
    expect(await screen.findByText("Pesanan Konsultasi Offline Anda")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /daftar konsultasi offline/i })).toBeInTheDocument();
    const offlineLabels = screen.getAllByText(/Konsultasi Offline/i);
    expect(offlineLabels.length).toBeGreaterThan(1);
    expect(screen.getByText(/Beranda/i)).toBeInTheDocument();
    expect(screen.getByText(/Lagu Tenang/i)).toBeInTheDocument();
  });

  it("should render order list cards with correct data", async () => {
    setupGetDocsMock(MOCK_ORDER_LIST);

    render(<KonsultasiOfflineMahasiswa />);
    expect(await screen.findByText("10 Juli 2025")).toBeInTheDocument();
    expect(screen.getByText("2025-07-10 | 11.00 – 12.30")).toBeInTheDocument();

    expect(screen.getByText("26 Juni 2025")).toBeInTheDocument();
    expect(screen.getByText("2025-06-26 | 11.00 – 12.30")).toBeInTheDocument();

    expect(screen.getByText("12 Juni 2025")).toBeInTheDocument();
    expect(screen.getByText("2025-06-12 | 09.00 – 10.30")).toBeInTheDocument();

    expect(screen.getByText("05 Juni 2025")).toBeInTheDocument();
    expect(screen.getByText("2025-06-05 | 09.00 – 10.30")).toBeInTheDocument();
  });

  it("should render 'Tidak Ada Pesanan' if orderData is empty", async () => {
    setupGetDocsMock([]);

    render(<KonsultasiOfflineMahasiswa />);
    expect(await screen.findByText(/tidak ada pesanan/i)).toBeInTheDocument();
  });

  it("should delete order when delete button is clicked and show success", async () => {
    setupGetDocsMock(MOCK_ORDER_LIST);

    render(<KonsultasiOfflineMahasiswa />);
    expect(await screen.findByText("10 Juli 2025")).toBeInTheDocument();

    // Cari semua tombol hapus, klik tombol pertama
    const deleteButtons = await screen.findAllByTitle("Hapus");
    fireEvent.click(deleteButtons[0]);

    expect(await screen.findByText(/yakin ingin menghapus pesanan ini/i)).toBeInTheDocument();

    (firestore.deleteDoc as jest.Mock).mockResolvedValueOnce(undefined);
    fireEvent.click(screen.getByText(/^ya$/i));

    expect(await screen.findByText(/pesanan berhasil terhapus/i)).toBeInTheDocument();
    expect(firestore.deleteDoc).toHaveBeenCalled();
  });

  it("should render pagination and switch page on click", async () => {
    // Buat 8 data biar lebih dari 1 page
    const list: SesiData[] = [];
    for (let i = 0; i < 8; i++) {
      list.push({
        id: `id${i}`,
        namaPemesan: "Konsultasi Offline",
        tanggal: `2025-07-${String(10 - i).padStart(2, "0")}`,
        sesi: "09.00 – 10.30",
        status: "terdaftar",
      });
    }
    setupGetDocsMock(list);

    render(<KonsultasiOfflineMahasiswa />);
    expect(await screen.findByText("10 Juli 2025")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /2/i })).toBeInTheDocument();

    // Pindah ke page 2
    fireEvent.click(screen.getByRole("button", { name: /2/i }));
    expect(await screen.findByText("03 Juli 2025")).toBeInTheDocument();
  });

  it("should render all necessary UI texts/buttons", async () => {
    // Buat 8 data biar paginasi muncul!
    const list: SesiData[] = [];
    for (let i = 0; i < 8; i++) {
      list.push({
        id: `id${i}`,
        namaPemesan: "Konsultasi Offline",
        tanggal: `2025-07-${String(10 - i).padStart(2, "0")}`,
        sesi: "09.00 – 10.30",
        status: "terdaftar",
      });
    }
    setupGetDocsMock(list);

    render(<KonsultasiOfflineMahasiswa />);
    expect(await screen.findByText(/Pesanan Konsultasi Offline Anda/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /daftar konsultasi offline/i })).toBeInTheDocument();
    expect(screen.getAllByText(/Konsultasi Offline/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Terdaftar/i).length).toBeGreaterThan(0); // <= INI FIX
    // Pagination check fix:
    expect(screen.getAllByText(/previous/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/next/i).length).toBeGreaterThan(0);
  });

  it("should render the list sorted by newest order first", async () => {
  const list: SesiData[] = [
    { id: "a", namaPemesan: "A", tanggal: "2025-07-10", sesi: "09.00 – 10.30", status: "terdaftar" },
    { id: "b", namaPemesan: "B", tanggal: "2025-06-01", sesi: "09.00 – 10.30", status: "terdaftar" },
    { id: "c", namaPemesan: "C", tanggal: "2025-07-05", sesi: "09.00 – 10.30", status: "terdaftar" },
  ];
  setupGetDocsMock(list);
  render(<KonsultasiOfflineMahasiswa />);
  const tanggalLabels = await screen.findAllByText(/Juli|Juni/);
  const arrText = tanggalLabels.map(n => n.textContent);
  expect(arrText).toEqual([
    "10 Juli 2025", // Terbaru dulu
    "05 Juli 2025",
    "01 Juni 2025",
  ]);
});
});

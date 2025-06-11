import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DaftarKonsultasiOfflinePage from "@/pages/mahasiswa/konsultasioffline/daftarkonsultasi";
import { useRouter } from "next/router";
import * as firestore from "firebase/firestore";

// Mock next/image dengan fragment agar tidak kena warning no-img-element
jest.mock("next/image", () => ({
  __esModule: true,
  default: function ImageMock(props: Record<string, unknown>) {
    return <>{props.alt}</>;
  },
}));

// Mock SuccessOrder komponen
jest.mock("@/components/SuccessOrder", () => {
  const MockSuccessOrder: React.FC<{ show: boolean }> = ({ show }) =>
    show ? <div data-testid="success-modal">Pesanan Anda telah dibuat!</div> : null;
  MockSuccessOrder.displayName = "MockSuccessOrder";
  return MockSuccessOrder;
});

// Mock firebase/firestore SEMUA fungsi yang dipakai
jest.mock("firebase/firestore", () => ({
  addDoc: jest.fn(),
  getDocs: jest.fn(),
  collection: jest.fn(),
  Timestamp: { now: jest.fn() },
  query: jest.fn(),
  where: jest.fn(),
  getFirestore: jest.fn(() => ({})),
}));

// Mock Next router
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Daftar Konsultasi Offline", () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
      pathname: "/mahasiswa/konsultasioffline/daftarkonsultasi",
    });
    pushMock.mockClear();
    jest.clearAllMocks();
  });

  it("renders all static texts and input fields", () => {
    render(<DaftarKonsultasiOfflinePage />);
    expect(screen.getByText(/Daftar Konsultasi Offline/i)).toBeInTheDocument();
    expect(screen.getByText(/Student Health Care Center/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Contoh: Jane Doe/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/502622XXXX/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Sistem Informasi/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email@student.its.ac.id/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Tuliskan keluhan/i)).toBeInTheDocument();
    expect(screen.getByText(/Konfirmasi Pesanan/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Kembali/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /09.00/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /11.00/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /13.30/i })).toBeInTheDocument();
  });

  it("shows alert if selected date is not Tuesday or Thursday", () => {
    render(<DaftarKonsultasiOfflinePage />);
    const dateInput = screen.getByTestId("input-tanggal");
    fireEvent.change(dateInput, { target: { value: "2025-06-11" } }); // Rabu
    expect(screen.getByText(/Mohon pilih hari Selasa atau Kamis saja/i)).toBeInTheDocument();
  });

  it("can fill the form fields and select sesi", () => {
    render(<DaftarKonsultasiOfflinePage />);
    fireEvent.change(screen.getByPlaceholderText(/Jane Doe/i), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByPlaceholderText(/502622XXXX/i), { target: { value: "5026229999" } });
    fireEvent.change(screen.getByPlaceholderText(/Sistem Informasi/i), { target: { value: "Teknik Informatika" } });
    fireEvent.change(screen.getByPlaceholderText(/email@student.its.ac.id/i), { target: { value: "john@student.its.ac.id" } });
    const dateInput = screen.getByTestId("input-tanggal");
    fireEvent.change(dateInput, { target: { value: "2025-06-12" } }); // Kamis
    fireEvent.click(screen.getByRole("button", { name: /09.00/i }));
    fireEvent.change(screen.getByPlaceholderText(/Tuliskan keluhan/i), { target: { value: "Stress menjelang sidang" } });
    expect(screen.getByDisplayValue(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/5026229999/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/Teknik Informatika/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/john@student.its.ac.id/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/2025-06-12/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/Stress menjelang sidang/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /09.00/i }).className).toMatch(/selected/i);
  });

  it("shows alert if submit is pressed while fields are empty", async () => {
    render(<DaftarKonsultasiOfflinePage />);
    fireEvent.click(screen.getByText(/Konfirmasi Pesanan/i));
    expect(await screen.findByText(/Mohon lengkapi semua data formulir/i)).toBeInTheDocument();
  });

  it("shows alert if kuota hari sudah penuh", async () => {
    (firestore.getDocs as jest.Mock).mockResolvedValue({
      forEach: function(cb: (doc: { data: () => { sesi: string } }) => void) {
        for (let i = 0; i < 6; i++) cb({ data: () => ({ sesi: "09.00 – 10.30" }) });
      },
    });
    render(<DaftarKonsultasiOfflinePage />);
    fireEvent.change(screen.getByPlaceholderText(/Jane Doe/i), { target: { value: "A" } });
    fireEvent.change(screen.getByPlaceholderText(/502622XXXX/i), { target: { value: "5026221111" } });
    fireEvent.change(screen.getByPlaceholderText(/Sistem Informasi/i), { target: { value: "A" } });
    fireEvent.change(screen.getByPlaceholderText(/email@student.its.ac.id/i), { target: { value: "a@student.its.ac.id" } });
    const dateInput = screen.getByTestId("input-tanggal");
    fireEvent.change(dateInput, { target: { value: "2025-06-12" } });
    fireEvent.click(screen.getByRole("button", { name: /09.00/i }));
    fireEvent.change(screen.getByPlaceholderText(/Tuliskan keluhan/i), { target: { value: "tes" } });
    fireEvent.click(screen.getByText(/Konfirmasi Pesanan/i));
    expect(await screen.findByText(/Kuota untuk hari tersebut sudah penuh/i)).toBeInTheDocument();
  });

  it("shows alert if kuota sesi sudah penuh", async () => {
    (firestore.getDocs as jest.Mock).mockResolvedValue({
      forEach: function(cb: (doc: { data: () => { sesi: string } }) => void) {
        for (let i = 0; i < 2; i++) cb({ data: () => ({ sesi: "09.00 – 10.30" }) });
      },
    });
    render(<DaftarKonsultasiOfflinePage />);
    fireEvent.change(screen.getByPlaceholderText(/Jane Doe/i), { target: { value: "A" } });
    fireEvent.change(screen.getByPlaceholderText(/502622XXXX/i), { target: { value: "5026221111" } });
    fireEvent.change(screen.getByPlaceholderText(/Sistem Informasi/i), { target: { value: "A" } });
    fireEvent.change(screen.getByPlaceholderText(/email@student.its.ac.id/i), { target: { value: "a@student.its.ac.id" } });
    const dateInput = screen.getByTestId("input-tanggal");
    fireEvent.change(dateInput, { target: { value: "2025-06-12" } });
    fireEvent.click(screen.getByRole("button", { name: /09.00/i }));
    fireEvent.change(screen.getByPlaceholderText(/Tuliskan keluhan/i), { target: { value: "tes" } });
    fireEvent.click(screen.getByText(/Konfirmasi Pesanan/i));
    expect(await screen.findByText(/Kuota untuk sesi 09.00 – 10.30 sudah penuh/i)).toBeInTheDocument();
  });

  it("shows success modal and push after successful submit", async () => {
    (firestore.getDocs as jest.Mock).mockResolvedValue({
      forEach: function() {},
    });
    (firestore.addDoc as jest.Mock).mockResolvedValue({});
    render(<DaftarKonsultasiOfflinePage />);
    fireEvent.change(screen.getByPlaceholderText(/Jane Doe/i), { target: { value: "Test User" } });
    fireEvent.change(screen.getByPlaceholderText(/502622XXXX/i), { target: { value: "5026220001" } });
    fireEvent.change(screen.getByPlaceholderText(/Sistem Informasi/i), { target: { value: "Teknik Mesin" } });
    fireEvent.change(screen.getByPlaceholderText(/email@student.its.ac.id/i), { target: { value: "test@its.ac.id" } });
    const dateInput = screen.getByTestId("input-tanggal");
    fireEvent.change(dateInput, { target: { value: "2025-06-12" } });
    fireEvent.click(screen.getByRole("button", { name: /09.00/i }));
    fireEvent.change(screen.getByPlaceholderText(/Tuliskan keluhan/i), { target: { value: "Butuh konsultasi" } });
    fireEvent.click(screen.getByText(/Konfirmasi Pesanan/i));
    expect(await screen.findByTestId("success-modal")).toBeInTheDocument();
    // Tunggu animasi/redirect
    setTimeout(() => {
      expect(pushMock).toHaveBeenCalledWith("/mahasiswa/konsultasioffline");
    }, 2500);
  });

  it("shows alert if Firestore fails to addDoc", async () => {
    (firestore.getDocs as jest.Mock).mockResolvedValue({
      forEach: function() {},
    });
    (firestore.addDoc as jest.Mock).mockRejectedValue(new Error("Firestore error"));
    render(<DaftarKonsultasiOfflinePage />);
    fireEvent.change(screen.getByPlaceholderText(/Jane Doe/i), { target: { value: "Test User" } });
    fireEvent.change(screen.getByPlaceholderText(/502622XXXX/i), { target: { value: "5026220002" } });
    fireEvent.change(screen.getByPlaceholderText(/Sistem Informasi/i), { target: { value: "Teknik Fisika" } });
    fireEvent.change(screen.getByPlaceholderText(/email@student.its.ac.id/i), { target: { value: "fail@its.ac.id" } });
    const dateInput = screen.getByTestId("input-tanggal");
    fireEvent.change(dateInput, { target: { value: "2025-06-12" } });
    fireEvent.click(screen.getByRole("button", { name: /09.00/i }));
    fireEvent.change(screen.getByPlaceholderText(/Tuliskan keluhan/i), { target: { value: "Error please" } });
    fireEvent.click(screen.getByText(/Konfirmasi Pesanan/i));
    expect(await screen.findByText(/Gagal menyimpan data/i)).toBeInTheDocument();
  });

  it("back button works and calls router.push", () => {
    render(<DaftarKonsultasiOfflinePage />);
    fireEvent.click(screen.getByRole("button", { name: /kembali/i }));
    expect(pushMock).toHaveBeenCalledWith("/mahasiswa/konsultasioffline");
  });
});

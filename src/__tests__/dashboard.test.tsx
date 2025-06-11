import React from "react";
import { render, screen } from "@testing-library/react";
import DashboardPage from "../views/DashboardPage/Mahasiswa/index";
import Home from "../pages/index"
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

beforeEach(() => {
  (useRouter as jest.Mock).mockReturnValue({ pathname: "/" });
});

describe("Dashboard Page Mahasiswa", () => {
  it("renders dashboard page", () => {
    render(<DashboardPage />);
    // Sesuaikan dengan text yang memang ada di UI
    expect(screen.getByText(/Selamat datang/i)).toBeInTheDocument();
    expect(screen.getByText(/Platform layanan kesehatan mental untuk mahasiswa ITS/i)).toBeInTheDocument();
    expect(screen.getByText(/Pilih Layanan Sesuai Kebutuhan Anda/i)).toBeInTheDocument();
    expect(screen.getByText(/Daftar Konsultasi Offline/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Lagu Tenang/i, level: 3 })).toBeInTheDocument();
  });
});

describe("Home Page (pages/index.tsx)", () => {
  it("renders Home page via routing", () => {
    render(<Home />);
    // Sesuaikan assertion sesuai isi halaman index.tsx
    expect(screen.getByText(/Selamat datang di ITS-OK/i)).toBeInTheDocument();
    expect(screen.getByText(/Platform layanan kesehatan mental untuk mahasiswa ITS/i)).toBeInTheDocument();
    expect(screen.getByText(/Pilih Layanan Sesuai Kebutuhan Anda/i)).toBeInTheDocument();
    expect(screen.getByText(/Daftar Konsultasi Offline/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Lagu Tenang/i, level: 3 })).toBeInTheDocument();
  });
});

  it('tombol Mulai punya href ke /mahasiswa/lagutenang', () => {
    render(<DashboardPage />);
    const mulaiBtn = screen.getByRole('button', { name: /mulai/i });
    expect(mulaiBtn).toBeInTheDocument();
    expect(mulaiBtn).toHaveAttribute('href', '/mahasiswa/lagutenang');
  });

  it('tombol Daftar punya href ke /mahasiswa/konsultasioffline', () => {
    render(<DashboardPage />);
    const daftarBtn = screen.getByRole('button', { name: /daftar/i });
    expect(daftarBtn).toBeInTheDocument();
    expect(daftarBtn).toHaveAttribute('href', '/mahasiswa/konsultasioffline');
  });

describe("Sidebar di Dashboard", () => {
  beforeEach(() => {
    render(<DashboardPage />);
  });

  it("menampilkan menu 'Beranda'", () => {
    expect(screen.getByRole('link', { name: /beranda/i })).toBeInTheDocument();
  });

  it("menampilkan menu 'Konsultasi Offline'", () => {
    expect(screen.getByRole('link', { name: /konsultasi offline/i })).toBeInTheDocument();
  });

  it("menampilkan menu 'Lagu Tenang'", () => {
    expect(screen.getByRole('link', { name: /konsultasi offline/i })).toBeInTheDocument();
  });

  it("menu 'Beranda' punya href '/'", () => {
    const beranda = screen.getByRole('link', { name: /beranda/i });
    expect(beranda).toHaveAttribute('href', '/');
  });

  it("menu 'Konsultasi Offline' punya href '/mahasiswa/konsultasioffline'", () => {
    const konsultasi = screen.getByRole('link', { name: /konsultasi offline/i });
    expect(konsultasi).toHaveAttribute('href', '/mahasiswa/konsultasioffline');
  });

  it("menu 'Lagu Tenang' punya href '/mahasiswa/lagutenang'", () => {
    const laguTenang = screen.getByRole('link', { name: /lagu tenang/i });
    expect(laguTenang).toHaveAttribute('href', '/mahasiswa/lagutenang');
  });
});

describe("Sidebar Active State", () => {
  it("menu 'Lagu Tenang' aktif saat di halaman lagu tenang", () => {
    (useRouter as jest.Mock).mockReturnValue({ pathname: "/mahasiswa/lagutenang" });

    render(<DashboardPage />);
    const laguTenang = screen.getByRole('link', { name: /lagu tenang/i });
    expect(laguTenang.className).toMatch(/active/);
  });

  it("menu 'Konsultasi Offline' aktif saat di halaman konsultasi offline", () => {
    (useRouter as jest.Mock).mockReturnValue({ pathname: "/mahasiswa/konsultasioffline" });

    render(<DashboardPage />);
    const konsultasi = screen.getByRole('link', { name: /konsultasi offline/i });
    expect(konsultasi.className).toMatch(/active/);
  });

  it("menu 'Beranda' aktif saat di halaman utama", () => {
    (useRouter as jest.Mock).mockReturnValue({ pathname: "/" });

    render(<DashboardPage />);
    const beranda = screen.getByRole('link', { name: /beranda/i });
    expect(beranda.className).toMatch(/active/);
  });
});

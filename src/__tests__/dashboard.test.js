import React from "react";
import { render, screen } from "@testing-library/react";
import DashboardPage from "../views/DashboardPage/Mahasiswa/index";

describe("Dashboard Page Mahasiswa", () => {
  it("renders dashboard page", () => {
    render(<DashboardPage />);
    // Sesuaikan dengan text yang memang ada di UI
    expect(screen.getByText(/Selamat datang/i)).toBeInTheDocument();
    expect(screen.getByText(/Pilih Layanan Sesuai Kebutuhan Anda/i)).toBeInTheDocument();
    expect(screen.getByText(/Daftar Konsultasi Offline/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Lagu Tenang/i, level: 3 })).toBeInTheDocument();
  });
});

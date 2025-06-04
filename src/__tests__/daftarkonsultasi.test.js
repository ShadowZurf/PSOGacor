/*import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DaftarKonsultasi from "../index"; // Ubah sesuai nama komponen-mu

describe("Form Daftar Konsultasi", () => {
  it("renders form fields", () => {
    render(<DaftarKonsultasi />);
    expect(screen.getByLabelText(/Tanggal/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Jam/i)).toBeInTheDocument();
    // Tambahkan sesuai field-mu
  });

  it("can fill and submit the form", () => {
    render(<DaftarKonsultasi />);
    // Simulasi input data:
    fireEvent.change(screen.getByLabelText(/Tanggal/i), { target: { value: "2025-07-10" } });
    fireEvent.change(screen.getByLabelText(/Jam/i), { target: { value: "11:00" } });
    fireEvent.click(screen.getByRole("button", { name: /Daftar/i }));
    // Cek hasil, misal muncul notifikasi atau redirect, dsb (mock/expect)
  });
});
*/
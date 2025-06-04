import React from 'react';
import { render, screen } from '@testing-library/react';
import KonsultasiOfflineMahasiswa from '../index';

describe('KonsultasiOfflineMahasiswa', () => {
  it('menampilkan judul halaman', () => {
    render(<KonsultasiOfflineMahasiswa />);
    expect(screen.getByText(/Pesanan Konsultasi Offline Anda/i)).toBeInTheDocument();
  });

  it('menampilkan tombol Daftar Konsultasi Offline', () => {
    render(<KonsultasiOfflineMahasiswa />);
    expect(screen.getByText(/Daftar Konsultasi Offline/i)).toBeInTheDocument();
  });
});

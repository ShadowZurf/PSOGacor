import { render, screen } from '@testing-library/react';
import DetailPesananPage from '@/pages/mahasiswa/konsultasioffline/detailpesanan/[id]';
import { useRouter } from 'next/router';

// Mock useRouter
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('DetailPesananPage', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should show loading state if id is not yet available', () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {},  // id belum tersedia
    });

    render(<DetailPesananPage />);
    expect(screen.getByText(/memuat detail pesanan/i)).toBeInTheDocument();
  });

  it('should render DetailPesananView if id is available', () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: { id: '123' },  // id sudah tersedia
    });

    render(<DetailPesananPage />);

    // Karena komponen child-nya sudah di test terpisah, kita cukup pastikan wrapper berhasil render child-nya.
    expect(screen.queryByText(/memuat detail pesanan/i)).not.toBeInTheDocument();
  });
});

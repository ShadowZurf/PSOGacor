import { render, screen, fireEvent } from '@testing-library/react';
import DetailPesananOfflineView from '@/views/Mahasiswa/KonsultasiOffline/DetailPesanan';
import { getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';

// Mock Firestore lengkap
jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  getDoc: jest.fn(),
  getFirestore: jest.fn(() => ({})),
}));

// Mock Router lengkap
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('DetailPesananOfflineView', () => {
  const mockBack = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      back: mockBack,
      pathname: '/detail-pesanan',
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should show loading state initially', () => {
    render(<DetailPesananOfflineView id="123" />);
    expect(screen.getByText(/memuat detail/i)).toBeInTheDocument();
  });

  it('should show not found if no data', async () => {
    (getDoc as jest.Mock).mockResolvedValueOnce({
      exists: () => false,
    });

    render(<DetailPesananOfflineView id="123" />);
    expect(await screen.findByText(/pesanan tidak ditemukan/i)).toBeInTheDocument();
  });

  it('should render data when available', async () => {
    (getDoc as jest.Mock).mockResolvedValueOnce({
      exists: () => true,
      data: () => ({
        nama: 'Budi',
        nrp: '05111940000123',
        jurusan: 'Informatika',
        email: 'budi@its.ac.id',
        namaPsikolog: 'Psikolog A',
        tanggalPengajuan: { toDate: () => new Date('2024-06-11T10:00:00Z') },
        tanggal: '2024-06-12',
        sesi: 'Sesi 1',
        keluhan: 'Stress',
        status: 'Terdaftar',
        lokasi: 'Ruang A',
      }),
    });

    render(<DetailPesananOfflineView id="123" />);

    expect(await screen.findByText(/05111940000123/i)).toBeInTheDocument();
    expect(screen.getAllByText(/psikolog a/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/stress/i)).toBeInTheDocument();
    expect(screen.getByText(/ruang a/i)).toBeInTheDocument();
  });

  it('should call router.back() when Back button is clicked', async () => {
    (getDoc as jest.Mock).mockResolvedValueOnce({
      exists: () => true,
      data: () => ({
        nama: 'Budi',
        nrp: '05111940000123',
        jurusan: 'Informatika',
        email: 'budi@its.ac.id',
        namaPsikolog: 'Psikolog A',
        tanggalPengajuan: { toDate: () => new Date('2024-06-11T10:00:00Z') },
        tanggal: '2024-06-12',
        sesi: 'Sesi 1',
        keluhan: 'Stress',
        status: 'Terdaftar',
        lokasi: 'Ruang A',
      }),
    });

    render(<DetailPesananOfflineView id="123" />);

    const backButton = await screen.findByRole('button', { name: /kembali/i });
    fireEvent.click(backButton);
    expect(mockBack).toHaveBeenCalled();
  });

  // ✅ Tambahan edge-case 1: tanggalPengajuan undefined
  it('should handle missing tanggalPengajuan gracefully', async () => {
    (getDoc as jest.Mock).mockResolvedValueOnce({
      exists: () => true,
      data: () => ({
        nama: 'Budi',
        nrp: '05111940000123',
        jurusan: 'Informatika',
        email: 'budi@its.ac.id',
        namaPsikolog: 'Psikolog A',
        tanggalPengajuan: undefined,
        tanggal: '2024-06-12',
        sesi: 'Sesi 1',
        keluhan: 'Stress',
        status: 'Terdaftar',
        lokasi: 'Ruang A',
      }),
    });

    render(<DetailPesananOfflineView id="123" />);
    expect(await screen.findByText('-')).toBeInTheDocument();
  });

  // ✅ Tambahan edge-case 2: nama kosong
  it('should fallback to "-" when nama is empty', async () => {
    (getDoc as jest.Mock).mockResolvedValueOnce({
      exists: () => true,
      data: () => ({
        nama: '',
        nrp: '05111940000123',
        jurusan: 'Informatika',
        email: 'budi@its.ac.id',
        namaPsikolog: 'Psikolog A',
        tanggalPengajuan: { toDate: () => new Date('2024-06-11T10:00:00Z') },
        tanggal: '2024-06-12',
        sesi: 'Sesi 1',
        keluhan: 'Stress',
        status: 'Terdaftar',
        lokasi: 'Ruang A',
      }),
    });

    render(<DetailPesananOfflineView id="123" />);
    expect(await screen.findByText('-')).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import KonsultasiOfflinePage from '@/pages/mahasiswa/konsultasioffline';

// Clean mock with displayName (sesuai best practice)
jest.mock('@/views/Mahasiswa/KonsultasiOffline', () => {
  const MockKonsultasiOffline = () => <div>Mock KonsultasiOffline View</div>;
  MockKonsultasiOffline.displayName = 'MockKonsultasiOffline';
  return { __esModule: true, default: MockKonsultasiOffline };
});

describe('KonsultasiOfflinePage', () => {
  it('should render KonsultasiOffline view correctly', () => {
    render(<KonsultasiOfflinePage />);
    expect(screen.getByText(/mock konsultasioffline view/i)).toBeInTheDocument();
  });
});

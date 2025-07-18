import { render, screen } from '@testing-library/react';
import LaguTenangPage from '@/pages/mahasiswa/lagutenang';

// Clean mock with displayName
jest.mock('@/views/Mahasiswa/LaguTenang', () => {
  const MockLaguTenang = () => <div>Mock LaguTenang View</div>;
  MockLaguTenang.displayName = 'MockLaguTenang';
  return MockLaguTenang;
});

describe('LaguTenangPage', () => {
  it('should render LaguTenang view correctly', () => {
    render(<LaguTenangPage />);
    expect(screen.getByText(/mock lagutenang view/i)).toBeInTheDocument();
  });
});

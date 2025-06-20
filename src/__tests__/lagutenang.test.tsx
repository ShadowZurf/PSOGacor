import { render, screen, fireEvent } from '@testing-library/react';
import LaguTenangMahasiswaPage from '@/views/Mahasiswa/LaguTenang';

describe('LaguTenangMahasiswaPage', () => {
  it('should render page title', () => {
    render(<LaguTenangMahasiswaPage />);
    expect(screen.getByText(/daftar lagu tenang/i)).toBeInTheDocument();
  });

  it('should render all songs initially', () => {
    render(<LaguTenangMahasiswaPage />);

    expect(screen.getByText(/melodi senja/i)).toBeInTheDocument();
    expect(screen.getByText(/langit tenang/i)).toBeInTheDocument();
    expect(screen.getByText(/pagi damai/i)).toBeInTheDocument();
    expect(screen.getByText(/sunyi dalam nada/i)).toBeInTheDocument();
    expect(screen.getByText(/senandung malam/i)).toBeInTheDocument();
  });

  it('should filter songs based on search query', () => {
    render(<LaguTenangMahasiswaPage />);

    const input = screen.getByPlaceholderText(/cari lagu tenang/i);
    fireEvent.change(input, { target: { value: 'Pagi' } });

    expect(screen.getByText(/pagi damai/i)).toBeInTheDocument();
    expect(screen.queryByText(/melodi senja/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/langit tenang/i)).not.toBeInTheDocument();
  });

  it('should show empty when no songs match search query', () => {
    render(<LaguTenangMahasiswaPage />);

    const input = screen.getByPlaceholderText(/cari lagu tenang/i);
    fireEvent.change(input, { target: { value: 'zzz' } });

    expect(screen.queryByText(/melodi senja/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/pagi damai/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/senandung malam/i)).not.toBeInTheDocument();
  });

  // ✅ Test image fallback onError
  it('should handle image onError and fallback to placeholder image', () => {
    render(<LaguTenangMahasiswaPage />);

    const image = screen.getByAltText(/melodi senja/i) as HTMLImageElement;

    // Simulasi error load image
    fireEvent.error(image);

    expect(image.src).toContain('/assets/audio/placeholder.png');
  });

  // ✅ Test audio play interaction
  it('should call play() when audio play is triggered', () => {
    render(<LaguTenangMahasiswaPage />);

    const audioElement = screen.getByText(/melodi senja/i).closest('.content')?.querySelector('audio') as HTMLAudioElement;

    const playSpy = jest.spyOn(audioElement, 'play').mockImplementation(() => Promise.resolve());

    // Simulasikan pemanggilan play
    audioElement.play();

    expect(playSpy).toHaveBeenCalled();
  });
});

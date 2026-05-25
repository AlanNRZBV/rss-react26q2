import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SelectionFlyout from './SelectionFlyout';
import {
  useSelectedPokemons,
  useSelectedDetails,
  usePokemonActions,
} from '../../store/store';
import { useCsvDownload } from '../../hooks/useCsvDownload';
import {
  mockPokemonList,
  mockPokemonDetailed,
} from '../../test-utils/mocks/pokemonData';

vi.mock('../../store/store');
vi.mock('../../hooks/useCsvDownload');

describe('SelectionFlyout Component', () => {
  const mockClearPokemons = vi.fn();
  const mockClearDetails = vi.fn();
  const mockDownloadCsv = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(usePokemonActions).mockReturnValue({
      clearPokemons: mockClearPokemons,
      clearDetails: mockClearDetails,
      togglePokemons: vi.fn(),
      toggleDetails: vi.fn(),
    });
    vi.mocked(useCsvDownload).mockReturnValue({
      downloadCsv: mockDownloadCsv,
    });
  });

  it('renders nothing when no items are selected', () => {
    vi.mocked(useSelectedPokemons).mockReturnValue([]);
    vi.mocked(useSelectedDetails).mockReturnValue(null);

    const { container } = render(<SelectionFlyout />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders correctly when items are selected', () => {
    vi.mocked(useSelectedPokemons).mockReturnValue(mockPokemonList);
    vi.mocked(useSelectedDetails).mockReturnValue(null);

    render(<SelectionFlyout />);

    expect(screen.getByText(/2/)).toBeInTheDocument();
    expect(screen.getByText(/Items selected/i)).toBeInTheDocument();
    expect(screen.getByText(/Download/i)).toBeInTheDocument();
    expect(screen.getByText(/Unselect all/i)).toBeInTheDocument();
  });

  it('renders correctly when only details are selected', () => {
    vi.mocked(useSelectedPokemons).mockReturnValue([]);
    vi.mocked(useSelectedDetails).mockReturnValue(mockPokemonDetailed);

    render(<SelectionFlyout />);

    expect(screen.getByText(/Details/i)).toBeInTheDocument();
  });

  it('calls clearPokemons when items count is clicked', () => {
    vi.mocked(useSelectedPokemons).mockReturnValue(mockPokemonList);
    vi.mocked(useSelectedDetails).mockReturnValue(null);

    render(<SelectionFlyout />);

    const clearButton = screen.getByTitle(/Clear selected list items/i);
    fireEvent.click(clearButton);

    expect(mockClearPokemons).toHaveBeenCalled();
  });

  it('calls clearDetails when details tag is clicked', () => {
    vi.mocked(useSelectedPokemons).mockReturnValue([]);
    vi.mocked(useSelectedDetails).mockReturnValue(mockPokemonDetailed);

    render(<SelectionFlyout />);

    const clearDetailsButton = screen.getByTitle(/Clear selected detail/i);
    fireEvent.click(clearDetailsButton);

    expect(mockClearDetails).toHaveBeenCalled();
  });

  it('calls downloadCsv with all data when Download is clicked', () => {
    vi.mocked(useSelectedPokemons).mockReturnValue(mockPokemonList);
    vi.mocked(useSelectedDetails).mockReturnValue(mockPokemonDetailed);

    render(<SelectionFlyout />);

    const downloadButton = screen.getByText(/Download/i);
    fireEvent.click(downloadButton);

    expect(mockDownloadCsv).toHaveBeenCalledWith([
      ...mockPokemonList,
      mockPokemonDetailed,
    ]);
  });

  it('calls clearAll when Unselect all is clicked', () => {
    vi.mocked(useSelectedPokemons).mockReturnValue(mockPokemonList);
    vi.mocked(useSelectedDetails).mockReturnValue(mockPokemonDetailed);

    render(<SelectionFlyout />);

    const unselectAllButton = screen.getByText(/Unselect all/i);
    fireEvent.click(unselectAllButton);

    expect(mockClearPokemons).toHaveBeenCalled();
    expect(mockClearDetails).toHaveBeenCalled();
  });
});

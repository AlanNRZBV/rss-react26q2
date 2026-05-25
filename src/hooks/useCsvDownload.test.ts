import { renderHook } from '@testing-library/react';
import { useCsvDownload } from './useCsvDownload';
import {
  mockPokemonList,
  mockPokemonDetailed,
} from '../test-utils/mocks/pokemonData';
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('useCsvDownload', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal('URL', {
      createObjectURL: vi.fn(() => 'mock-url'),
      revokeObjectURL: vi.fn(),
    });

    vi.stubGlobal('Blob', vi.fn());
  });

  it('does nothing if items list is empty', () => {
    const { result } = renderHook(() => useCsvDownload());
    result.current.downloadCsv([]);
    expect(URL.createObjectURL).not.toHaveBeenCalled();
  });

  it('generates and downloads CSV for simple pokemon data', () => {
    const { result } = renderHook(() => useCsvDownload());

    const appendSpy = vi.spyOn(document.body, 'appendChild');
    const removeSpy = vi.spyOn(document.body, 'removeChild');
    const clickSpy = vi
      .spyOn(HTMLAnchorElement.prototype, 'click')
      .mockImplementation(() => {});

    result.current.downloadCsv(mockPokemonList);

    expect(URL.createObjectURL).toHaveBeenCalled();
    expect(appendSpy).toHaveBeenCalled();
    expect(clickSpy).toHaveBeenCalled();
    expect(removeSpy).toHaveBeenCalled();
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('mock-url');

    const link = appendSpy.mock.calls[0][0] as HTMLAnchorElement;
    expect(link.download).toBe('2_items.csv');
    expect(link.href).toContain('mock-url');
  });

  it('correctly handles detailed pokemon data in CSV', () => {
    const { result } = renderHook(() => useCsvDownload());

    result.current.downloadCsv([mockPokemonDetailed]);

    expect(Blob).toHaveBeenCalled();
    const blobCall = (Blob as unknown as ReturnType<typeof vi.fn>).mock
      .calls[0];
    const csvContent = blobCall[0][0] as string;

    expect(csvContent).toContain(
      'Name,Details URL,Types,HP,Attack,Weight (kg),Height (m),Abilities'
    );

    expect(csvContent).toContain('"bulbasaur"');
    expect(csvContent).toContain('"6.9"');
    expect(csvContent).toContain('"0.7"');
    expect(csvContent).toContain('"overgrow, chlorophyll"');
  });
});

import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useHotelBootstrap } from './useHotelBootstrap';
import { hotelTypes } from '@/index';

/* ------------------------------------------------------------------ */
/* MOCK sessionStorage */
/* ------------------------------------------------------------------ */
const sessionStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'sessionStorage', {
  value: sessionStorageMock,
});

/* ------------------------------------------------------------------ */
/* MOCK @/index COMPLETELY */
/* ------------------------------------------------------------------ */
vi.mock('@/index', () => ({
  hotelUtils: {
    calculateRequiredRooms: vi.fn((adults: number, children: number) =>
      Math.ceil((adults + children) / 2)
    ),
  },

  peopleApi: {
    getCompanies: vi.fn(() =>
      Promise.resolve({
        data: {
          success: '1',
          response: {
            Companies: [
              { corporate_name: 'TCS' },
              { corporate_name: 'Infosys' },
            ],
          },
        },
      })
    ),
  },

  hotelApi: {
    getCities: vi.fn(() =>
      Promise.resolve({
        data: {
          success: '1',
          response: {
            Cities: [
              { name: 'Mumbai', city_code: 'BOM' },
              { name: 'Delhi', city_code: 'DEL' },
            ],
          },
        },
      })
    ),

    getHotelCodes: vi.fn(() =>
      Promise.resolve({
        data: {
          Status: { Code: 200 },
          Hotels: [{ HotelCode: 'H1' }, { HotelCode: 'H2' }],
        },
      })
    ),

    searchHotels: vi.fn(() =>
      Promise.resolve({
        data: {
          Status: { Code: 200 },
          HotelResult: [
            { HotelCode: 'H1', Rooms: [] },
            { HotelCode: 'H2', Rooms: [] },
          ],
        },
      })
    ),

    getHotelDetails: vi.fn(() =>
      Promise.resolve({
        data: {
          Status: { Code: 200 },
          HotelDetails: [
            { HotelCode: 'H1', Rooms: [] },
            { HotelCode: 'H2', Rooms: [] },
          ],
        },
      })
    ),
  },
}));

/* ------------------------------------------------------------------ */
/* TESTS */
/* ------------------------------------------------------------------ */
describe('useHotelBootstrap', () => {
  beforeEach(() => {
    sessionStorage.clear();
    vi.clearAllMocks();
  });

  it('initializes with default state', () => {
    const { result } = renderHook(() => useHotelBootstrap());

    expect(result.current.loader).toBe(false);
    expect(result.current.hotelDetails).toEqual([]);
    expect(result.current.cities).toEqual([]);
    expect(result.current.errorMessage).toBe('');
  });

  it('fetches companies successfully', async () => {
    const { result } = renderHook(() => useHotelBootstrap());

    await act(async () => {
      await result.current.fetchCompanies();
    });

    expect(result.current.companies).toEqual(['TCS', 'Infosys']);
  });

  it('fetches cities successfully', async () => {
    const { result } = renderHook(() => useHotelBootstrap());

    let cities;
    await act(async () => {
      cities = await result.current.fetchCities();
    });

    expect(cities).toHaveLength(2);
    expect(result.current.cities[0].name).toBe('Mumbai');
  });

  it('handleSelection sets error if rooms are insufficient', () => {
  const { result } = renderHook(() => useHotelBootstrap());

  act(() => {
    result.current.handleSelection('adults', 4);
  });

  act(() => {
    result.current.handleSelection('rooms', 1);
  });

  expect(result.current.errorMessage).toContain('Minimum');
});


  it('handleApply validates children ages', () => {
  const { result } = renderHook(() => useHotelBootstrap());

  act(() => {
    result.current.handleSelection('children', 1);
    result.current.handleSelection('rooms', 1); // requiredRooms = 1
  });

  act(() => {
    result.current.handleApply();
  });

  expect(result.current.errorMessage).toBe(
    'Please specify ages for all children'
  );
});


  it('initializeAndSearch completes successfully', async () => {
    const { result } = renderHook(() => useHotelBootstrap());

    const params: hotelTypes.HotelSearchParams = {
      city_name: 'Mumbai',
      CityCode: undefined,
      checkIn: '2025-01-10',
      checkOut: '2025-01-12',
      Rooms: 1,
      Adults: 2,
      Children: 0,
      ChildAge: [],
    };

    await act(async () => {
      const cities = await result.current.fetchCities();
      const response = await result.current.initializeAndSearch(params, cities);
      expect(response.success).toBe(true);
    });

    expect(result.current.hotelDetails.length).toBe(2);
    expect(result.current.combinedHotels.length).toBe(2);
  });

  it('handleSubmitForm throws error if search not initialized', async () => {
    const { result } = renderHook(() => useHotelBootstrap());

    await expect(
      result.current.handleSubmitForm()
    ).rejects.toThrow('Hotel search not initialized yet');
  });
});


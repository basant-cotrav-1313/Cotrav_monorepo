import { renderHook, act } from '@testing-library/react';
import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  beforeAll,
  afterAll,
} from 'vitest';
import Swal from 'sweetalert2';
import { useHotelShare } from './useHotelShare';
import { hotelApi, hotelUtils, hotelTypes } from '@/index';

/* =========================================================
   Silence expected console errors (intentional API failures)
   ========================================================= */
let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

beforeAll(() => {
  consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  consoleErrorSpy.mockRestore();
});

/* =====================
   Module Mocks
   ===================== */
vi.mock('sweetalert2', () => ({
  default: {
    fire: vi.fn(() => Promise.resolve()),
  },
}));

vi.mock('@/index', async () => ({
  hotelApi: {
    shareHotelOptions: vi.fn(),
  },
  hotelUtils: {
    validateEmail: vi.fn(),
    cleanEmails: vi.fn((emails: string) => emails),
  },
}));

/* =====================
   Typed mock helpers
   ===================== */
const mockedShareHotelOptions = vi.mocked(hotelApi.shareHotelOptions);
const mockedValidateEmail = vi.mocked(hotelUtils.validateEmail);

/* =====================
   Mock Data
   ===================== */
const mockSearchParams: hotelTypes.HotelSearchParams = {
  corporate_name: 'ABC Corp',
  spoc_name: 'John',
  approver1: 'a@test.com',
  approver2: 'b@test.com',
  admin_id: '1',
  booking_id: '10',
  checkIn: '2025-01-01',
  checkOut: '2025-01-02',
  Adults: 2,
  Children: 0,
  ChildAge: [],
  Rooms: 1,
  city_name: 'Delhi',
};

const mockRoom: hotelTypes.SelectedRoom = {
  HotelCode: 'H1',
  BookingCode: 'B1',
  HotelName: 'Test Hotel',
  Address: 'Delhi',
  CityName: 'Delhi',
  Name: 'Deluxe Room',
  MealType: 'Breakfast',
  TotalFare: 1000,
  TotalTax: 100,
  DayRates: [[{ BasePrice: 500 }]],
};

/* =====================
   Helper
   ===================== */
const createSubmitEvent = (): React.FormEvent<HTMLFormElement> =>
  new Event('submit', { bubbles: true, cancelable: true }) as unknown as
    React.FormEvent<HTMLFormElement>;

/* =========================================================
   TESTS
   ========================================================= */
describe('useHotelShare Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  /* ---------------- BASIC TESTS ---------------- */

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useHotelShare(mockSearchParams));

    expect(result.current.selectedRooms).toEqual([]);
    expect(result.current.isModalOpen).toBe(false);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.formData.clientName).toBe('ABC Corp');
  });

  it('should add and remove a room', () => {
    const { result } = renderHook(() => useHotelShare(mockSearchParams));

    act(() => result.current.addRoom(mockRoom));
    expect(result.current.isRoomSelected('B1')).toBe(true);

    act(() => result.current.removeRoom('B1'));
    expect(result.current.selectedRooms).toHaveLength(0);
  });

  it('should update remark via handleChange', () => {
    const { result } = renderHook(() => useHotelShare(mockSearchParams));

    const event: React.ChangeEvent<HTMLTextAreaElement> = {
      target: { name: 'remark', value: 'Test Remark' },
    } as React.ChangeEvent<HTMLTextAreaElement>;

    act(() => result.current.handleChange(event));

    expect(result.current.formData.remark).toBe('Test Remark');
  });

  /* ---------------- EMAIL TESTS ---------------- */

  it('should add valid TO email', () => {
    mockedValidateEmail.mockReturnValue(true);
    const { result } = renderHook(() => useHotelShare(mockSearchParams));

    act(() => result.current.handleAddEmail('test@test.com', 'toEmail'));

    expect(result.current.toEmailList).toEqual(['test@test.com']);
  });

  it('should reject invalid email', () => {
    mockedValidateEmail.mockReturnValue(false);
    const { result } = renderHook(() => useHotelShare(mockSearchParams));

    act(() => result.current.handleAddEmail('invalid', 'toEmail'));

    expect(result.current.errors.toEmail).toBeDefined();
    expect(result.current.toEmailList).toEqual([]);
  });

  it('should NOT allow duplicate TO emails', () => {
    mockedValidateEmail.mockReturnValue(true);
    const { result } = renderHook(() => useHotelShare(mockSearchParams));

    act(() => {
      result.current.handleAddEmail('test@test.com', 'toEmail');
      result.current.handleAddEmail('test@test.com', 'toEmail');
    });

    expect(result.current.toEmailList).toEqual(['test@test.com']);
    expect(result.current.errors.toEmail).toBeDefined();
  });

  it('should NOT allow duplicate CC emails', () => {
    mockedValidateEmail.mockReturnValue(true);
    const { result } = renderHook(() => useHotelShare(mockSearchParams));

    act(() => {
      result.current.handleAddEmail('cc@test.com', 'ccEmail');
      result.current.handleAddEmail('cc@test.com', 'ccEmail');
    });

    expect(result.current.ccEmailList).toEqual(['cc@test.com']);
    expect(result.current.errors.ccEmail).toBeDefined();
  });

  it('should delete TO email correctly', () => {
    mockedValidateEmail.mockReturnValue(true);
    const { result } = renderHook(() => useHotelShare(mockSearchParams));

    act(() => result.current.handleAddEmail('test@test.com', 'toEmail'));
    act(() => result.current.handleDeleteEmail('test@test.com', 'toEmail'));

    expect(result.current.toEmailList).toEqual([]);
  });

  it('should clean invalid and duplicate approver emails on blur', () => {
    mockedValidateEmail.mockImplementation(
      (email: string) => email === 'valid@test.com'
    );

    const { result } = renderHook(() => useHotelShare(mockSearchParams));

    act(() => {
      result.current.handleChange({
        target: {
          name: 'spocEmail',
          value: 'valid@test.com, invalid, valid@test.com',
        },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => result.current.handleApproverEmailBlur());

    expect(result.current.formData.spocEmail).toBe('valid@test.com');
  });

  /* ---------------- EDGE CASES ---------------- */

  it('should NOT open modal when no rooms are selected', () => {
    const { result } = renderHook(() => useHotelShare(mockSearchParams));

    act(() => result.current.handleShareOptions());

    expect(result.current.isModalOpen).toBe(false);
  });

  it('should open modal when rooms exist', () => {
    const { result } = renderHook(() => useHotelShare(mockSearchParams));

    act(() => result.current.addRoom(mockRoom));
    act(() => result.current.handleShareOptions());

    expect(result.current.isModalOpen).toBe(true);
  });

  it('should NOT submit when no rooms are selected', async () => {
    const { result } = renderHook(() => useHotelShare(mockSearchParams));

    await act(async () => {
      await result.current.handleSubmit(createSubmitEvent());
    });

    expect(mockedShareHotelOptions).not.toHaveBeenCalled();
  });

  /* ---------------- SUBMIT FLOW ---------------- */

  it('should submit successfully', async () => {
    mockedValidateEmail.mockReturnValue(true);
    mockedShareHotelOptions.mockResolvedValue({
      data: { success: '1' },
    } as Awaited<ReturnType<typeof hotelApi.shareHotelOptions>>);

    const { result } = renderHook(() => useHotelShare(mockSearchParams));

    act(() => {
      result.current.addRoom(mockRoom);
      result.current.handleAddEmail('to@test.com', 'toEmail');
    });

    await act(async () => {
      await result.current.handleSubmit(createSubmitEvent());
    });

    expect(mockedShareHotelOptions).toHaveBeenCalled();
    expect(Swal.fire).toHaveBeenCalled();
    expect(result.current.selectedRooms).toHaveLength(0);
  });

  it('should handle API failure gracefully', async () => {
    mockedShareHotelOptions.mockRejectedValue(new Error('API Error'));

    const { result } = renderHook(() => useHotelShare(mockSearchParams));

    act(() => result.current.addRoom(mockRoom));

    await act(async () => {
      await result.current.handleSubmit(createSubmitEvent());
    });

    expect(Swal.fire).toHaveBeenCalled();
    expect(result.current.isLoading).toBe(false);
  });
});


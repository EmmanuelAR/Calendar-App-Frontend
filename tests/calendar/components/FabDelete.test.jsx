import { fireEvent, render, screen } from "@testing-library/react";
import { FabDelete } from "../../../src/calendar/components/FabDelete";
import { useCalendarStore } from "../../../src/hooks";

jest.mock("../../../src/hooks/useCalendarStore");

describe("Pruebas sobre el FabDelete", () => {
  const mockStartDeletingEvent = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test("Debe de mostrar el componente correctamente", () => {
    useCalendarStore.mockReturnValue({
      hasEventSelected: false,
    });
    render(<FabDelete />);
    const btn = screen.getByLabelText("btn-delete");
    expect(btn.classList).toContain("btn");
    expect(btn.classList).toContain("btn-danger");
    expect(btn.classList).toContain("fab-danger");
    expect(btn.style.display).toBe("none");
  });

  test("Debe de mostrar el boton si hay un evento seleccionado.", () => {
    useCalendarStore.mockReturnValue({
      hasEventSelected: true,
    });
    render(<FabDelete />);
    const btn = screen.getByLabelText("btn-delete");
    expect(btn.style.display).toBe("");
  });

  test("startDeletingEvent debe de mostrar el boton si hay un evento seleccionado y darle click.", () => {
    useCalendarStore.mockReturnValue({
      hasEventSelected: true,
      startDeletingEvent: mockStartDeletingEvent,
    });
    render(<FabDelete />);

    const btn = screen.getByLabelText("btn-delete");
    fireEvent.click(btn);

    expect(mockStartDeletingEvent).toHaveBeenCalled();
  });
});

import React from "react";
import { render, screen } from "@testing-library/react";
import DashboardPage from "../views/DashboardPage/Mahasiswa/index";

describe("Dashboard Page Mahasiswa", () => {
  it("renders dashboard page", () => {
    render(<DashboardPage />);
    expect(screen.getByText(/Dashboard Mahasiswa/i)).toBeInTheDocument();
  });
});

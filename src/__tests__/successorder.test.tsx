import React from "react";
import { render, screen } from "@testing-library/react";
import SuccessOrder from "@/components/SuccessOrder";

describe("SuccessOrder Component", () => {
  it("renders nothing when show=false", () => {
    const { container } = render(<SuccessOrder show={false} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders modal with correct content when show=true", () => {
    render(<SuccessOrder show={true} />);
    // Cek ikon, text, dsb
    expect(screen.getByText(/Pesanan Anda telah dibuat/i)).toBeInTheDocument();
    // Cek modal (modal 'show' harus ada role dialog)
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});

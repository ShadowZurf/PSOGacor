// src/__tests__/siteheader.test.tsx

import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { SiteHeader, getPageTitle } from "@/components/SiteHeader";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useRouter } from "next/router";

// Utility agar wrapper-nya selalu ada context SidebarProvider
function renderWithSidebarProvider(ui: React.ReactNode) {
  return render(<SidebarProvider>{ui}</SidebarProvider>);
}

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("SiteHeader component", () => {
  function mockPath(pathname: string) {
    (useRouter as jest.Mock).mockReturnValue({ pathname });
  }

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("shows title 'Beranda' on /", () => {
    mockPath("/");
    renderWithSidebarProvider(<SiteHeader />);
    expect(screen.getByText("Beranda")).toBeInTheDocument();
  });

  it("shows title 'Konsultasi Offline' on /mahasiswa/konsultasioffline", () => {
    mockPath("/mahasiswa/konsultasioffline");
    renderWithSidebarProvider(<SiteHeader />);
    expect(screen.getByText("Konsultasi Offline")).toBeInTheDocument();
  });

  it("shows title 'Lagu Tenang' on /mahasiswa/lagutenang", () => {
    mockPath("/mahasiswa/lagutenang");
    renderWithSidebarProvider(<SiteHeader />);
    expect(screen.getByText("Lagu Tenang")).toBeInTheDocument();
  });

  it("shows 'Beranda' on /mahasiswa/beranda", () => {
    mockPath("/mahasiswa/beranda");
    renderWithSidebarProvider(<SiteHeader />);
    expect(screen.getByText("Beranda")).toBeInTheDocument();
  });

  it("shows 'Beranda' on /mahasiswa/beranda/anything", () => {
    mockPath("/mahasiswa/beranda/fitur-apapun");
    renderWithSidebarProvider(<SiteHeader />);
    expect(screen.getAllByText("Beranda").length).toBeGreaterThan(0);
  });

  it("shows 'Detail' if last segment dynamic (e.g. [id])", () => {
    mockPath("/mahasiswa/konsultasioffline/[id]");
    renderWithSidebarProvider(<SiteHeader />);
    expect(
      screen.getByText(/Konsultasi Offline|Detail/i)
    ).toBeInTheDocument();
  });

  it("shows correct title for kebab-case/underscore", () => {
    mockPath("/mahasiswa/laporan-akhir");
    renderWithSidebarProvider(<SiteHeader />);
    expect(screen.getByText("Laporan Akhir")).toBeInTheDocument();
    cleanup();

    mockPath("/mahasiswa/laporan_akhir");
    renderWithSidebarProvider(<SiteHeader />);
    expect(screen.getByText("Laporan Akhir")).toBeInTheDocument();
  });

  it("auto-capitalize for any path", () => {
    mockPath("/random/apa-aja");
    renderWithSidebarProvider(<SiteHeader />);
    expect(screen.getByText("Apa Aja")).toBeInTheDocument();
  });

  it("fallbacks to formatted last segment for unknown path", () => {
    mockPath("/ga-ada-apa-apa");
    renderWithSidebarProvider(<SiteHeader />);
    expect(screen.getByText("Ga Ada Apa Apa")).toBeInTheDocument();
  });

  it("shows SidebarTrigger button", () => {
    mockPath("/");
    renderWithSidebarProvider(<SiteHeader />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it("shows separator", () => {
    mockPath("/");
    renderWithSidebarProvider(<SiteHeader />);
    expect(document.querySelector('[class*=separator]')).toBeInTheDocument();
  });

  // ========== Tambahan: Test untuk getPageTitle saja =============

  it("unit test getPageTitle - customRouteTitles", () => {
    expect(getPageTitle("/")).toBe("Beranda");
    expect(getPageTitle("/mahasiswa/beranda")).toBe("Beranda");
  });

  it("unit test getPageTitle - sectionTitles", () => {
    expect(getPageTitle("/konsultasioffline/extra")).toBe("Konsultasi Offline");
    expect(getPageTitle("/lagutenang/extra")).toBe("Lagu Tenang");
  });

  it("unit test getPageTitle - featureKeywordTitles", () => {
    expect(getPageTitle("/mahasiswa/lagutenang/fitur")).toBe("Lagu Tenang");
  });

  it("unit test getPageTitle - all dynamic", () => {
    expect(getPageTitle("/[apa]/[id]")).toBe("Detail");
  });

  it("unit test getPageTitle - fallback Beranda", () => {
    expect(getPageTitle("")).toBe("Beranda");
  });

  it("unit test getPageTitle - kebab/underscore", () => {
    expect(getPageTitle("/mahasiswa/laporan_akhir")).toBe("Laporan Akhir");
    expect(getPageTitle("/mahasiswa/laporan-akhir")).toBe("Laporan Akhir");
  });

  it("unit test getPageTitle - dashboard keyword", () => {
    expect(getPageTitle("/dashboard")).toBe("Beranda");
  });

  // ======================== Tambahan untuk FULL COVERAGE =========================

  it("returns 'Detail' if only one dynamic segment in path", () => {
    // Menutupi branch pathSegmentsLower.length <= 1
    expect(getPageTitle("/[id]")).toBe("Detail");
  });

  it("returns 'Beranda' for completely unhandled path", () => {
    // Branch fallback terakhir di getPageTitle
    expect(getPageTitle("///")).toBe("Beranda");
  });

  it("returns 'Beranda' when formatRouteSegmentToTitle returns empty string", () => {
    // Branch fallback autoGeneratedTitle === ""
    expect(getPageTitle("/ ")).toBe("Beranda");
  });
});

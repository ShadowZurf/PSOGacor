import { Home, UsersRound, AudioLines } from "lucide-react"; // Hapus Video & Settings
import Image from "next/image";
import { useRouter } from "next/router";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import styles from "./app-sidebar.module.css";
import React from "react";

// Semua fitur utama (Konsultasi Online telah dihapus)
const mainFeatures = [
  {
    title: "Beranda",
    url: "/",
    icon: Home,
  },
  {
    title: "Konsultasi Offline",
    url: "/mahasiswa/konsultasioffline",
    icon: UsersRound,
  },
  {
    title: "Lagu Tenang",
    url: "/mahasiswa/lagutenang",
    icon: AudioLines,
  },
];

export function AppSidebar() {
  const router = useRouter();
  const { pathname } = router;

  return (
    <Sidebar>
      <SidebarHeader className={styles.sidebarHeader}>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className={styles.sidebarMenuItem}>
              <a href="#" className={styles.sidebarMenuButton}>
                <Image
                  src="/head-itsok.png"
                  alt="Logo"
                  width={35}
                  height={35}
                  className={styles.logo}
                />
                <span>ITS - OK</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            {/* Main Features */}
            <SidebarGroupLabel>Main Features</SidebarGroupLabel>
            <SidebarMenu>
              {mainFeatures.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                      className={`${styles.sidebarMenu} ${
                        (item.url === "/" && pathname === item.url) ||
                        (item.url !== "/" && pathname.startsWith(item.url))
                          ? styles.active
                          : ""
                      }`}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className={styles.sidebarFooter}>
      </SidebarFooter>
    </Sidebar>
  );
}

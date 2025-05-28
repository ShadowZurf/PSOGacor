import { useState } from "react";
import { Button, Row, Col, Form } from "react-bootstrap";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import styles from "./signupform.module.css";
import Link from "next/link";

export function SignUpForm({ ...props }: React.ComponentProps<"form">) {
  const [gender, setGender] = useState<string>("");

  return (
    <form className="flex flex-col gap-6" {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className={styles.h1}>Daftar Akun ITS OK</h1>
        <p className="text-muted-foreground text-sl text-balance">
          Masukkan email & identitas kamu dulu ya!
        </p>
      </div>
      <div className="grid gap-6">
        {/* Email */}
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="nama@email.com"
            required
          />
        </div>
        {/* Username */}
        <div className="grid gap-3">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            placeholder="Masukkan nama lengkap"
            required
          />
        </div>
        {/* Jenis Kelamin */}
        <div className="grid gap-2">
          <Label>Jenis Kelamin</Label>
          <div className="flex flex-row gap-6 mt-1">
            <Form.Check
              inline
              label="Laki-laki"
              name="gender"
              type="radio"
              id="gender-male"
              checked={gender === "Laki-laki"}
              onChange={() => setGender("Laki-laki")}
              required
            />
            <Form.Check
              inline
              label="Perempuan"
              name="gender"
              type="radio"
              id="gender-female"
              checked={gender === "Perempuan"}
              onChange={() => setGender("Perempuan")}
              required
            />
          </div>
        </div>
        {/* Tanggal Lahir & Nomor Telepon */}
        <Row className="gap-3">
          <Col md={5} xs={12}>
            <Label htmlFor="age">Umur</Label>
            <Input
              id="age"
              type="number"
              min={1}
              max={100}
              placeholder="Masukkan umur"
              required
            />
          </Col>
          <Col md={5} xs={12}>
            <Label htmlFor="phone">Nomor Telepon</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Masukkan nomor telepon"
              required
            />
          </Col>
        </Row>
        {/* Jurusan */}
        <div className="grid gap-3">
          <Label htmlFor="major">Jurusan</Label>
          <Input
            id="major"
            type="text"
            placeholder="Masukkan jurusan"
            required
          />
        </div>
        {/* Password */}
        <div className="grid gap-3">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required />
        </div>
        {/* Konfirmasi Password */}
        <div className="grid gap-3">
          <Label htmlFor="confirm-password">Konfirmasi Password</Label>
          <Input id="confirm-password" type="password" required />
        </div>
        {/* Button & Link */}
        <Button className={styles.buttonSignUp}>Daftar</Button>
        <div className="text-center text-sm">
          Sudah punya akun?{" "}
          <Link href="/auth/signin" passHref legacyBehavior>
            <Button variant="link" className={styles.loginLink}>
              Masuk, yuk!
            </Button>
          </Link>
        </div>
      </div>
    </form>
  );
}

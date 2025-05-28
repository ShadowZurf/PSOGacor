import { cn } from "@/lib/utils";
import { Button } from "react-bootstrap";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import styles from "./signinform.module.css";
import { useRouter } from "next/router";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();

  const handleSignIn = () => {
    console.log("Sign In button clicked");
    router.push("/auth/signin");
  };

  const handleSignUp = () => {
    console.log("Sign Up button clicked");
    router.push("/auth/signup");
  };

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Selamat Datang!!</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Masukkan email Anda untuk masuk ke akun
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Masukkan email" required />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="Masukkan password"
            required
          />
        </div>

        {/* Tombol Sign In */}
        <Button className={styles.buttonSignIn} onClick={handleSignIn}>
          Sign In
        </Button>

        {/* Separator */}
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Belum punya akun? daftar disini
          </span>
        </div>

        {/* Tombol Sign Up */}
        <Button className={styles.buttonSignUp} onClick={handleSignUp}>
          Sign Up
        </Button>
      </div>
    </form>
  );
}
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "@/components/admin/login-form";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  const { redirect } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle
            className="text-3xl text-primary"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Renantur Admin
          </CardTitle>
          <CardDescription>Acesse o painel administrativo</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm redirectTo={redirect ?? "/admin"} />
        </CardContent>
      </Card>
    </div>
  );
}

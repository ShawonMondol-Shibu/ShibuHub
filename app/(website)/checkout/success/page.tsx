import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default async function CheckoutSuccess({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-4">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
        <h1 className="text-3xl font-bold">Order Confirmed!</h1>
        <p className="text-muted-foreground">
          Thank you for your purchase. You&apos;ll receive a confirmation
          email shortly.
        </p>
        {session_id && (
          <p className="text-sm text-muted-foreground">
            Order reference: {session_id.slice(0, 20)}...
          </p>
        )}
        <Link href="/profile">
          <Button>View My Orders</Button>
        </Link>
      </div>
    </div>
  );
}

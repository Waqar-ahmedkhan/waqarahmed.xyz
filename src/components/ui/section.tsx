
import { cn } from "@/lib/utils";

export function Section({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <section
      className={cn("[&>div]:rounded-2xl print:py-4", className)}
      {...props}
    />
  );
}

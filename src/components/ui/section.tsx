
import { cn } from "@/lib/utils";

export function Section({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <section
      className={cn("py-6 print:py-4", className)}
      {...props}
    />
  );
}

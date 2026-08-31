import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "soft" | "outline";

const styles: Record<Variant, string> = {
  primary:
    "bg-chef-blue text-chef-blue-foreground hover:bg-chef-blue-hover",
  soft: "bg-chef-pill text-chef-pill-foreground hover:brightness-95",
  outline:
    "border border-chef-blue/40 bg-chef-surface text-chef-blue hover:bg-chef-pill/50",
};

export function ChefButton({
  variant = "primary",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex h-9 items-center justify-center rounded-sm px-4 text-[13px] font-medium transition-colors",
        styles[variant],
        className,
      )}
      {...props}
    />
  );
}

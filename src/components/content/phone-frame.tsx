import Image from "next/image";
import { cn } from "@/lib/utils";

/** Every screenshot on the site is normalised to this. */
const SCREEN_WIDTH = 735;
const SCREEN_HEIGHT = 1600;

/**
 * Bezel-only device frame.
 *
 * The screenshots carry their own iOS status bar, so drawing a notch or
 * a dynamic island here would put a fake one on top of a real one.
 * (Rationale inherited from the previous build, which got this right.)
 *
 * The bezel uses its own `device-bezel` token rather than a text colour
 * — bound to `--text-primary` it inverted to a white phone in dark mode.
 */
export function PhoneFrame({
  src,
  alt,
  priority,
  loading,
  sizes = "224px",
  variant = "full",
  className,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  loading?: "eager" | "lazy";
  sizes?: string;
  /** `peek` crops the bottom off, for a device rising out of a panel. */
  variant?: "full" | "peek";
  className?: string;
}) {
  const peek = variant === "peek";

  return (
    <div
      className={cn(
        "relative bg-device-bezel shadow-xl",
        // Inner hairline reads as the glass edge and keeps the device
        // from looking like a flat rectangle in dark mode.
        "ring-1 ring-inset ring-device-edge",
        peek
          ? "rounded-t-[2.25rem] border-[6px] border-b-0"
          : "rounded-[2.25rem] border-[6px]",
        "border-device-bezel",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={SCREEN_WIDTH}
        height={SCREEN_HEIGHT}
        priority={priority}
        loading={loading}
        sizes={sizes}
        className={cn(
          "block h-auto w-full",
          // Concentric: outer radius minus the bezel width.
          peek ? "rounded-t-[1.75rem]" : "rounded-[1.75rem]",
        )}
      />
    </div>
  );
}

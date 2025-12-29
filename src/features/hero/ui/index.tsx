// src/features/hero/ui/index.tsx
"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import type { HeroUiProps } from "@/features/hero/content/hero.mapper";
import { Section, Container, Typography, Button } from "@/ui";
import { PiCaretDoubleDownBold } from "react-icons/pi";
import "@/styles/hero.inverted.css";

// --- ANIMATION CONFIG ---

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

// --- PILL ANIMATION ---

const pillContainerVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 1.1,
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const pillItemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 25 },
  },
};

// --- helpers (no UI changes) ---
type LegacyMedia =
  | { kind: "video"; src: string; poster?: string }
  | { kind: string };

type MaybeLegacyProps = HeroUiProps & {
  media?: LegacyMedia;
  videoProps?: {
    autoPlay?: boolean;
    loop?: boolean;
    muted?: boolean;
    playsInline?: boolean;
    preload?: "none" | "metadata" | "auto";
  };
  poster?: string;
};

function resolveVideo(props: MaybeLegacyProps) {
  // Prefer new format
  if (typeof props.videoSrc === "string" && props.videoSrc.trim()) {
    return {
      src: props.videoSrc,
      poster: props.poster,
      videoProps: props.videoProps,
    };
  }

  // Fallback legacy format
  const media = props.media;
  if (media && typeof media === "object" && "kind" in media && media.kind === "video") {
    const m = media as Extract<LegacyMedia, { kind: "video" }>;
    return {
      src: m.src,
      poster: m.poster,
      videoProps: props.videoProps,
    };
  }

  // Last resort (avoid empty string src warning)
  return { src: null as string | null, poster: undefined, videoProps: props.videoProps };
}

// --- MAIN COMPONENT ---

export default function Hero(props: HeroUiProps) {
  // NOTE: We cast to allow reading legacy fields without changing UI props shape.
  const p = props as MaybeLegacyProps;

  const { titleBefore, titleHighlight, titleAfter, description, cta, features, pill } = p;

  const media = resolveVideo(p);

  return (
    <Section id="hero" container="full" className="hero-section overflow-hidden">
      <Container max="fluid" gutter="none" className="hero-offset h-full relative">
        <div className="chonky-image relative overflow-hidden z-[1]">
          {media.src ? (
            <video
              className="hero-media object-cover w-full h-full"
              src={media.src}
              poster={media.poster}
              // Mantengo tu comportamiento por defecto, pero si viene desde contenido lo respeta
              autoPlay={media.videoProps?.autoPlay ?? true}
              muted={media.videoProps?.muted ?? true}
              loop={media.videoProps?.loop ?? true}
              playsInline={media.videoProps?.playsInline ?? true}
              preload={media.videoProps?.preload ?? "metadata"}
              aria-label="Video hero"
            />
          ) : null}

          <div
            aria-hidden
            className="hero-dim pointer-events-none absolute inset-0 bg-gradient-to-r from-black/45 via-black/25 to-transparent backdrop-blur-[0.5px]"
          />

          {/* Notch desktop */}
          <div className="top-left" aria-hidden />
          <div className="bottom-right" aria-hidden />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className={[
              "absolute inset-0 grid grid-cols-10 gap-6 px-6 md:px-10 lg:px-14",
              "items-start",
              "pt-[12vh] md:pt-[15vh] lg:pt-[18vh] xl:pt-[20vh]",
              "pb-16",
            ].join(" ")}
          >
            {/* Izquierda */}
            <div className="col-span-12 md:col-span-7 lg:col-span-6 self-center">
              <motion.div variants={fadeInUp}>
                <Typography.Heading
                  as="h1"
                  className={[
                    "font-heading uppercase",
                    "text-[length:var(--text-h1)] leading-[var(--leading-h1)] tracking-[var(--tracking-h1)]",
                    "text-[var(--text-on-colored)] text-balance drop-shadow-sm",
                    "max-w-[22ch]",
                  ].join(" ")}
                >
                  {titleBefore}
                  <br />
                  {titleHighlight}
                  {titleAfter ? (
                    <>
                      <br />
                      {titleAfter}
                    </>
                  ) : null}
                </Typography.Heading>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Typography.Text
                  as="p"
                  className={[
                    "mt-6 max-w-[30ch]",
                    "text-[var(--text-on-colored)]/90",
                    "text-[length:var(--text-body-lg)] leading-[var(--leading-lead)]",
                  ].join(" ")}
                >
                  {description}
                </Typography.Text>
              </motion.div>

              <motion.div variants={fadeInUp} className="mt-8">
                <Button asChild variant="cta" size="lg" withDot aria-label={cta.label}>
                  <a href={cta.href}>{cta.label}</a>
                </Button>
              </motion.div>
            </div>

            {/* Derecha: features */}
            <div className="hero-right col-span-12 md:col-span-5 lg:col-span-4 self-center md:justify-self-end">
              <ul className="hero-features grid gap-8 md:-mt-2 lg:-mt-4 xl:-mt-6" role="list">
                {features.map((f, i) => (
                  <motion.li
                    key={`${f.icon}-${i}`}
                    variants={fadeInUp}
                    className="flex items-start gap-4"
                  >
                    <Image
                      src={`/icons/hero/${f.icon}.svg`}
                      alt=""
                      width={40}
                      height={40}
                      priority={i === 0}
                    />
                    <div>
                      <Typography.Text
                        as="p"
                        className="text-[var(--text-on-colored)] font-medium text-[length:var(--text-body-lg)]"
                      >
                        {f.title}
                      </Typography.Text>
                      <Typography.Text
                        as="p"
                        className="text-[var(--text-on-colored)]/85 text-[length:var(--text-body)] leading-[var(--leading-body)]"
                      >
                        {f.description}
                      </Typography.Text>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Scroll down */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              aria-hidden
              className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[var(--text-on-colored)]/85"
            >
              <span className="text-[length:var(--text-caption)] leading-[var(--leading-caption)]">
                scroll down
              </span>
              <PiCaretDoubleDownBold />
            </motion.div>
          </motion.div>
        </div>

        {/* --- PILL CON ANIMACIÓN ESCALONADA --- */}
        <motion.aside
          variants={pillContainerVariants}
          initial="hidden"
          animate="visible"
          className={[
            "hero-pill-wrap",
            "pointer-events-auto absolute right-4 bottom-4 md:right-6 md:bottom-6",
            "translate-x-[15px] translate-y-[20px] z-[2]",
          ].join(" ")}
          aria-label={pill.caption}
        >
          <div className="hero-pill flex items-center gap-1 px-4 py-3">
            <div className="relative flex items-center">
              {pill.avatars.slice(0, 3).map((src, i) => (
                <motion.div
                  key={i}
                  variants={pillItemVariants}
                  className={cn(
                    i === 0 ? "relative z-[1]" : "",
                    i === 1 ? "relative -ml-6 z-[2]" : "",
                    i === 2 ? "relative -ml-6 z-[3]" : ""
                  )}
                >
                  <Image
                    src={src}
                    alt=""
                    width={70}
                    height={70}
                    className="rounded-full object-cover ring-2 ring-[var(--brand-surface)]"
                  />
                </motion.div>
              ))}
            </div>

            <motion.div variants={pillItemVariants} className="relative -ml-6 z-[10]">
              <div className="grid place-items-center size-[70px] rounded-full bg-[var(--brand-blue-500)] text-[var(--text-on-colored)] text-[length:var(--text-body-sm)] font-medium ring-2 ring-[var(--brand-surface)]">
                {pill.label}
              </div>
            </motion.div>

            <motion.div variants={pillItemVariants} className="flex flex-col pl-2">
              <strong className="text-[var(--brand-text)] font-semibold leading-none text-[clamp(1.5rem,1.05rem+1.1vw,2rem)]">
                {pill.value}
              </strong>
              <span className="mt-0.5 text-[var(--brand-text)]/75 text-[length:var(--text-body-sm)] leading-[var(--leading-body-sm)]">
                {pill.caption}
              </span>
            </motion.div>
          </div>
        </motion.aside>
      </Container>
    </Section>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

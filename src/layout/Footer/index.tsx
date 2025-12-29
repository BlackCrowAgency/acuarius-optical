// src/layout/Footer/index.tsx
"use client";

import type React from "react";
import Link from "next/link";
import {
  LuArrowUpRight,
  LuSend,
  LuUser,
  LuMail,
  LuBuilding2,
  LuPenLine,
  LuInstagram,
  LuFacebook,
  LuLinkedin,
  LuMapPin,
} from "react-icons/lu";
import { Section, Container, Typography } from "@/ui";
import { cn } from "@/utils/cn";
import type { FooterProps } from "./content/footer.mapper";

const SOCIAL_ICON_CLASS = "w-5 h-5";

function getSocialIcon(label: string) {
  const l = label.toLowerCase();
  if (l.includes("instagram")) return <LuInstagram className={SOCIAL_ICON_CLASS} />;
  if (l.includes("facebook")) return <LuFacebook className={SOCIAL_ICON_CLASS} />;
  if (l.includes("linkedin")) return <LuLinkedin className={SOCIAL_ICON_CLASS} />;
  return <LuArrowUpRight className={SOCIAL_ICON_CLASS} />;
}

type InputWithIconProps = {
  icon: React.ReactNode;
  placeholder: string;
  name: string;
  type?: string;
};

function InputWithIcon({ icon, placeholder, name, type = "text" }: InputWithIconProps) {
  return (
    <div className="relative group">
      <div className="absolute top-1/2 -translate-y-1/2 left-4 text-[var(--neutral-400)] group-focus-within:text-[var(--brand-blue-500)] transition-colors">
        <div className="w-5 h-5 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full">
          {icon}
        </div>
      </div>

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={cn(
          "w-full bg-white border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 text-sm text-[var(--neutral-900)]",
          "placeholder:text-gray-400 font-normal",
          "focus:outline-none focus:border-[var(--brand-blue-500)] focus:ring-4 focus:ring-[var(--brand-blue-500)]/10",
          "transition-all duration-300",
        )}
      />
    </div>
  );
}

export default function Footer(props: FooterProps) {
  const {
    title,
    description,
    email,
    address,
    socials,
    connectLabel,
    visitLabel,
    copyrightLabel,
    backToTop,
    form,
  } = props;

  const year = new Date().getFullYear();

  return (
    <Section
      id="footer"
      container="full"
      className={cn(
        // ✅ Mobile/Tablet: fondo celeste (simple, sin “márgenes” alrededor)
        "bg-[var(--brand-blue-500)]",
        // ✅ Desktop: mantiene tu wrapper original (gris y padding exterior)
        "lg:bg-[var(--neutral-50)]",
        "w-full overflow-hidden",
        "py-0 lg:py-4",
      )}
    >
      {/* ✅ Desktop mantiene tus márgenes/padding exteriores. Mobile/Tablet: full-bleed */}
      <Container max="fluid" gutter="none" className="px-0 lg:px-4">
        <div className="w-full lg:max-w-[95rem] lg:mx-auto">
          <div
            className={cn(
              "w-full flex flex-col relative isolate overflow-hidden",
              "bg-[var(--brand-blue-500)] text-white",

              // ✅ SOLO mobile/tablet: sin “cajita” (full width/height feel)
              "rounded-none",
              // ✅ Desktop: EXACTO como tu diseño actual (no lo tocamos)
              "lg:rounded-[1.5rem]",

              // ✅ Mantén tus paddings
              "pt-24 px-6 pb-6",
              "md:pt-40 md:px-12 md:pb-10",
              "lg:px-16 lg:pb-12",
            )}
          >
            {/* Deco */}
            <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-[800px] h-[800px] text-[var(--brand-blue-500)] opacity-[0.03] pointer-events-none select-none">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
              </svg>
            </div>

            <div className="relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-20 items-start lg:items-center">
              {/* LEFT */}
              <div className="flex flex-col py-2">
                <div className="space-y-6 lg:space-y-10">
                  <div>
                    <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/10 text-xs font-bold tracking-widest uppercase text-blue-200 mb-4 backdrop-blur-md">
                      ¿Listo para empezar?
                    </span>

                    <Typography.Heading
                      as="h2"
                      level="h1"
                      className="font-heading text-5xl md:text-6xl lg:text-[5rem] font-bold leading-[0.95] tracking-tight"
                    >
                      {title}
                    </Typography.Heading>
                  </div>

                  <div className="space-y-6">
                    <Typography.Text
                      as="p"
                      className="max-w-md text-base md:text-lg text-blue-100/70 font-light leading-relaxed"
                    >
                      {description}
                    </Typography.Text>

                    <a href={`mailto:${email}`} className="group flex items-center gap-4 w-fit">
                      <div
                        className={cn(
                          "flex items-center justify-center w-12 h-12 rounded-full",
                          "bg-[var(--brand-orange-500)] text-white",
                          "group-hover:scale-110 transition-transform duration-300",
                        )}
                      >
                        <LuMail className="w-5 h-5" />
                      </div>

                      <span className="text-xl md:text-2xl font-medium text-white group-hover:text-blue-200 transition-colors underline decoration-white/30 underline-offset-4 group-hover:decoration-blue-200">
                        {email}
                      </span>
                    </a>
                  </div>
                </div>

                {/* Desktop meta */}
                <div className="hidden lg:grid grid-cols-2 gap-12 border-t border-white/10 pt-8 mt-10">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-4 block">
                      {connectLabel}
                    </span>
                    <div className="flex gap-4">
                      {socials.map((social) => (
                        <Link
                          key={social.label}
                          href={social.href}
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-[var(--brand-orange-500)] transition-all border border-white/5 hover:border-white/20"
                          aria-label={social.label}
                        >
                          {getSocialIcon(social.label)}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-4 block">
                      {visitLabel}
                    </span>
                    <div className="flex gap-3 text-sm text-blue-100/80 font-light">
                      <LuMapPin className="w-5 h-5 text-[var(--brand-orange-500)] shrink-0" />
                      <address className="not-italic space-y-0.5">
                        {address.map((line) => (
                          <p key={line}>{line}</p>
                        ))}
                      </address>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex flex-col lg:pl-10">
                <div className="relative">
                  <div className="relative bg-[#F9FAFB] rounded-[2rem] p-6 md:p-8 overflow-hidden border border-white/10">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[var(--brand-blue-100)] to-transparent opacity-50 rounded-bl-[4rem]" />

                    <div className="relative z-10 mb-6">
                      <Typography.Heading
                        as="h3"
                        className="text-2xl font-heading font-bold text-[var(--neutral-900)]"
                      >
                        Escríbenos
                      </Typography.Heading>

                      <Typography.Text as="p" className="text-sm text-[var(--neutral-500)]">
                        Te responderemos en menos de 24 horas.
                      </Typography.Text>
                    </div>

                    <form className="space-y-4 relative z-10" onSubmit={(e) => e.preventDefault()}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputWithIcon icon={<LuUser />} placeholder={form.namePlaceholder} name="name" />
                        <InputWithIcon
                          icon={<LuMail />}
                          placeholder={form.emailPlaceholder}
                          name="email"
                          type="email"
                        />
                      </div>

                      <InputWithIcon
                        icon={<LuBuilding2 />}
                        placeholder={form.companyPlaceholder}
                        name="company"
                      />

                      <div className="relative group">
                        <div className="absolute top-3.5 left-4 text-[var(--neutral-400)] group-focus-within:text-[var(--brand-blue-500)] transition-colors">
                          <LuPenLine className="w-5 h-5" />
                        </div>

                        <textarea
                          name="message"
                          placeholder={form.messagePlaceholder}
                          className={cn(
                            "w-full bg-white border border-gray-200 rounded-xl py-3 pl-12 pr-4 text-sm text-[var(--neutral-900)]",
                            "placeholder:text-gray-400 font-normal",
                            "focus:outline-none focus:border-[var(--brand-blue-500)] focus:ring-4 focus:ring-[var(--brand-blue-500)]/10",
                            "transition-all duration-300 resize-none h-[80px] lg:h-[100px]",
                          )}
                        />
                      </div>

                      <button
                        type="submit"
                        className={cn(
                          "group w-full mt-2 rounded-xl bg-[var(--brand-orange-500)] py-4 text-sm font-bold uppercase tracking-widest text-white",
                          "transition-[transform,filter] duration-300",
                          "hover:brightness-[0.95] hover:saturate-110",
                          "hover:-translate-y-0.5 active:translate-y-0",
                          "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--brand-blue-500)]/15",
                          "flex items-center justify-center gap-2",
                        )}
                      >
                        <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                          {form.submitLabel}
                        </span>
                        <LuSend className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </button>
                    </form>
                  </div>
                </div>

                {/* Mobile meta */}
                <div className="lg:hidden mt-10 grid gap-8">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-4 block">
                      {connectLabel}
                    </span>
                    <div className="flex flex-wrap gap-3">
                      {socials.map((social) => (
                        <Link
                          key={`m-${social.label}`}
                          href={social.href}
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-[var(--brand-orange-500)] transition-all border border-white/5 hover:border-white/20"
                          aria-label={social.label}
                        >
                          {getSocialIcon(social.label)}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-4 block">
                      {visitLabel}
                    </span>
                    <div className="flex gap-3 text-sm text-blue-100/80 font-light">
                      <LuMapPin className="w-5 h-5 text-[var(--brand-orange-500)] shrink-0" />
                      <address className="not-italic space-y-0.5">
                        {address.map((line) => (
                          <p key={`m-${line}`}>{line}</p>
                        ))}
                      </address>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom bar mobile */}
            <div className="lg:hidden mt-10 pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3 text-[10px] text-white/40">
              <p>
                {copyrightLabel} {year}
              </p>
              {backToTop ? (
                <Link href={backToTop.href} className="flex items-center gap-1 uppercase">
                  {backToTop.label} <LuArrowUpRight />
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

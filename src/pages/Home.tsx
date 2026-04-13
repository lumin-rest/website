import { BlurFade } from "@/components/magicui/blur-fade";
import DotPattern from "@/components/magicui/dot-pattern";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";
import WordFadeIn from "@/components/ui/word-fade-in";
import GameCard from "@/components/game-card";
import { Input } from "@/components/ui/input";
import CopyButton from "@/components/copy-button";
import { ShinyButton } from "@/components/magicui/shiny-button";
import Executor from "@/components/executor";
import { Features } from "@/components/features";
import BuyMspaintButton from "@/components/buy-mspaint";
import { UIStateProvider } from "@/components/obsidian/providers/UIStateProvider";

export default function Home() {
  const gamesStatusData: Record<string, unknown> = {};

  return (
    <>
      <Navbar className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <NavbarBrand>
          <span className="font-bold text-[#f8bfd4]">lumin</span>
          <span className="font-bold">.rest</span>
        </NavbarBrand>

        <NavbarContent justify="end" className="mt-4 mb-4">
          <NavbarItem>
            <Link
              to="/key"
              className="relative text-foreground transition-colors hover:text-[#f8bfd4] after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#f8bfd4] after:transition-all hover:after:w-full"
            >
              Key System
            </Link>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <main className="overflow-x-hidden group">
        <DotPattern
          width={20}
          height={20}
          cx={1}
          cy={1}
          cr={1}
          className={cn(
            "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] -z-50",
            "group-aria-hidden:hidden",
          )}
        />

        {/* ── Hero section ─────────────────────────────────────────── */}
        <div className="min-h-[75vh] flex flex-col items-center justify-center pt-24 pb-16 px-4">
          <BlurFade delay={0.2 + 1 * 0.05}>
            <Link to="/key">
              <div className="flex mb-4">
                <div
                  className={cn(
                    "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800",
                  )}
                >
                  <BuyMspaintButton />
                </div>
              </div>
            </Link>
          </BlurFade>

          <BlurFade delay={0.2 + 2 * 0.05}>
            <h1 className="text-6xl font-bold text-center mb-3">
              <span className="text-[#f8bfd4]">lumin</span>
              <span>.rest</span>
            </h1>
          </BlurFade>

          <BlurFade delay={0.2 + 3 * 0.05}>
            <p className="text-2xl text-center text-muted-foreground mb-6">
              The best{" "}
              <span className="font-bold text-white">Grace</span>{" "}
              script
            </p>
          </BlurFade>

          <BlurFade delay={0.2 + 4 * 0.05}>
            <div className="flex flex-row items-center justify-center gap-2 flex-wrap max-sm:flex-col max-sm:w-[90vw]">
              <Input
                type="text"
                className="overflow-hidden text-ellipsis min-w-[300px] max-sm:min-w-0 max-sm:w-full border-[#f8bfd4]/20 focus-visible:ring-[#f8bfd4]/50"
                readOnly
                value={
                  'loadstring(game:HttpGet("https://api.luarmor.net/files/v4/loaders/1e8ed553780d0658105a816d5a17b100.lua"))()'
                }
              />
              <CopyButton
                text={
                  'loadstring(game:HttpGet("https://api.luarmor.net/files/v4/loaders/1e8ed553780d0658105a816d5a17b100.lua"))()'
                }
              />

              <a
                aria-label="Discord Server"
                href="https://discord.gg/jG9KuUnbXS"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ShinyButton className="px-2" aria-label="Discord Server">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 48 37"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M40.6606 3.08587C37.5127 1.62534 34.1825 0.587574 30.7579 0C30.3314 0.764729 29.833 1.79329 29.4893 2.61157C25.7971 2.06103 22.1387 2.06103 18.5144 2.61157C18.1709 1.79348 17.6612 0.764729 17.2307 0C13.8029 0.587845 10.4698 1.62826 7.32043 3.0935C1.05343 12.4846 -0.645507 21.6422 0.203868 30.6702C4.36056 33.7483 8.38881 35.6182 12.3492 36.8418C13.3334 35.4996 14.2035 34.0786 14.9504 32.5935C13.5284 32.0567 12.1576 31.3951 10.8542 30.6167C11.1972 30.3646 11.5322 30.1018 11.8585 29.8289C19.7564 33.4921 28.3379 33.4921 36.1416 29.8289C36.4694 30.1 36.8042 30.3627 37.1457 30.6167C35.8402 31.3971 34.4669 32.06 33.0421 32.5974C33.7932 34.0885 34.6617 35.5109 35.6432 36.8455C39.6074 35.6221 43.6394 33.7522 47.7961 30.6702C48.7928 20.2046 46.0936 11.1309 40.6606 3.08569V3.08587ZM16.0264 25.1182C13.6555 25.1182 11.7111 22.9233 11.7111 20.2505C11.7111 17.5778 13.6141 15.3792 16.0264 15.3792C18.439 15.3792 20.3832 17.5739 20.3417 20.2505C20.3455 22.9233 18.439 25.1182 16.0264 25.1182ZM31.9735 25.1182C29.6026 25.1182 27.6584 22.9233 27.6584 20.2505C27.6584 17.5778 29.5611 15.3792 31.9735 15.3792C34.3861 15.3792 36.3302 17.5739 36.2888 20.2505C36.2888 22.9233 34.3861 25.1182 31.9735 25.1182Z"
                      fill="#5865F2"
                    />
                  </svg>
                </ShinyButton>
              </a>
            </div>
          </BlurFade>

          {/* Executors */}
          <div className="flex flex-col items-center justify-center mt-16">
            <BlurFade delay={0.2 + 5 * 0.05} inView>
              <h1 className="text-2xl font-bold text-center px-5">
                Supporting your favorite executors
              </h1>
            </BlurFade>

            <div className="flex flex-row items-center justify-center mt-5 gap-8 max-md:flex-col">
              <Executor
                name="Potassium"
                image="https://github.com/user-attachments/assets/e69883e2-2b73-4c72-89a1-1f5ee29525d8"
                url="#"
              />
              <Executor
                name="Seliware"
                image="https://q2p0njok3b.ufs.sh/f/Z155p1jPvLAs2M1WsFKsE4uqeKTGPFHJZhdvYVzSAOgb9aty"
                url="#"
              />
              <Executor
                name="Delta"
                image="https://q2p0njok3b.ufs.sh/f/Z155p1jPvLAslPmgsgFtT6a830HkYDKeuAh9RwMGsqd24CQZ"
                url="#"
              />
            </div>

            <BlurFade delay={0.2 + 7 * 0.05} inView>
              <h4 className="text-muted-foreground text-sm mt-5">
                And many more...
              </h4>
            </BlurFade>
          </div>
        </div>

        {/* ── Games section ─────────────────────────────────────────── */}
        <UIStateProvider>
          <div
            id="games"
            className="flex flex-col items-center mb-[10vh] text-center overflow-hidden relative"
          >
            <WordFadeIn
              className="text-3xl md:text-3xl"
              words="lumin.rest supports Grace"
              inView
            />
            <BlurFade className="mb-[15px]" delay={0.2 + 1 * 0.05} inView>
              <WordFadeIn
                className="text-xl md:text-xl font-normal"
                words="quality gameplay enhancements"
                inView
                initialDelay={0.15 * 6}
                delay={0.35}
              />
            </BlurFade>

            <BlurFade
              className="flex flex-row items-center justify-center mt-5 gap-3 max-md:flex-col flex-wrap px-10"
              delay={0.2 + 2 * 0.05}
              inView
            >
              <GameCard
                title="Grace"
                mappingName="Grace - Grace"
                image="https://q2p0njok3b.ufs.sh/f/Z155p1jPvLAs57LO68MxTny6kRILmGKFZcwpAtJ8zEgP1fNh"
                placeId={138837502355157}
                gamesStatusData={gamesStatusData}
              />
            </BlurFade>
          </div>

          {/* ── Features / Milenium preview ───────────────────────────── */}
          <Features />
        </UIStateProvider>

        {/* ── Footer ──────────────────────────────────────────────── */}
        <Separator className="mt-[2.5rem] w-screen" />

        <div className="px-10 py-6 w-screen flex flex-row justify-between items-center max-md:justify-center max-md:flex-col">
          <div className="px-2 py-2 flex flex-row items-center gap-2">
            <div>
              <p className="text-xs text-left font-bold">
                <span className="text-[#f8bfd4]">lumin</span>.rest
              </p>
              <p className="text-muted-foreground text-xs">
                Site made by transicle
              </p>
            </div>
          </div>
          <p className="text-muted-foreground text-xs px-2 py-2 text-right max-md:text-center max-md:mt-5">
            This software is not affiliated, associated, authorized, endorsed
            by, or
            <br />
            in any way officially connected with Roblox or any of its
            subsidiaries or its affiliates.
          </p>
        </div>
      </main>
    </>
  );
}

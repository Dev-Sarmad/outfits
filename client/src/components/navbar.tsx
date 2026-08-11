import { useRef, useState } from "react";
import { Link } from "@heroui/react";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { Logo } from "@/components/icons";
import { useAuth } from "@/features/auth/hooks/useAuth";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const shutterRef = useRef<HTMLDivElement>(null);

  const { isAuthenticated, Logout, user, status } = useAuth();

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await Logout();
      closeMenu();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const userName = user?.name;
  const isLoading = status === "loading";

  return (
    <nav className="sticky top-0 z-40 w-full border-separator bg-transparent">
      <header className="mx-auto flex min-h-16 w-full max-w-[1280px] items-center justify-between gap-4 px-4 sm:px-6">
        {/* Logo */}
        <div className="flex shrink-0 items-center">
          <Link
            className="flex items-center gap-1"
            href="/"
            onClick={closeMenu}
          >
            <Logo />
          </Link>
        </div>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-6 sm:flex">
          <Link
            aria-label="Bag"
            className="text-lg font-medium transition-opacity hover:opacity-70 lg:text-xl"
            href="/bag"
          >
            Bag (0)
          </Link>

          {/* Authentication */}
          {isLoading ? (
            <span className="text-sm text-default-500">
              Checking...
            </span>
          ) : isAuthenticated ? (
            <div className="flex items-center gap-3">
              <div className="flex max-w-[180px] items-center gap-2">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-success/15 text-sm font-semibold text-success">
                  {userName?.charAt(0).toUpperCase()}
                </span>

                <span className="truncate text-sm font-medium">
                  {userName}
                </span>

                <span
                  className="h-2 w-2 rounded-full bg-success"
                  title="Logged in"
                />
              </div>

              <button
                className="rounded-lg border border-danger/30 px-3 py-2 text-sm font-medium text-danger transition-colors hover:bg-danger/10"
                type="button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              href="/login"
            >
              Login
            </Link>
          )}

          <ThemeSwitch />
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 sm:hidden">
          <Link
            aria-label="Bag"
            className="text-base font-medium"
            href="/bag"
          >
            Bag (0)
          </Link>

          <ThemeSwitch />

          <button
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="rounded-lg p-2 transition-colors hover:bg-default-100"
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  d="M6 18L18 6M6 6l12 12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              ) : (
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div
          ref={shutterRef}
          className="border-t border-separator bg-transparent sm:hidden"
        >
          <div className="px-4 py-4">
            {/* Mobile auth status */}
            <div className="mb-4 rounded-xl border border-separator p-4">
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-warning" />

                  <span className="text-sm text-default-500">
                    Checking authentication...
                  </span>
                </div>
              ) : isAuthenticated ? (
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-success/15 font-semibold text-success">
                      {userName?.charAt(0).toUpperCase()}
                    </span>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">
                        {userName}
                      </p>

                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-success" />

                        <span className="text-xs text-success">
                          Logged in
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    className="shrink-0 rounded-lg border border-danger/30 px-3 py-2 text-sm font-medium text-danger hover:bg-danger/10"
                    type="button"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold">
                      You are logged out
                    </p>

                    <p className="text-xs text-default-500">
                      Login to access your account
                    </p>
                  </div>

                  <Link
                    className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                    href="/login"
                    onClick={closeMenu}
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile navigation */}
            <ul className="flex flex-col gap-1">
              {siteConfig.navMenuItems.map((item, index) => (
                <li key={`${item.label}-${index}`}>
                  <Link
                    className={clsx(
                      "block rounded-lg px-3 py-3 text-base no-underline transition-colors hover:bg-default-100",
                      index === 2
                        ? "text-accent"
                        : index === siteConfig.navMenuItems.length - 1
                          ? "text-danger"
                          : "text-foreground",
                    )}
                    href={item.href ?? "#"}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};
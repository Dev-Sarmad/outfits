export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "OUTFITS",
  description: "Elevate your wardrobe with curated fashion.",
  navItems: [
    {
      label: "Bag",
      href: "/bag",
    },
    {
      label: "Login",
      href: "/login",
    },
  ],
  navMenuItems: [
    {
      label: "Login",
      href: "/login",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/heroui-inc/heroui",
  },
};

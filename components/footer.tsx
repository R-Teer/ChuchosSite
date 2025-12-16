import Link from "next/link"
import { Instagram, Facebook, Twitter } from "lucide-react"

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
]

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/about", label: "ABOUT" },
  { href: "/menu", label: "MENU" },
  { href: "/contact", label: "CONTACT" },
]

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="px-4 md:px-8 lg:px-16 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block">
              <img src="/chuchos-logo.svg" alt="Chuchos Logo" className="h-12 w-auto hover:opacity-80 transition-opacity" />
            </Link>
            <p className="mt-4 text-muted-foreground text-sm leading-relaxed max-w-xs">
              Authentic Mexican street food made with passion and the freshest ingredients.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-display text-xl tracking-wider text-foreground mb-4">NAVIGATE</h3>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-accent transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="font-display text-xl tracking-wider text-foreground mb-4">CONNECT</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Kiosk 14 Market Walk</p>
              <p>Woking, GU21 6AA</p>

              <p>
                <a href="mailto:hola@lataqueria.com" className="hover:text-accent transition-colors">
                  contact@chuchos.co.uk
                </a>
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground/70 hover:bg-accent hover:text-foreground transition-all duration-300"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-xs">© {new Date().getFullYear()} Chuchos. All rights reserved.</p>
          <p className="text-muted-foreground text-xs">Made with 🌶️ in Woking</p>
        </div>
      </div>
    </footer>
  )
}

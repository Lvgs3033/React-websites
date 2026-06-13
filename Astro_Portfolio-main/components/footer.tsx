export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-foreground/70">© {currentYear} Cosmic Portfolio. All rights reserved.</p>
          </div>

          <div>
            <p className="text-foreground/70">
              Designed with <span className="text-accent">♥</span> and the cosmos in mind
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}


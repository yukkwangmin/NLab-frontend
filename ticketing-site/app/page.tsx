import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { EventGrid } from "@/components/event-grid"
import { Categories } from "@/components/categories"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Categories />
        <EventGrid />
      </main>
      <Footer />
    </div>
  )
}

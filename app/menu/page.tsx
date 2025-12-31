"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { X, ChevronLeft } from "lucide-react"
import { MenuSchemaScript } from "@/components/menu-schema-script"

const proteins = [
  { id: "barbacoa", name: "BARBACOA BEEF", image: "/images/barbacoa.png", basePrice: 5.0 },
  { id: "pibil", name: "PORK PIBIL", image: "/images/pibil.png", basePrice: 4.5 },
  { id: "tinga", name: "CHICKEN TINGA", image: "/images/tinga.jpeg", basePrice: 4.0 },
]

const styles = [
  { 
    id: "tacos", 
    name: "Birria Tacos",
    description: "Crispy corn tortillas filled with tender, slow-cooked meat, topped with onions, cilantro, and our signature consommé", 
    upcharge: 4.0, 
    image: "/images/tacos.jpeg" 
  },
  { 
    id: "ramen", 
    name: "Birria Ramen", 
    description: "Rich, flavorful birria broth with ramen noodles, tender meat, and traditional toppings",
    upcharge: 4.5, 
    image: "/images/ramen.jpeg" 
  },
  { 
    id: "quesadilla", 
    name: "Quesadilla", 
    description: "Grilled flour tortilla stuffed with melted cheese and your choice of protein",
    upcharge: 3.5, 
    image: "/images/quesadilla.jpeg" 
  },
  { 
    id: "torta", 
    name: "Torta Sandwich", 
    description: "Traditional Mexican sandwich with your choice of meat, beans, avocado, and fresh vegetables",
    upcharge: 4.5, 
    image: "/images/torta.jpeg" 
  },
  { 
    id: "rice-box", 
    name: "Jalisco Rice Box", 
    description: "Flavorful Mexican rice with your choice of protein, beans, and fresh toppings",
    upcharge: 4.0, 
    image: "/images/ricebox.jpeg" 
  },
  { 
    id: "chilaquiles", 
    name: "Chilaquiles", 
    description: "Crispy tortilla chips simmered in salsa, topped with cheese, crema, and your choice of protein",
    upcharge: 4.5, 
    image: "/images/chilaquilles.jpeg" 
  },
]

const sides = [
  { 
    name: "1993 Style Nachos", 
    description: "Crispy tortilla chips loaded with melted cheese, beans, pico de gallo, and your choice of toppings", 
    price: 6.5, 
    image: "/images/nachos.png" 
  },
  { 
    name: "Bandito Birria Bite", 
    description: "Crispy wonton cups filled with birria meat, cheese, and our special sauce", 
    price: 4.0, 
    image: "/images/bandito.png" 
  },
  { 
    name: "Extra Ranchero Consomme", 
    description: "A cup of our rich, flavorful birria broth for dipping or sipping", 
    price: 1.5, 
    image: "/images/consomme.png" 
  },
]

const desserts = [
  { name: "Churros (1)", price: 1.0, description: "Single churro with dipping sauces", image: "/images/churros.jpeg" },
  { name: "Churros (4)", price: 3.5, description: "Four churros bundle with dipping sauces", image: "/images/churros.jpeg" },
]

const drinks = [
  { 
    name: "Can of Soda", 
    description: "Refreshing carbonated beverage", 
    price: 1.3, 
    image: "/images/soda.png" 
  },
  { 
    name: "Bottle of Water", 
    description: "Pure spring water, 500ml", 
    price: 1.3, 
    image: "/images/water.png" 
  },
]

const menuCategories = [
  { id: "main", name: "BUILD YOUR PROTEIN" },
  { id: "sides", name: "SIDES" },
  { id: "desserts", name: "DESSERTS" },
  { id: "drinks", name: "DRINKS" },
]

type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
}

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("main")
  const [selectedProtein, setSelectedProtein] = useState<string | null>(null)
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null)
  const [cart, setCart] = useState<CartItem[]>([])
  const [isVisible, setIsVisible] = useState(false)
  const [buildStep, setBuildStep] = useState<"step1" | "step2">("step1")

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleProteinSelect = (proteinId: string) => {
    setSelectedProtein(proteinId)
    setBuildStep("step2")
  }

  const handleBackToStep1 = () => {
    setBuildStep("step1")
    setSelectedStyle(null)
  }

  const getMainItemPrice = () => {
    if (!selectedStyle || !selectedProtein) return 0
    const protein = proteins.find((p) => p.id === selectedProtein)
    const style = styles.find((s) => s.id === selectedStyle)
    const proteinPrice = protein?.basePrice || 0
    const stylePrice = style?.upcharge || 0
    return proteinPrice + stylePrice
  }

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((ci) => ci.id === item.id)
      if (existing) {
        return prev.map((ci) => (ci.id === item.id ? { ...ci, quantity: ci.quantity + item.quantity } : ci))
      }
      return [...prev, item]
    })
  }

  const addMainItemToCart = () => {
    if (!selectedStyle || !selectedProtein) return
    const protein = proteins.find((p) => p.id === selectedProtein)
    const style = styles.find((s) => s.id === selectedStyle)
    if (!protein || !style) return

    const itemName = `${protein.name} - ${style.name}`
    const itemPrice = protein.basePrice + style.upcharge

    addToCart({
      id: `${selectedProtein}-${selectedStyle}-${Date.now()}`,
      name: itemName,
      price: itemPrice,
      quantity: 1,
    })

    setSelectedStyle(null)
    setBuildStep("step1")
    setSelectedProtein(null)
  }

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  // Prepare menu items for schema
  const menuItems = styles.flatMap(style => 
    proteins.map(protein => ({
      id: `${style.id}-${protein.id}`,
      name: `${protein.name} ${style.name}`,
      description: style.description,
      price: protein.basePrice + style.upcharge,
      image: style.image // Using the style image as the main image
    }))
  )

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <MenuSchemaScript menuItems={menuItems} />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-background pt-24">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="font-display text-[20vw] text-foreground/[0.03] whitespace-nowrap">MENU</span>
        </div>

        <div className="relative z-10 px-4 md:px-8 lg:px-16 text-center max-w-4xl">
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-[2px] bg-accent" />
              <span className="font-display text-sm tracking-[0.3em] text-accent">CHUCHOS</span>
              <div className="w-12 h-[2px] bg-accent" />
            </div>
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl tracking-tight text-foreground">THE MENU</h1>
          </div>
        </div>
      </section>

      <div className="flex flex-col lg:flex-row gap-8 md:gap-12 px-4 md:px-8 lg:px-16 py-16 md:py-24">
        {/* Main Menu Content */}
        <div className="flex-1">
          {/* Category Tabs */}
          <div className="mb-12 overflow-x-auto">
            <div className="flex gap-2 md:gap-4 min-w-max">
              {menuCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveCategory(category.id)
                    if (category.id !== "main") {
                      setBuildStep("step1")
                      setSelectedProtein(null)
                      setSelectedStyle(null)
                    }
                  }}
                  className={`font-display text-lg md:text-xl tracking-wider px-6 py-3 transition-all duration-300 whitespace-nowrap ${
                    activeCategory === category.id
                      ? "bg-accent text-foreground"
                      : "text-muted-foreground hover:text-foreground border border-border hover:border-accent"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Main Menu - Build Your Protein */}
          {activeCategory === "main" && (
            <section className="bg-card">
              {/* STEP 1: Choose Protein */}
              {buildStep === "step1" && (
                <div className="mb-20">
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 h-[2px] bg-accent" />
                    <h2 className="font-display text-3xl md:text-4xl tracking-tight text-foreground">STEP ONE</h2>
                    <h3 className="font-display text-2xl md:text-3xl tracking-tight text-muted-foreground">
                      Choose Your Protein
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {proteins.map((protein) => (
                      <div
                        key={protein.id}
                        className="group relative overflow-hidden bg-background border-2 border-border hover:border-accent transition-all duration-500 cursor-pointer"
                        onClick={() => handleProteinSelect(protein.id)}
                      >
                        <div className="relative aspect-square overflow-hidden">
                          <Image
                            src={protein.image || "/placeholder.svg"}
                            alt={`${protein.name} - Slow-cooked to perfection with authentic Mexican spices`}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                            quality={80}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                        </div>
                        <div className="p-6">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <h3 className="font-display text-2xl md:text-3xl tracking-tight text-foreground group-hover:text-accent transition-colors duration-300">
                              {protein.name}
                            </h3>
                            <span className="font-display text-2xl md:text-3xl text-accent">£{protein.basePrice.toFixed(2)}</span>
                          </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                      </div>

                    ))}
                  </div>
                </div>
              )}

              {/* STEP 2: Choose Style */}
              {buildStep === "step2" && selectedProtein && (
                <div>
                  <div className="flex items-center gap-4 mb-10">
                    <button
                      onClick={handleBackToStep1}
                      className="p-2 hover:bg-muted transition-colors flex items-center gap-2 text-accent"
                    >
                      <ChevronLeft size={24} />
                      <span className="font-display text-sm tracking-wider">BACK</span>
                    </button>
                    <div className="flex-1">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-[2px] bg-accent" />
                        <h2 className="font-display text-3xl md:text-4xl tracking-tight text-foreground">STEP TWO</h2>
                        <h3 className="font-display text-2xl md:text-3xl tracking-tight text-muted-foreground">
                          Choose Your Style
                        </h3>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8 p-6 bg-muted border-2 border-accent">
                    <p className="font-display text-lg text-foreground tracking-wide">
                      SELECTED PROTEIN:{" "}
                      <span className="text-accent">{proteins.find((p) => p.id === selectedProtein)?.name}</span>
                    </p>
                    <p className="font-display text-sm text-muted-foreground tracking-wider mt-2">
                      Base Price: £{proteins.find((p) => p.id === selectedProtein)?.basePrice.toFixed(2)}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {styles.map((style, index) => (
                      <button
                        key={style.id}
                        onClick={() => setSelectedStyle(style.id)}
                        className={`group relative overflow-hidden transition-all duration-500 border-2 ${
                          selectedStyle === style.id ? "border-accent" : "border-border hover:border-accent"
                        }`}
                        style={{
                          opacity: isVisible ? 1 : 0,
                          transform: isVisible ? "translateY(0)" : "translateY(20px)",
                          transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`,
                        }}
                      >
                        <div className="relative aspect-[16/10] overflow-hidden bg-background">
                          <Image
                            src={style.image || "/placeholder.svg"}
                            alt={`${style.name} - ${style.description}`}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                            quality={80}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                        </div>

                        <div
                          className={`p-6 transition-colors duration-300 ${
                            selectedStyle === style.id
                              ? "bg-accent text-foreground"
                              : "bg-background text-foreground group-hover:bg-muted"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-4 mb-3">
                            <h3
                              className={`font-display text-2xl md:text-3xl tracking-tight ${
                                selectedStyle === style.id
                                  ? "text-foreground"
                                  : "text-foreground group-hover:text-accent transition-colors duration-300"
                              }`}
                            >
                              {style.name}
                            </h3>
                            <span className="font-display text-2xl md:text-3xl whitespace-nowrap">
                              +£{style.upcharge.toFixed(2)}
                            </span>
                          </div>
                          <p className="text-white text-center text-sm mb-3">
                            {style.description}
                          </p>
                          <p className="text-sm font-medium">
                            Total: £
                            {(
                              (proteins.find((p) => p.id === selectedProtein)?.basePrice || 0) + style.upcharge
                            ).toFixed(2)}
                          </p>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={addMainItemToCart}
                    disabled={!selectedStyle}
                    className={`mt-8 w-full py-4 font-display text-2xl tracking-wider transition-all duration-300 ${
                      selectedStyle
                        ? "bg-accent text-foreground hover:opacity-90"
                        : "bg-muted text-muted-foreground cursor-not-allowed"
                    }`}
                  >
                    ADD TO ORDER - £{getMainItemPrice().toFixed(2)}
                  </button>
                </div>
              )}
            </section>
          )}

          {/* Sides */}
          {activeCategory === "sides" && (
            <section className="bg-card">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {sides.map((side, index) => (
                  <div
                    key={side.name}
                    className="group relative overflow-hidden bg-background border border-border hover:border-accent transition-all duration-500"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? "translateY(0)" : "translateY(20px)",
                      transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`,
                    }}
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={side.image || "/placeholder.svg"}
                        alt={`${side.name} - ${side.description || 'Delicious Mexican side dish'}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                        quality={80}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                    </div>

                    <div className="p-6">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="font-display text-2xl md:text-3xl tracking-tight text-foreground group-hover:text-accent transition-colors duration-300">
                          {side.name}
                        </h3>
                        <span className="font-display text-2xl md:text-3xl text-accent">£{side.price.toFixed(2)}</span>
                      </div>
                      {side.description && (
                        <p className="text-white text-center text-sm mb-4">{side.description}</p>
                      )}
                      <button
                        onClick={() => addToCart({ id: side.name, name: side.name, price: side.price, quantity: 1 })}
                        className="w-full bg-accent text-foreground py-2 font-display tracking-wider transition-opacity hover:opacity-90"
                      >
                        ADD
                      </button>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Desserts */}
          {activeCategory === "desserts" && (
            <section className="bg-card">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {desserts.map((dessert, index) => (
                  <div
                    key={dessert.name}
                    className="group relative overflow-hidden bg-background border border-border hover:border-accent transition-all duration-500"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? "translateY(0)" : "translateY(20px)",
                      transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`,
                    }}
                  >
                    {dessert.image && (
                      <div className="relative aspect-square overflow-hidden">
                        <Image
                          src={dessert.image}
                          alt={`${dessert.name} - ${dessert.description || 'Delicious Mexican dessert'}`}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                          quality={80}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <h3 className="font-display text-2xl md:text-3xl tracking-tight text-foreground group-hover:text-accent transition-colors duration-300">
                          {dessert.name}
                        </h3>
                        <span className="font-display text-2xl md:text-3xl text-accent whitespace-nowrap">
                          £{dessert.price.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-white text-center text-sm mb-4">{dessert.description}</p>
                      <button
                        onClick={() =>
                          addToCart({ id: dessert.name, name: dessert.name, price: dessert.price, quantity: 1 })
                        }
                        className="w-full bg-accent text-foreground py-2 font-display tracking-wider transition-opacity hover:opacity-90"
                      >
                        ADD
                      </button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Drinks */}
          {activeCategory === "drinks" && (
            <section className="bg-card">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {drinks.map((drink, index) => (
                  <div
                    key={drink.name}
                    className="group relative overflow-hidden bg-background border border-border hover:border-accent transition-all duration-500"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? "translateY(0)" : "translateY(20px)",
                      transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`,
                    }}
                  >
                    {drink.image && (
                      <div className="relative aspect-square overflow-hidden">
                        <Image
                          src={drink.image}
                          alt={`${drink.name} - ${drink.description || 'Refreshing beverage'}`}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                          quality={80}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <h3 className="font-display text-2xl md:text-3xl tracking-tight text-foreground group-hover:text-accent transition-colors duration-300">
                          {drink.name}
                        </h3>
                        <span className="font-display text-2xl md:text-3xl text-accent whitespace-nowrap">
                          £{drink.price.toFixed(2)}
                        </span>
                      </div>
                      {drink.description && (
                        <p className="text-white text-center text-sm mb-4">{drink.description}</p>
                      )}
                      <button
                        onClick={() => addToCart({ id: drink.name, name: drink.name, price: drink.price, quantity: 1 })}
                        className="w-full bg-accent text-foreground py-2 font-display tracking-wider transition-opacity hover:opacity-90"
                      >
                        ADD
                      </button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="lg:w-80 xl:w-96">
          <div className="sticky top-24 bg-card border border-border p-6 md:p-8">
            <h2 className="font-display text-3xl tracking-tight text-foreground mb-8">YOUR ORDER</h2>

            {cart.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">Build your order by adding items</p>
            ) : (
              <>
                <div className="space-y-4 mb-8 max-h-96 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-start justify-between gap-4 pb-4 border-b border-border">
                      <div className="flex-1">
                        <p className="font-display text-sm tracking-wider text-foreground line-clamp-2">{item.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">Qty: {item.quantity}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <p className="font-display text-lg text-accent">£{(item.price * item.quantity).toFixed(2)}</p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-muted-foreground hover:text-accent transition-colors"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t-2 border-border pt-6">
                  <div className="flex items-center justify-between mb-6">
                    <p className="font-display text-2xl tracking-wider text-foreground">TOTAL</p>
                    <p className="font-display text-3xl text-accent">£{cartTotal.toFixed(2)}</p>
                  </div>
                  <button className="w-full bg-accent text-foreground py-4 font-display text-lg tracking-wider transition-opacity hover:opacity-90">
                    ONLINE ORDERS COMING SOON
                  </button>
                </div>
              </>
            )}
          </div>
        </aside>
      </div>
      <Footer />
    </div>
  )
}

/* Venezuela Ayuda — shared seed data. Sets window.VA. Real centers from the uploaded directory. */
(function () {
  const TAGS = {
    supplies:  { label: "General supplies", es: "Insumos generales", bg: "#e7f5fa", fg: "#0f6b8f" },
    pets:      { label: "Pet supplies",     es: "Mascotas",          bg: "#fdf0e8", fg: "#b85c1a" },
    financial: { label: "Financial",        es: "Donación financiera", bg: "#e8f6ef", fg: "#23885f" }
  };

  const donationGuide = {
    people: [
      "Alimentos no perecederos: arroz, pasta, atún, leche en polvo y aceite.",
      "Artículos de higiene: jabón, papel higiénico, toallas sanitarias y pañales.",
      "Insumos médicos urgentes: guantes, tapabocas, gasas, solución salina y alcohol.",
      "Ropa y cobijas en buen estado.",
      "Agua potable."
    ],
    pets: [
      "Alimento húmedo y seco para perros y gatos.",
      "Arena sanitaria y medicamentos básicos.",
      "Mantas, guacales, collares y platitos."
    ]
  };

  const centers = [
    {
      id: "boston-unido", name: "Boston Unido por Venezuela", verified: true,
      country: "United States", state: "Massachusetts", city: "Winthrop",
      address: "11 Forrest Street, Winthrop, MA", phone: "617-952-1831",
      hours: "Mon–Sat · 10am–6pm", lat: 28, lng: 18,
      tags: ["supplies"],
      items: ["Non-perishable food", "Formula & diapers", "Personal hygiene", "Basic medicine", "Flashlights & batteries", "Blankets", "Clothing in good condition"],
      website: "", instagram: "@bostonxvenezuela"
    },
    {
      id: "unidos-mascotas", name: "Unidos por las Mascotas", verified: true,
      country: "United States", state: "Massachusetts", city: "East Boston",
      address: "5 Antrim Street, East Boston (Sun) · 11 Forrest St Apt 2, Winthrop", phone: "617-952-1831",
      hours: "Sundays + biweekly", lat: 26, lng: 22,
      tags: ["pets"],
      items: ["Dog & cat food", "Canned food", "Veterinary meds & vitamins", "Grooming products", "Blankets & towels", "Cat litter", "Leashes, collars & toys", "Carriers & cages"],
      website: "", instagram: "@unidosporlasmascotas"
    },
    {
      id: "afe-miami", name: "AFE – Amor, Fe y Esperanza", verified: true,
      country: "United States", state: "Florida", city: "Miami",
      address: "6090 NW 84 Ave, Miami, FL 33166", phone: "305-602-4466",
      hours: "Mon–Fri · 9am–5pm", lat: 70, lng: 34,
      tags: ["supplies"],
      items: ["Non-perishable food", "Bottled water", "Clothing", "Shoes", "Personal hygiene", "Diapers & baby milk", "Bedding & blankets", "Basic medical supplies"],
      website: "", instagram: ""
    },
    {
      id: "key-biscayne", name: "Key Biscayne Drop-off", verified: true,
      country: "United States", state: "Florida", city: "Key Biscayne",
      address: "401 Glenridge Rd, Key Biscayne, FL 33149", phone: "",
      hours: "By appointment", lat: 74, lng: 40,
      tags: ["supplies"],
      items: ["Clothing", "Shoes", "Sheets", "Blankets", "Throws"],
      website: "", instagram: ""
    },
    {
      id: "coral-gables", name: "Coral Gables Drop-off", verified: true,
      country: "United States", state: "Florida", city: "Coral Gables",
      address: "1254 Algardi Ave, Coral Gables, FL 33146", phone: "",
      hours: "By appointment", lat: 72, lng: 30,
      tags: ["supplies"],
      items: ["Clothing", "Shoes", "Sheets", "Blankets", "Throws"],
      website: "", instagram: ""
    },
    {
      id: "magna-group", name: "Magna Group", verified: true,
      country: "United States", state: "Florida", city: "Medley",
      address: "9999 NW 89th Ave Bay 3, Medley, FL 33178", phone: "",
      hours: "Mon–Fri · 8am–5pm", lat: 68, lng: 26,
      tags: ["supplies"],
      items: ["Energy bars", "Canned goods", "Sterile gauze", "Bandages", "Isopropyl alcohol", "Nitrile gloves", "Acetaminophen", "Wet wipes", "Hand sanitizer", "Heavy-duty bags", "Thermal blankets", "LED flashlights", "Power banks"],
      website: "", instagram: ""
    },
    {
      id: "juntos-orlando", name: "Juntos por Venezuela — Orlando", verified: true,
      country: "United States", state: "Florida", city: "Orlando",
      address: "Casa de Venezuela Orlando · 3461 E Colonial Dr", phone: "407-501-0194",
      hours: "Mon–Sat · 10am–6pm", lat: 60, lng: 50,
      tags: ["supplies"],
      items: ["Clothing", "Medicine", "Non-perishable food", "Diapers"],
      website: "", instagram: ""
    },
    {
      id: "welove-gem", name: "We Love Foundation + GEM", verified: true,
      country: "United States", state: "Florida", city: "Doral",
      address: "1850 NW 84th St, Doral, FL", phone: "",
      hours: "Mon–Fri · 9am–4pm", lat: 66, lng: 36,
      tags: ["supplies", "financial"],
      items: ["All types of aid & supplies for Venezuela via Cáritas Venezuela and the Venezuelan Episcopal Conference"],
      website: "https://give.gem.org", instagram: ""
    },
    {
      id: "friends-children", name: "Friends of the Children of Venezuela", verified: true,
      country: "United States", state: "Florida", city: "Miami Lakes",
      address: "6135 NW 167th St Suite E13 · +5 locations across Miami-Dade", phone: "",
      hours: "Mon–Sat · 9am–4pm", lat: 64, lng: 44,
      tags: ["supplies"],
      items: ["Non-perishable food", "Drinking water", "Personal hygiene", "Diapers", "First-aid kits", "Flashlights", "Batteries", "Cleaning products", "Sleeping mats", "Blankets", "Sheets", "Comforters"],
      website: "https://childrenvenezuela.org", instagram: ""
    },
    {
      id: "metropolitano", name: "Estadio Metropolitano — Parking Oeste", verified: true,
      country: "Spain", state: "Madrid", city: "San Blas–Canillejas",
      address: "Estadio Metropolitano (Parking Oeste), Madrid", phone: "",
      hours: "Matchday collection", lat: 40, lng: 78,
      tags: ["supplies"],
      items: ["Non-perishable food", "Water", "Clothing", "Shoes", "Hygiene", "Bedding", "Diapers & baby milk", "Basic medical supplies"],
      website: "", instagram: ""
    },
    {
      id: "la-lupita", name: "Taquería La Lupita", verified: true,
      country: "Spain", state: "Madrid", city: "Chamberí",
      address: "Zurbarán 67 / Conde de Xiquena 10, Madrid", phone: "",
      hours: "Business hours", lat: 36, lng: 82,
      tags: ["supplies"],
      items: ["Non-perishable food", "Water", "Clothing", "Shoes", "Hygiene", "Diapers & baby milk"],
      website: "", instagram: ""
    },
    {
      id: "levadura-madre", name: "Panadería Levadura Madre", verified: true,
      country: "Spain", state: "Madrid", city: "Chamberí",
      address: "Bravo Murillo 60, Madrid", phone: "",
      hours: "Business hours", lat: 33, lng: 76,
      tags: ["supplies"],
      items: ["Non-perishable food", "Water", "Hygiene", "Diapers & baby milk"],
      website: "", instagram: ""
    },
    {
      id: "refugiados-sf", name: "Refugiados Sin Fronteras", verified: true,
      country: "Spain", state: "Madrid", city: "Madrid",
      address: "Calle Matilde Landa 9, Madrid", phone: "",
      hours: "Business hours", lat: 44, lng: 88,
      tags: ["supplies"],
      items: ["Non-perishable food", "Water", "Clothing", "Shoes", "Hygiene", "Bedding", "Basic medical supplies"],
      website: "", instagram: ""
    },
    {
      id: "juntos-se-puede-bogota", name: "Juntos Se Puede", verified: true,
      country: "Colombia", state: "Bogotá", city: "Bogotá",
      address: "Calle 104 #54-31", phone: "",
      hours: "Desde 7:00", lat: 45, lng: 42,
      tags: ["supplies"],
      items: ["Alimentos", "Medicamentos", "Ropa", "Guantes", "Tapabocas", "Solución salina", "Gasas", "Alcohol"],
      notes: "Recibe alimentos, medicamentos, ropa, guantes, tapabocas, solución salina, gasas y alcohol.",
      website: "", instagram: ""
    },
    {
      id: "122-plaza-apartahotel", name: "122 Plaza Apartahotel", verified: true,
      country: "Colombia", state: "Bogotá", city: "Bogotá",
      address: "Cra 15A #122-27", phone: "",
      hours: "24 horas", lat: 47, lng: 44,
      tags: ["supplies"],
      items: donationGuide.people,
      notes: "", website: "", instagram: ""
    },
    {
      id: "cali-cra-28b3", name: "Centro de acopio Cali", verified: true,
      country: "Colombia", state: "Valle del Cauca", city: "Cali",
      address: "Cra 28 B3 #72S-32", phone: "",
      hours: "8:00-12:00 y 17:00-19:00", lat: 58, lng: 35,
      tags: ["supplies"],
      items: donationGuide.people,
      notes: "", website: "", instagram: ""
    },
    {
      id: "bucaramanga-calle-18", name: "Centro de acopio Bucaramanga", verified: true,
      country: "Colombia", state: "Santander", city: "Bucaramanga",
      address: "Calle 18 #21-52", phone: "",
      hours: "7:00-19:00", lat: 38, lng: 39,
      tags: ["supplies"],
      items: donationGuide.people,
      notes: "", website: "", instagram: ""
    },
    {
      id: "monteria-calle-28a", name: "Centro de acopio Montería", verified: true,
      country: "Colombia", state: "Córdoba", city: "Montería",
      address: "Calle 28A #4W-79", phone: "",
      hours: "7:00-19:00", lat: 34, lng: 32,
      tags: ["supplies"],
      items: donationGuide.people,
      notes: "", website: "", instagram: ""
    },
    {
      id: "santa-marta-teneria", name: "Parque La Tenería", verified: true,
      country: "Colombia", state: "Magdalena", city: "Santa Marta",
      address: "Parque La Tenería, Cra 2 con 1D36", phone: "",
      hours: "7:00-18:00", lat: 28, lng: 36,
      tags: ["supplies"],
      items: donationGuide.people,
      notes: "", website: "", instagram: ""
    },
    {
      id: "cc-centro-suba", name: "CC Centro Suba", verified: true,
      country: "Colombia", state: "Bogotá", city: "Bogotá",
      address: "Av Calle 145 #91-19 L12-101", phone: "+57 318 534 2222",
      hours: "Horario no indicado", lat: 49, lng: 46,
      tags: ["supplies"],
      items: donationGuide.people,
      notes: "", website: "", instagram: ""
    },
    {
      id: "juca-sushi-bogota", name: "JUCA Sushi", verified: true,
      country: "Colombia", state: "Bogotá", city: "Bogotá",
      address: "Salitre / Chía / Chapinero / Morato / Cedritos", phone: "",
      hours: "Horario no indicado", lat: 51, lng: 43,
      tags: ["supplies"],
      items: ["Alimentos no perecederos"],
      notes: "Acepta no perecederos.", website: "", instagram: ""
    },
    {
      id: "clinihogar-bogota", name: "Clinihogar", verified: true,
      country: "Colombia", state: "Bogotá", city: "Bogotá",
      address: "Calle 50 #14-34, Teusaquillo", phone: "",
      hours: "Horario no indicado", lat: 53, lng: 45,
      tags: ["supplies"],
      items: ["Medicamentos", "Insumos médicos urgentes"],
      notes: "Medicamentos.", website: "", instagram: ""
    },
    {
      id: "cruz-roja-bogota", name: "Cruz Roja Bogotá", verified: true,
      country: "Colombia", state: "Bogotá", city: "Bogotá",
      address: "Bogotá", phone: "WhatsApp: 324 530 9495 / Línea 132",
      hours: "Horario no indicado", lat: 46, lng: 48,
      tags: ["supplies"],
      items: donationGuide.people,
      notes: "Email: rcf@cruzrojabogota.org.co", website: "", instagram: ""
    },
    {
      id: "casa-club-parque-omar", name: "Casa Club Parque Omar", verified: true,
      country: "Panamá", state: "Ciudad de Panamá", city: "Ciudad de Panamá",
      address: "Casa Club Parque Omar", phone: "",
      hours: "Jue-Vie · 8:00-14:00", lat: 64, lng: 54,
      tags: ["supplies"],
      items: donationGuide.people,
      notes: "", website: "", instagram: ""
    },
    {
      id: "montevideo-bakery", name: "Montevideo Bakery", verified: true,
      country: "Uruguay", state: "Montevideo", city: "Montevideo",
      address: "G. Gallinal 1726", phone: "",
      hours: "9:00-18:00", lat: 82, lng: 58,
      tags: ["supplies"],
      items: donationGuide.people,
      notes: "", website: "", instagram: ""
    },
    {
      id: "quito-av-napo", name: "Centro de acopio Quito", verified: true,
      country: "Ecuador", state: "Pichincha", city: "Quito",
      address: "Av. Napo S6-308", phone: "",
      hours: "8:00-16:00", lat: 61, lng: 47,
      tags: ["supplies"],
      items: donationGuide.people,
      notes: "", website: "", instagram: ""
    },
    {
      id: "chamos-burger-guayaquil", name: "Chamos Burger", verified: true,
      country: "Ecuador", state: "Guayas", city: "Guayaquil",
      address: "Guayaquil", phone: "",
      hours: "Desde 10:00", lat: 68, lng: 44,
      tags: ["supplies"],
      items: donationGuide.people,
      notes: "", website: "", instagram: ""
    },
    {
      id: "thelmas-cakes-cdmx", name: "Thelmas Cakes", verified: true,
      country: "México", state: "CDMX", city: "CDMX",
      address: "CDMX", phone: "",
      hours: "9:00-20:00", lat: 51, lng: 25,
      tags: ["supplies"],
      items: donationGuide.people,
      notes: "", website: "", instagram: ""
    },
    {
      id: "parroquia-san-miguel-villahermosa", name: "Parroquia San Miguel Arcángel", verified: true,
      country: "México", state: "Tabasco", city: "Villahermosa",
      address: "Villahermosa", phone: "",
      hours: "10:00-18:00", lat: 57, lng: 28,
      tags: ["supplies"],
      items: donationGuide.people,
      notes: "", website: "", instagram: ""
    },
    {
      id: "lisboa-calcada-tapada", name: "Centro de acopio Lisboa", verified: true,
      country: "Portugal", state: "Lisboa", city: "Lisboa",
      address: "Calçada da Tapada 15", phone: "",
      hours: "11:00-14:00", lat: 31, lng: 72,
      tags: ["supplies"],
      items: donationGuide.people,
      notes: "", website: "", instagram: ""
    },
    {
      id: "madeira-praca-colombo", name: "Centro de acopio Madeira", verified: true,
      country: "Portugal", state: "Madeira", city: "Madeira",
      address: "Praça do Colombo", phone: "",
      hours: "16:30-19:00", lat: 37, lng: 67,
      tags: ["supplies"],
      items: donationGuide.people,
      notes: "", website: "", instagram: ""
    },
    {
      id: "madrid-onate-10", name: "Centro de acopio Madrid", verified: true,
      country: "Spain", state: "Madrid", city: "Madrid",
      address: "Calle Oñate 10", phone: "",
      hours: "9:00-18:00", lat: 38, lng: 84,
      tags: ["supplies"],
      items: donationGuide.people,
      notes: "", website: "", instagram: ""
    },
    {
      id: "tenerife-plaza-catedral", name: "Plaza de la Catedral", verified: true,
      country: "Spain", state: "Tenerife", city: "Tenerife",
      address: "Plaza de la Catedral", phone: "",
      hours: "10:00-18:00", lat: 44, lng: 79,
      tags: ["supplies"],
      items: donationGuide.people,
      notes: "", website: "", instagram: ""
    },
    {
      id: "san-antonio-san-pedro", name: "Centro de acopio San Antonio", verified: true,
      country: "United States", state: "Texas", city: "San Antonio",
      address: "16111 San Pedro Ave", phone: "",
      hours: "Desde 11:00", lat: 58, lng: 18,
      tags: ["supplies"],
      items: donationGuide.people,
      notes: "", website: "", instagram: ""
    },
    {
      id: "hola-lakeway-morristown", name: "HOLA Lakeway Donation Drop-Off", verified: true,
      country: "United States", state: "Tennessee", city: "Morristown",
      address: "Morristown, TN", phone: "",
      hours: "Horario no indicado", lat: 39, lng: 24,
      tags: ["supplies", "pets"],
      items: ["Insumos médicos", "Ropa en buen estado", "Zapatos", "Mantas", "Alimentos no perecederos", "Comida para mascotas", "Fórmula infantil", "Pañales"],
      notes: "Centro de recolección para apoyar a familias afectadas en Venezuela.",
      website: "", instagram: "", mapsQuery: "HOLA Lakeway Donation Drop-Off Morristown TN United States"
    },
    {
      id: "panchita-cafe-oakville", name: "Panchita Café", verified: true,
      country: "Canada", state: "Ontario", city: "Oakville",
      address: "94 George Street, Oakville, ON L6J 3B7", phone: "",
      hours: "7:30 a.m.-6:30 p.m.", lat: 32, lng: 22,
      tags: ["supplies"],
      items: ["Ropa para niños", "Juguetes", "Pañales", "Alimentos no perecederos", "Insumos médicos", "Artículos esenciales"],
      notes: "Horario de recepción: 7:30 a.m.-6:30 p.m.",
      website: "", instagram: "", mapsQuery: "Panchita Cafe 94 George Street Oakville ON L6J 3B7 Canada"
    },
    {
      id: "encanto-cafe-manotick", name: "Encanto Café Manotick", verified: true,
      country: "Canada", state: "Ontario", city: "Ottawa",
      address: "5561 Manotick Main Street, Ottawa, ON", phone: "",
      hours: "Viernes y sábado", lat: 29, lng: 25,
      tags: ["supplies", "pets", "financial"],
      items: ["Gasas", "Vendas", "Cinta adhesiva", "Antisépticos", "Peróxido de hidrógeno", "Guantes", "Jeringas", "Analgésicos", "Antibióticos", "Termómetros", "Mascarillas", "Higiene personal", "Agua embotellada", "Alimentos enlatados", "Arroz", "Pasta", "Frijoles", "Fórmula infantil", "Leche en polvo", "Pañales", "Toallitas", "Biberones", "Ropa", "Cobijas", "Zapatos", "Linternas", "Pilas", "Power banks", "Cargadores", "Lonas", "Bolsas de basura", "Donaciones económicas", "Alimento para mascotas"],
      notes: "Recolección viernes y sábado. Todo será enviado a Toronto antes de salir hacia Venezuela.",
      website: "", instagram: "@encantocafemanotick", mapsQuery: "Encanto Cafe Manotick 5561 Manotick Main Street Ottawa ON Canada"
    },
    {
      id: "niagara-the-meadows", name: "Niagara Collection Point", verified: true,
      country: "Canada", state: "Ontario", city: "St. Catharines",
      address: "24 The Meadows, St. Catharines, ON", phone: "",
      hours: "Viernes y sábado en la mañana", lat: 31, lng: 20,
      tags: ["supplies"],
      items: ["Alimentos no perecederos", "Medicamentos", "Productos de higiene"],
      notes: "Viernes y sábado en la mañana.", website: "", instagram: "",
      mapsQuery: "24 The Meadows St. Catharines Ontario Canada"
    },
    {
      id: "mississauga-lolita-garden", name: "600 Lolita Garden Collection Point", verified: true,
      country: "Canada", state: "Ontario", city: "Mississauga",
      address: "600 Lolita Garden, Mississauga, ON", phone: "",
      hours: "Viernes y sábado", lat: 33, lng: 21,
      tags: ["supplies"],
      items: ["Alimentos", "Medicinas", "Higiene"],
      notes: "Viernes y sábado.", website: "", instagram: "",
      mapsQuery: "600 Lolita Garden Mississauga Ontario Canada"
    },
    {
      id: "casa-latina-london", name: "Casa Latina", verified: true,
      country: "Canada", state: "Ontario", city: "London",
      address: "150 Dundas Street, London, ON", phone: "",
      hours: "Sábado · 10:00 a.m.-4:00 p.m.", lat: 34, lng: 19,
      tags: ["supplies"],
      items: ["Alimentos", "Medicinas", "Productos de higiene"],
      notes: "Sábado de 10:00 a.m. a 4:00 p.m.", website: "", instagram: "",
      mapsQuery: "Casa Latina 150 Dundas Street London Ontario Canada"
    },
    {
      id: "golfers-edge-oshawa", name: "The Golfer's Edge Indoor Golf", verified: true,
      country: "Canada", state: "Ontario", city: "Oshawa",
      address: "472 Taunton Road West, Oshawa, ON", phone: "905-441-0756",
      hours: "Hasta el domingo · 8:00 p.m.", lat: 32, lng: 24,
      tags: ["supplies"],
      items: ["Alimentos", "Medicinas", "Productos de higiene"],
      notes: "Reciben donaciones hasta el domingo a las 8:00 p.m.", website: "", instagram: "",
      mapsQuery: "The Golfer's Edge Indoor Golf 472 Taunton Road West Oshawa Ontario Canada"
    },
    {
      id: "rincon-paisa-hamilton", name: "Rincón Paisa", verified: true,
      country: "Canada", state: "Ontario", city: "Hamilton",
      address: "958 Upper Wellington Street, Hamilton, ON", phone: "",
      hours: "Horario no indicado", lat: 34, lng: 22,
      tags: ["supplies"],
      items: ["Alimentos", "Medicamentos", "Higiene"],
      notes: "Centro de acopio.", website: "", instagram: "",
      mapsQuery: "Rincon Paisa 958 Upper Wellington Street Hamilton Ontario Canada"
    },
    {
      id: "kitchener-summerhill", name: "Summerhill Crescent Collection Point", verified: true,
      country: "Canada", state: "Ontario", city: "Kitchener",
      address: "31 Summerhill Crescent, Kitchener, ON", phone: "",
      hours: "Viernes · 9:00 a.m.-6:00 p.m.", lat: 33, lng: 20,
      tags: ["supplies"],
      items: ["Alimentos", "Medicinas", "Higiene"],
      notes: "Viernes de 9:00 a.m. a 6:00 p.m.", website: "", instagram: "",
      mapsQuery: "31 Summerhill Crescent Kitchener Ontario Canada"
    },
    {
      id: "kitchener-union-street", name: "Union Street Collection Point", verified: true,
      country: "Canada", state: "Ontario", city: "Kitchener",
      address: "86 Union Street, Kitchener, ON", phone: "",
      hours: "Sábado · 9:00 a.m.-6:00 p.m.", lat: 35, lng: 20,
      tags: ["supplies"],
      items: ["Alimentos", "Medicinas", "Higiene"],
      notes: "Sábado de 9:00 a.m. a 6:00 p.m.", website: "", instagram: "",
      mapsQuery: "86 Union Street Kitchener Ontario Canada"
    },
    {
      id: "jd-eyewear-hamilton", name: "JD Eyewear", verified: true,
      country: "Canada", state: "Ontario", city: "Hamilton",
      address: "100 George Street, Hamilton, ON", phone: "",
      hours: "Horario no indicado", lat: 35, lng: 23,
      tags: ["supplies"],
      items: ["Alimentos", "Medicinas", "Productos de higiene"],
      notes: "", website: "", instagram: "",
      mapsQuery: "JD Eyewear 100 George Street Hamilton Ontario Canada"
    },
    {
      id: "latin-dough-etobicoke", name: "Latin Dough", verified: true,
      country: "Canada", state: "Ontario", city: "Etobicoke",
      address: "533 Evans Avenue, Etobicoke, ON", phone: "",
      hours: "Horario no indicado", lat: 33, lng: 23,
      tags: ["supplies"],
      items: ["Alimentos", "Medicinas", "Higiene"],
      notes: "", website: "", instagram: "",
      mapsQuery: "Latin Dough 533 Evans Avenue Etobicoke Ontario Canada"
    },
    {
      id: "tia-flor-toronto", name: "Tía Flor", verified: true,
      country: "Canada", state: "Ontario", city: "Toronto",
      address: "1698 Eglinton Avenue West, Toronto, ON", phone: "",
      hours: "12:00 p.m.-9:00 p.m.", lat: 31, lng: 23,
      tags: ["supplies"],
      items: ["Alimentos", "Medicinas", "Higiene"],
      notes: "Horario: 12:00 p.m.-9:00 p.m.", website: "", instagram: "",
      mapsQuery: "Tia Flor 1698 Eglinton Avenue West Toronto Ontario Canada"
    },
    {
      id: "cambridge-ridgewood", name: "Ridgewood Crescent Collection Point", verified: true,
      country: "Canada", state: "Ontario", city: "Cambridge",
      address: "52 Ridgewood Crescent, Cambridge, ON", phone: "",
      hours: "Horario no indicado", lat: 36, lng: 21,
      tags: ["supplies"],
      items: ["Alimentos", "Medicinas", "Higiene"],
      notes: "", website: "", instagram: "",
      mapsQuery: "52 Ridgewood Crescent Cambridge Ontario Canada"
    },
    {
      id: "larepa-bistro-saint-hubert", name: "L'Arepa Bistro", verified: true,
      country: "Canada", state: "Quebec", city: "Saint-Hubert",
      address: "3366 Grande Allée, Saint-Hubert, QC", phone: "",
      hours: "Horario no indicado", lat: 30, lng: 27,
      tags: ["supplies"],
      items: ["Alimentos", "Medicinas", "Higiene"],
      notes: "South Shore de Montreal.", website: "", instagram: "",
      mapsQuery: "L'Arepa Bistro 3366 Grande Allee Saint-Hubert Quebec Canada"
    },
    {
      id: "passion-desserts-markham", name: "Passion for Desserts", verified: true,
      country: "Canada", state: "Ontario", city: "Markham",
      address: "6545 Highway 7 East, Unit 17, Markham, ON", phone: "",
      hours: "Horario no indicado", lat: 30, lng: 24,
      tags: ["supplies"],
      items: ["Alimentos", "Medicinas", "Higiene"],
      notes: "", website: "", instagram: "",
      mapsQuery: "Passion for Desserts 6545 Highway 7 East Unit 17 Markham Ontario Canada"
    },
    {
      id: "arepa-zone-college-park", name: "Arepa Zone College Park", verified: true,
      country: "United States", state: "Maryland", city: "College Park",
      address: "4341 Calvert Road, College Park, MD", phone: "",
      hours: "Horario no indicado", lat: 43, lng: 25,
      tags: ["supplies"],
      items: ["Albuterol", "Salbutamol", "Acetaminofén", "Ibuprofeno", "Naproxeno", "Loratadina", "Cetirizina", "Loperamida", "Descongestionantes", "Gasas", "Cremas", "Solución salina", "Glucómetros", "Tabletas purificadoras de agua"],
      notes: "Recibe medicamentos e insumos médicos específicos.", website: "", instagram: "",
      mapsQuery: "Arepa Zone 4341 Calvert Road College Park Maryland United States"
    },
    {
      id: "arepa-zone-14th-street", name: "Arepa Zone 14th Street", verified: true,
      country: "United States", state: "Washington D.C.", city: "Washington D.C.",
      address: "1121 14th Street NW, Washington, DC", phone: "",
      hours: "Horario no indicado", lat: 44, lng: 26,
      tags: ["supplies"],
      items: ["Medicamentos", "Insumos médicos"],
      notes: "Recibe medicamentos e insumos médicos.", website: "", instagram: "",
      mapsQuery: "Arepa Zone 1121 14th Street NW Washington DC United States"
    },
    {
      id: "antojitos-fairfax", name: "Antojitos de tu País", verified: true,
      country: "United States", state: "Virginia", city: "Fairfax",
      address: "3160 Spring Street, Unit B, Fairfax, VA", phone: "",
      hours: "Horario no indicado", lat: 45, lng: 24,
      tags: ["supplies"],
      items: ["Medicamentos", "Insumos médicos"],
      notes: "Recibe medicamentos e insumos médicos.", website: "", instagram: "",
      mapsQuery: "Antojitos de tu Pais 3160 Spring Street Unit B Fairfax Virginia United States"
    },
    {
      id: "pardago-vista-hermosa", name: "Pardago Vista Hermosa", verified: true,
      country: "México", state: "CDMX", city: "Ciudad de México",
      address: "Av. Noche de Paz 14, Plaza Vista Hermosa, Local 6A", phone: "",
      hours: "Jue-Vie · 10:00 a.m.-9:00 p.m. / Sáb · 9:00 a.m.-6:00 p.m.", lat: 58, lng: 28,
      tags: ["supplies"],
      items: ["Gasas", "Adhesivos", "Guantes de nitrilo", "Vendas", "Compresas", "Desodorante", "Pasta dental", "Jabón", "Toallas sanitarias", "Bolsas de basura", "Ropa limpia"],
      notes: "Jueves y viernes: 10:00 a.m.-9:00 p.m. Sábado: 9:00 a.m.-6:00 p.m.",
      website: "", instagram: "", mapsQuery: "Pardago Vista Hermosa Av Noche de Paz 14 Plaza Vista Hermosa Local 6A Ciudad de Mexico"
    },
    {
      id: "pardago-polanco", name: "Pardago Polanco", verified: true,
      country: "México", state: "CDMX", city: "Ciudad de México",
      address: "Av. Horacio 214, V Sección de Polanco", phone: "",
      hours: "Horario habitual de la tienda", lat: 56, lng: 29,
      tags: ["supplies"],
      items: ["Gasas", "Adhesivos", "Guantes de nitrilo", "Vendas", "Compresas", "Desodorante", "Pasta dental", "Jabón", "Toallas sanitarias", "Bolsas de basura", "Ropa limpia"],
      notes: "Recibe los mismos artículos que Pardago Vista Hermosa. En horario habitual de la tienda.",
      website: "", instagram: "", mapsQuery: "Pardago Polanco Av Horacio 214 V Seccion de Polanco Ciudad de Mexico"
    }
  ];

  const orgs = [
    { id: "vacc", name: "VACC Foundation", initials: "VA", color: "#0f6b8f",
      desc: "Coordinating verified relief shipments to families affected by the earthquake, in partnership with local parishes.",
      raised: 184200, goal: 250000, methods: ["website", "gofundme", "paypal", "bank"],
      website: "https://vaccfoundation.org/donate-now", reports: 4 },
    { id: "gofundme-terremoto", name: "Ayudemos a las familias afectadas por el terremoto en Venezuela", initials: "AF", color: "#00B964",
      desc: "GoFundMe campaign raising emergency funds for families affected by the earthquake in Venezuela — food, shelter and medical aid delivered directly.",
      raised: 412800, goal: 500000, methods: ["gofundme"],
      website: "https://www.gofundme.com/f/ayudemos-a-las-familias-afectadas-por-el-terremoto-en-venezu", reports: 6 },
    { id: "fcv", name: "Friends of the Children of Venezuela", initials: "FC", color: "#c74738",
      desc: "Focused on children and families — formula, diapers, first-aid kits and bedding distributed through six Miami centers.",
      raised: 96500, goal: 150000, methods: ["website", "gofundme", "bank"],
      website: "https://childrenvenezuela.org", reports: 3 },
    { id: "direct-relief", name: "Direct Relief", initials: "DR", color: "#123044",
      desc: "Venezuela Earthquake Response — medical aid and emergency supplies coordinated with health authorities.",
      raised: 528000, goal: 600000, methods: ["website", "bank"],
      website: "https://www.directrelief.org", reports: 8 },
    { id: "crs", name: "Catholic Relief Services", initials: "CRS", color: "#9a5b18",
      desc: "Long-term recovery, shelter rebuilding and family support through the Venezuelan Episcopal Conference network.",
      raised: 312400, goal: 450000, methods: ["website", "paypal", "bank"],
      website: "https://www.crs.org", reports: 5 },
    { id: "irc", name: "International Rescue Committee", initials: "IRC", color: "#557c9b",
      desc: "Protection, clean water and cash assistance for displaced families across the most-affected regions.",
      raised: 247900, goal: 400000, methods: ["website", "gofundme", "bank"],
      website: "https://www.rescue.org", reports: 4 }
  ];

  const families = [];

  window.VA = { TAGS, donationGuide, centers, orgs, families,
    stats: [
      { value: "14", label: "Countries participating", labelEs: "Países participantes", color: "#0f6b8f" },
      { value: "55", label: "Collection centers", labelEs: "Centros de acopio", color: "#123044" },
      { value: "Soon", label: "Verified families", labelEs: "Familias verificadas", color: "#23885f" },
      { value: "22", label: "Verified organizations", labelEs: "Organizaciones verificadas", color: "#557c9b" },
      { value: "$284K", label: "Funds raised", labelEs: "Fondos recaudados", color: "#E0A411" },
      { value: "540", label: "Volunteers", labelEs: "Voluntarios", color: "#c74738" }
    ]
  };
})();

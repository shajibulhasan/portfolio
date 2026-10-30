const B = import.meta.env.BASE_URL;
// Edit all site content here.
export const P = {
  name: "Shajibul Hasan Soaib", first: "Shajibul", last: "Hasan Soaib",
  intro: "I build Laravel back ends, React front ends and Flutter apps for businesses, from admin panels and POS systems to full online stores.",
  email: "shajibulhasan.ms@gmail.com", phone: "01571-171044", whatsapp: "8801571171044",
  linkedin: "https://www.linkedin.com/in/shajibulhasansoaib/", github: "https://github.com/shajibulhasan",
  formEndpoint: "", // optional: paste your Formspree URL (https://formspree.io/f/xxxx) to receive messages directly; empty = opens email app
  cv: `${B}asset/cv.pdf`, photo: `${B}asset/soaib.jpeg`,
  about: [
    "I'm a full stack web and app developer. I build responsive web apps with React.js, cross-platform mobile apps with Flutter, and scalable back ends with Laravel.",
    "I focus on clean REST APIs, well-designed databases and interfaces that are fast, secure and easy to use.",
  ],
  facts: [["Location", "Chittagong, Bangladesh"], ["Education", "B.Sc in CSE"], ["Experience", "3.5+ years"], ["Languages", "Bengali, English"]],
  points: [["Clean code", "MVC architecture and SOLID principles"], ["Responsive by default", "Mobile-first, cross-device UI"], ["API development", "🔌", "REST APIs with JWT and Sanctum"], ["Performance", "Query and load-time optimization"]],
};
export const skills = [
  ["Frontend", ["React.js", "Flutter", "JavaScript", "Bootstrap 5"]],
  ["Backend", ["Laravel", "PHP (OOP)", "MVC", "Sanctum"]],
  ["Data and tools", ["MySQL", "Firebase", "Git", "Postman"]],
  ["Deployment", ["cPanel", "Shared hosting", "Vite", "NPM"]],
];
export const projects = [
  { name: "Nurjahan Store", type: "E-commerce platform", hue: 200, image: `${B}asset/nurjahan.webp`,
    desc: "Complete online store with product and category management, inventory tracking, cart, order processing, customer management, payment integration and REST API services.",
    tags: ["React.js", "Laravel", "MySQL", "REST API"], live: "https://nurjahanstore.com/", source: "https://github.com/shajibulhasan/ms-nurjahan-store" },
  { name: "Traffic Offense Management", type: "Web and mobile app", hue: 30, image: `${B}asset/online.webp`,
    desc: "Laravel web system with REST APIs powering a connected Flutter app: violation reporting, fine management, offender records and admin monitoring.",
    tags: ["Laravel", "Flutter", "REST API"], live: "https://www.otms.logicthree.com/", source: "https://github.com/shajibulhasan/online-traffic-offense-management-system" },
  { name: "Millennium Solution", type: "Corporate website", hue: 260, image: `${B}asset/millennium.webp`,
    desc: "Responsive corporate website presenting the company's services and identity, built for clean navigation and fast loading on every device.",
    tags: ["React.js", "Responsive UI"], live: "https://millennium-solution.vercel.app/", source: "https://github.com/shajibulhasan/millennium-solution" },
  { name: "B & Y Private Ltd.", type: "Construction website", hue: 215, image: `${B}asset/by-private.png`,
    desc: "Website for a construction and engineering company in Agrabad, Chittagong, presenting residential, commercial and industrial projects.",
    tags: ["React.js", "Responsive UI"], live: "https://b-y-private-ltd.vercel.app", source: "https://github.com/shajibulhasan/b-y-private-ltd" },
  { name: "Astana-e-Pak Darbare Musabia", type: "Spiritual darbar website", hue: 150, image: `${B}asset/astana.png`,
    desc: "Bengali-language website for a spiritual darbar, with a simple, readable and mobile-friendly layout.",
    tags: ["React.js", "Responsive UI", "Bengali content"], live: "https://astanaepakdarbaremusabia.com", source: "https://github.com/shajibulhasan/darbar-site-v2" },
];
export const services = [
  ["Web development", "🌐", "Responsive full stack web apps with Laravel and React.js."],
  ["API development", "🔌", "Secure REST APIs with JWT or Sanctum authentication."],
  ["Database design", "🗄️", "Optimized MySQL schemas, migrations and query tuning."],
  ["UI implementation", "🎨", "Clean, responsive interfaces with modern CSS."],
  ["Business systems", "🧱", "Admin panels, POS systems and e-commerce platforms, end to end."],
  ["Mobile apps", "📱", "Cross-platform Flutter apps connected to Laravel APIs."],
];
export const work = [
  ["Jan 2025 – Present", "IT Engineer and Software Developer", "Millennium Solution", "Custom websites and software, plus TallyPrime support and training."],
  ["Jul 2024 – Dec 2024", "Developer", "Premier University Computer Club", "Built and maintained club web apps with better UI/UX and responsive design."],
];
export const education = [
  ["2021 – 2025", "B.Sc in Computer Science and Engineering", "Premier University, Chittagong", "Software engineering, databases and web technologies."],
];
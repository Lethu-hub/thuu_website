from django.shortcuts import render

# ---------- SERVICES DATA (GLOBAL) ----------
services_list = [
    {
        "title": "Micro Business Online Setup",
        "slug": "micro-business-online-setup",
        "image": "Micro Business Online Setup.png",
        "description": "Professional online setup for micro and home-based businesses.",
        "about": (
            "This service helps small and home-based businesses establish a polished and "
            "professional online presence. We assist with website setup, social media placement, "
            "basic branding elements, and ensure your business is discoverable and trusted online."
        ),
        "who": [
            "Micro-business owners",
            "Startups",
            "Side-hustlers",
            "Freelancers",
            "Anyone needing immediate online visibility"
        ],
        "process": [
            "Free consultation to understand your goals",
            "Select your preferred website style",
            "We build your website (1–4 pages)",
            "Optional: Assist with social media accounts",
            "Link platforms together for consistency"
        ],
        "combos": [
            "Website Only – A clean, simple, professional site",
            "Website + Social Integration – Website plus connected social pages",
            "Social Integration Only – Facebook, Instagram, WhatsApp setup"
        ],
        "faq": {
            "why": "Some businesses need a simple but credible online presence to gain trust, be discoverable, and present professionalism.",
            "price": "Prices vary depending on pages, features, and customization. Consultation is free.",
            "timeline": "A simple 1–2 page website takes 2–3 days. Larger websites may take 1–2 weeks.",
            "process": "You choose a style, we build, review, revise, and publish. Simple and clear."
        }
    },

    {
        "title": "Branding & Logo Design",
        "slug": "branding-logo-design",
        "image": "Branding & Logo Design.png",
        "description": "Logo design, brand identity, and visual branding direction.",
        "about": (
            "We create professional branding that reflects the personality and values of your business. "
            "This includes logos, color palettes, font direction, and a cohesive brand identity."
        ),
        "who": [
            "New businesses",
            "Companies undergoing rebranding",
            "Creators & influencers",
            "Freelancers",
            "Clothing or product brands"
        ],
        "process": [
            "Brand consultation",
            "Moodboard creation",
            "Designing multiple logo concepts",
            "Revisions & refinements",
            "Final delivery with branding kit"
        ],
        "combos": [
            "Basic – 1 logo concept + 1 revision",
            "Standard – 3 concepts + colors + fonts",
            "Full Identity – branding book + logo + social kit"
        ],
        "faq": {
            "why": "Branding increases recognition, trust, and professionalism.",
            "price": "Pricing depends on number of concepts and complexity. Consultation is free.",
            "timeline": "Logos take 1–3 days depending on revisions.",
            "process": "We research, design, revise, and deliver the final brand kit."
        }
    },

    {
        "title": "Social Media Management",
        "slug": "social-media-management",
        "image": "Social Media Management.png",
        "description": "Professional content creation and account management.",
        "about": (
            "We plan, design, schedule, and manage your social media to grow your visibility, engagement, "
            "and online presence. This includes content strategy, analytics, and community engagement."
        ),
        "who": [
            "Small businesses",
            "Service providers",
            "Online stores",
            "Personal brands",
            "Content creators"
        ],
        "process": [
            "Social media audit",
            "Content planning",
            "Designing graphics",
            "Scheduling posts",
            "Monthly analytics report"
        ],
        "combos": [
            "Starter – 8 posts/month",
            "Growth – 12 posts + reels/month",
            "Full Management – 20 posts + 4 reels + engagement"
        ],
        "faq": {
            "why": "Strong social media presence helps you reach new clients consistently.",
            "price": "Prices depend on post frequency, platforms, and design needs.",
            "timeline": "Content is created weekly and scheduled monthly.",
            "process": "We plan, design, schedule, track, and optimize growth."
        }
    },

    {
        "title": "Freelance Writer & Editor",
        "slug": "freelance-writer-editor",
        "image": "Freelance Writer & Editor.png",
        "description": "Professional editing and writing for books, speeches, and documents.",
        "about": (
            "We refine and elevate written content — from novels and speeches to academic work and business "
            "documents. This includes editing, rewriting, tone enhancement, and structural improvements."
        ),
        "who": [
            "Authors",
            "Students",
            "Business professionals",
            "Public speakers",
            "Bloggers"
        ],
        "process": [
            "You submit your document",
            "We assess tone, structure, and clarity",
            "Editing or rewriting begins",
            "Draft delivered for review",
            "Final polished version provided"
        ],
        "combos": [
            "Basic Edit – grammar and corrections",
            "Standard Edit – clarity + wording + structure",
            "Full Rewrite – deep structural and tone improvement"
        ],
        "faq": {
            "why": "Polished writing communicates professionalism and authority.",
            "price": "Depends on length and depth of editing required.",
            "timeline": "Small pieces take 24–48 hours. Large documents take longer.",
            "process": "Review → Edit → Feedback → Final delivery."
        }
    },

    {
        "title": "Programming & Data Analytics Tutoring",
        "slug": "programming-data-analytics-tutoring",
        "image": "Programming & Data Analytics Tutoring.png",
        "description": "Learn Python, R, SQL, analytics, and real-world technical skills.",
        "about": (
            "Hands-on tutoring dedicated to helping beginners and intermediate learners understand programming "
            "and data analytics using real projects and practical exercises."
        ),
        "who": [
            "Students",
            "Beginner programmers",
            "Data enthusiasts",
            "Entrepreneurs wanting technical skills"
        ],
        "process": [
            "Consultation to determine goals",
            "Skills assessment",
            "Weekly exercises and project-based learning",
            "Review and guidance"
        ],
        "combos": [
            "Languages Only – Python, R, SQL basics",
            "Webapps / Analytics Track – Build dashboards and webapps",
            "Data Analytics Track – Data cleaning, visualization, analytics"
        ],
        "faq": {
            "why": "Learning technical skills opens opportunities in tech, business, and freelancing.",
            "price": "Pricing depends on length of lessons and track.",
            "timeline": "Crash courses take hours; full training takes weeks.",
            "process": "Intro → Lessons → Practice → Projects → Review."
        }
    },

    {
        "title": "Business Tech & IT Support",
        "slug": "business-tech-it-support",
        "image": "Business Tech & IT Support.png",
        "description": "Troubleshooting, setup, optimization, and basic tech support.",
        "about": (
            "We assist micro-businesses and individuals with IT setups, troubleshooting, software issues, "
            "system cleanups, IT audits, and tech optimization."
        ),
        "who": [
            "Micro-business owners",
            "Individuals needing tech help"
        ],
        "process": [
            "Free consultation to identify the issue",
            "Remote or on-site support",
            "Fix, optimize, and stabilize systems",
            "Advice for ongoing maintenance"
        ],
        "combos": [
            "One-Time Fix",
            "Monthly Support Package",
            "Full IT Audit"
        ],
        "faq": {
            "why": "Tech issues slow productivity — fixing them increases efficiency.",
            "price": "Price depends on the complexity of the issue.",
            "timeline": "Most issues resolved same day.",
            "process": "Identify → Fix → Test → Improve."
        }
    }
]

# ---------- VIEWS ----------
def index(request):
    return render(request, 'services/index.html', {"services": services_list})

def detail(request, slug):
    service = next((s for s in services_list if s["slug"] == slug), None)
    return render(request, 'services/detail.html', {"service": service})

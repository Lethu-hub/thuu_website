from django.shortcuts import render, get_object_or_404

# Example data; can later convert to a model if desired

def index(request):
    services = [
        {
            "title": "Micro Business Online Setup",
            "slug": "micro-business-online-setup",
            "image": "Micro Business Online Setup.png",
            "description": "Get your small business online with websites and e-commerce setup."
        },
        {
            "title": "Branding & Logo Design",
            "slug": "branding-logo-design",
            "image": "Branding & Logo Design.png",
            "description": "Design memorable logos and visual branding for your business."
        },
        {
            "title": "Social Media Management",
            "slug": "social-media-management",
            "image": "Social Media Management.png",
            "description": "Grow your audience and sales on Facebook, Instagram, and WhatsApp."
        },
        {
            "title": "Freelance Writer & Editor",
            "slug": "freelance-writer-editor",
            "image": "Freelance Writer & Editor.png",
            "description": "Editing novels, writing speeches, and refining creative works."
        },
        {
            "title": "Programming & Data Analytics Tutoring",
            "slug": "programming-data-analytics-tutoring",
            "image": "Programming & Data Analytics Tutoring.png",
            "description": "Learn Python, R, SQL, and advanced data analytics hands-on."
        },
        {
            "title": "Business Tech & IT Support",
            "slug": "business-tech-it-support",
            "image": "Business Tech & IT Support.png",
            "description": "Troubleshoot software, IT audits, and keep your systems running."
        },
    ]
    return render(request, 'services/index.html', {"services": services})


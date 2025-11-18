from django.shortcuts import render, get_object_or_404

# Example data; can later convert to a model if desired
SERVICES = [
    {
        'slug': 'micro-business-online-setup',
        'title': 'Micro Business Online Setup',
        'description': 'Get your small business online with websites and e-commerce setup.',
        'image': 'Micro Business Online Setup.png',
    },
    {
        'slug': 'branding-logo-design',
        'title': 'Branding & Logo Design',
        'description': 'Design memorable logos and visual branding for your business.',
        'image': 'Branding & Logo Design.png',
    },
    {
        'slug': 'social-media-management',
        'title': 'Social Media Management',
        'description': 'Grow your audience and sales on Facebook, Instagram, and WhatsApp.',
        'image': 'Social Media Management.png',
    },
    {
        'slug': 'freelance-writer-editor',
        'title': 'Freelance Writer & Editor',
        'description': 'Editing novels, writing speeches, and refining creative works.',
        'image': 'Freelance Writer & Editor.png',
    },
    {
        'slug': 'programming-data-analytics-tutoring',
        'title': 'Programming & Data Analytics Tutoring',
        'description': 'Learn Python, R, SQL, and advanced data analytics hands-on.',
        'image': 'Programming & Data Analytics Tutoring.png',
    },
    {
        'slug': 'business-tech-it-support',
        'title': 'Business Tech & IT Support',
        'description': 'Troubleshoot software, IT audits, and keep your systems running.',
        'image': 'Business Tech & IT Support.png',
    },
]

def index(request):
    return render(request, 'services/index.html')

def detail(request, slug):
    service = get_object_or_404([s for s in SERVICES if s['slug'] == slug])
    return render(request, 'services/detail.html', {'service': service})


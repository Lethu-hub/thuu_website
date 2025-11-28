from django.shortcuts import render

# Creative page – showcasing social media and author section
def index(request):
    social_links = {
        "facebook": "https://www.facebook.com/thinithuuu",
        "instagram": "https://www.instagram.com/thuu.real",
        "tiktok": "https://www.tiktok.com/@thuu_real",
        "snapchat": "https://www.snapchat.com/@thuu_real",
        "threads": "https://www.threads.com/@thuu.real",
        "youtube": "https://www.youtube.com/@thuu_real",
    }

    context = {
        "social_links": social_links,
    }

    return render(request, "creative/templates/creative/index.html", context)

from django.contrib.auth.decorators import login_required
from django.http import HttpRequest, HttpResponse
from django.shortcuts import get_object_or_404, render
from django.urls import reverse

from ranges.models import PreFlopRange


@login_required
def range_list(request: HttpRequest) -> HttpResponse:
    ranges = PreFlopRange.objects.all()
    ctx = {
        "ranges": ranges,
        "page_pretitle": "Range Trainer",
        "page_title": "Available Ranges",
    }
    return render(request, "ranges/range_list.html", ctx)


@login_required
def range_detail(request: HttpRequest, range_id: int) -> HttpResponse:
    ctx = get_range_details(range_id)
    ctx["initial_data"]["quiz_mode_url"] = reverse("ranges:range_quiz", args=[range_id])
    ctx["page_pretitle"] = "Range Trainer"
    ctx["page_title"] = ctx["initial_data"]["range_name"]
    return render(request, "ranges/range_detail.html", ctx)


@login_required
def range_quiz(request: HttpRequest, range_id: int) -> HttpResponse:
    ctx = get_range_details(range_id)
    ctx["page_pretitle"] = "Range Trainer"
    ctx["page_title"] = "[Quiz Mode] " + ctx["initial_data"]["range_name"]
    return render(request, "ranges/range_quiz.html", ctx)


def get_range_details(range_id: int) -> dict:
    preflop_range = get_object_or_404(PreFlopRange, id=range_id)

    grids = preflop_range.format_grids()
    return {
        "initial_data": {
            "grids": grids,
            "range_name": preflop_range.name,
            "available_positions": list(preflop_range.to_domain().positions),
            "description": preflop_range.description,
        }
    }

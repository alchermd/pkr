from django.http import HttpRequest, HttpResponse
from django.shortcuts import get_object_or_404, render
from django.urls import reverse

from core import constants
from core.range import load_range_from_csv, make_grid
from ranges.models import PreFlopRange


def range_list(request: HttpRequest) -> HttpResponse:
    ranges = PreFlopRange.objects.all()
    ctx = {
        "ranges": ranges,
        "page_pretitle": "Range Trainer",
        "page_title": "Available Ranges",
    }
    return render(request, "ranges/range_list.html", ctx)


def range_detail(request: HttpRequest, range_id: int) -> HttpResponse:
    ctx = get_range_details(range_id)
    ctx["initial_data"]["quiz_mode_url"] = reverse("ranges:range_quiz", args=[range_id])
    ctx["page_pretitle"] = "Range Trainer"
    ctx["page_title"] = ctx["initial_data"]["range_name"]
    return render(request, "ranges/range_detail.html", ctx)


def range_quiz(request: HttpRequest, range_id: int) -> HttpResponse:
    ctx = get_range_details(range_id)
    ctx["page_pretitle"] = "Range Trainer"
    ctx["page_title"] = "[Quiz Mode] " + ctx["initial_data"]["range_name"]
    return render(request, "ranges/range_quiz.html", ctx)


def get_range_details(range_id: int) -> dict:
    preflop_range = get_object_or_404(PreFlopRange, id=range_id).to_domain()

    # Example: [
    #  ('UTG', [{'action': 'open', 'label': 'AA'}, {'action': 'fold', 'label': '72o'}]),
    #  ('MP', [{...}, {...}]),
    # ]
    grids = [
        (pos, make_grid(preflop_range, pos))
        for pos in sorted(
            preflop_range.positions,
            key=lambda p: constants.POSITION_ORDER.index(p)
            if p in constants.POSITION_ORDER
            else 999,
        )
    ]
    return {
        "initial_data": {
            "grids": grids,
            "range_name": preflop_range.name,
            "available_positions": list(preflop_range.positions),
            "description": preflop_range.description,
        }
    }

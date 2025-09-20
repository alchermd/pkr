from django.http import HttpRequest, HttpResponse
from django.shortcuts import render

from core.range import load_range_from_csv, make_grid, RANGE_FILES_DIR


def ranges_view(request: HttpRequest) -> HttpResponse:
    preflop_range = load_range_from_csv(
        RANGE_FILES_DIR / "6max_100bb_rfi.csv", "6max 100bb RFI"
    )
    position = "UTG"
    grid = make_grid(preflop_range, position)
    ctx = {
        "grid": grid,
        "position": position,
        "range_name": preflop_range.name,
    }
    return render(request, "ranges/ranges.html", ctx)

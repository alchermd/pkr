from django.http import HttpRequest, HttpResponse
from django.shortcuts import render

from core import constants
from core.range import load_range_from_csv, make_grid, RANGE_FILES_DIR, PreFlopRange

ranges: dict[str, PreFlopRange] = {
    "6max-100bb-rfi": load_range_from_csv(
        RANGE_FILES_DIR / "6max_100bb_rfi.csv",
        "6max 100bb RFI",
    )
}


def ranges_view(request: HttpRequest, name: str) -> HttpResponse:
    preflop_range = ranges.get(name)
    if not preflop_range:
        return HttpResponse("Range not found", status=404)

    grids = [
        (pos, make_grid(preflop_range, pos))
        for pos in sorted(
            preflop_range.positions,
            key=lambda p: constants.POSITION_ORDER.index(p)
            if p in constants.POSITION_ORDER
            else 999,
        )
    ]
    ctx = {
        "grids": grids,
        "range_name": preflop_range.name,
    }
    return render(request, "ranges/ranges.html", ctx)

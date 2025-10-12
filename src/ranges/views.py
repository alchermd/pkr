from django.http import HttpRequest, HttpResponse
from django.shortcuts import render, get_object_or_404

from core import constants
from core.range import load_range_from_csv, make_grid
from ranges.models import PreFlopRange


def range_detail(request: HttpRequest, range_id: int) -> HttpResponse:
    preflop_range = get_object_or_404(PreFlopRange, id=range_id).to_domain()

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
        "initial_data": {
            "grids": grids,
            "range_name": preflop_range.name,
        }
    }
    return render(request, "ranges/range_detail.html", ctx)

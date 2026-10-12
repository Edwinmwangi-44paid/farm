from fastapi import APIRouter

router = APIRouter()


@router.get("/products")
async def get_products():
    """Placeholder — returns mock product list."""
    return {
        "products": [
            {
                "id": "1",
                "name": "Fresh Organic Tomatoes",
                "price": 4.99,
                "unit": "kg",
                "category": "vegetables",
            },
            {
                "id": "2",
                "name": "Free-Range Eggs",
                "price": 6.50,
                "unit": "dozen",
                "category": "dairy",
            },
        ]
    }


@router.get("/farmers")
async def get_farmers():
    """Placeholder — returns mock farmer list."""
    return {
        "farmers": [
            {
                "id": "1",
                "name": "Green Valley Farm",
                "location": "Nairobi, Kenya",
            },
            {
                "id": "2",
                "name": "Sunrise Organics",
                "location": "Nakuru, Kenya",
            },
        ]
    }

from django_filters import rest_framework as filters
from .models import Product


class ProductFilter(filters.FilterSet):
    product_name = filters.CharFilter(lookup_expr='icontains')
    product_company = filters.CharFilter(field_name='product_company__name', lookup_expr='icontains')
    product_category = filters.CharFilter(field_name='product_category__name', lookup_expr='icontains')
    product_year = filters.NumberFilter()
    product_language = filters.CharFilter(lookup_expr='icontains')
    product_price = filters.NumberFilter()

    class Meta:
        model = Product
        fields = [
            'product_name', 'product_company', 'product_category', 'product_year',
            'product_language', 'product_price'
        ]

from django.contrib import admin
from .models import Product, Company, Category, Carousel, OTP, UserProfile, OrderItem, Order


class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'parent')
    search_fields = ('name',)
    list_filter = ('parent',)


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 1


class OrderAdmin(admin.ModelAdmin):
    inlines = [OrderItemInline]


admin.site.register(Product)
# admin.site.register(Comment)
admin.site.register(Company)
admin.site.register(Carousel)
admin.site.register(OTP)
admin.site.register(UserProfile)
admin.site.register(Order, OrderAdmin)
admin.site.register(Category, CategoryAdmin)

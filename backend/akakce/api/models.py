from django.db import models
from django.contrib.auth.models import User
import random


class Category(models.Model):
    name = models.CharField(max_length=255)
    name_ru = models.CharField(max_length=255, null=True, blank=True, default="")
    name_en = models.CharField(max_length=255, null=True, blank=True, default="")
    parent = models.ForeignKey('self', null=True, blank=True, related_name='children', on_delete=models.SET_NULL)
    photo = models.ImageField(upload_to='category/', blank=True, null=True)

    def __str__(self):
        return self.name


class Company(models.Model):
    name = models.CharField(max_length=255)
    name_ru = models.CharField(max_length=255, null=True, blank=True, default="")
    name_en = models.CharField(max_length=255, null=True, blank=True, default="")

    company_photo = models.ImageField(upload_to='company/', blank=True, null=True)

    info = models.TextField()
    info_ru = models.TextField()
    info_en = models.TextField()

    address = models.CharField(max_length=255)

    contact = models.CharField(max_length=100)
    email = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Excursion(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    date = models.DateField()
    alert = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.company.name} - {self.date}"


class Product(models.Model):
    product_name = models.CharField(max_length=255, default=None, null=False, blank=False)
    product_name_ru = models.CharField(max_length=255, null=True, blank=False, default="")
    product_name_en = models.CharField(max_length=255, null=True, blank=False, default="")
    product_company = models.ForeignKey(Company, related_name='products', on_delete=models.CASCADE, null=True)
    product_category = models.ForeignKey(Category, related_name='products', on_delete=models.CASCADE, default=None)
    product_price = models.IntegerField(default=0)
    product_year = models.IntegerField(default=0)
    # product_language = models.CharField(max_length=50, blank=True)
    # product_language_ru = models.CharField(max_length=50, blank=True)
    # product_language_en = models.CharField(max_length=50, blank=True)
    product_description = models.TextField(blank=True, null=True)
    product_count = models.IntegerField(default=0)
    product_rating = models.FloatField(default=0)
    # product_publisher = models.CharField(max_length=255, default=None)
    product_cover = models.ImageField(upload_to='covers/', blank=True, null=True)
    isdiscount = models.BooleanField(default=False)

    def __str__(self):
        return self.product_name


# class Comment(models.Model):
#     product = models.ForeignKey(Product, related_name='comments', on_delete=models.CASCADE)
#     text = models.TextField()
#
#     def __str__(self):
#         return self.text[:20]


class Carousel(models.Model):
    image_en = models.ImageField(upload_to='carousel_images/en/', blank=True, null=True)
    image_ru = models.ImageField(upload_to='carousel_images/ru/', blank=True, null=True)
    image_uz = models.ImageField(upload_to='carousel_images/uz/', blank=True, null=True)

    def __str__(self):
        return f'Carousel Item {self.id}'


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15)

    def __str__(self):
        return f"{self.user.username} Profile"


class Order(models.Model):
    ORDER_STATUS_CHOICES = [
        ('Pending', 'Kutilmoqda'),
        ('Accepted', 'Qabul qilindi'),
        ('Shipped', 'Yo\'lda'),
        ('Cancelled', 'Bekor qilindi'),
        ('Delivered', 'Yetkazib berildi'),
    ]

    ORDER_STATUS_CHOICES_RU = [
        ('Pending', 'В ожидании'),
        ('Accepted', 'Принял'),
        ('Shipped', 'Отправленный'),
        ('Cancelled', 'Отменено'),
        ('Delivered', 'Доставленный'),
    ]

    ORDER_STATUS_CHOICES_EN = [
        ('Pending', 'Pending'),
        ('Accepted', 'Processing'),
        ('Shipped', 'Shipped'),
        ('Cancelled', 'Cancelled'),
        ('Delivered', 'Delivered'),
    ]

    DELIVERY_TYPE_CHOICES = [
        ('delivery', 'Yetkazib berish'),
        ('mail', 'Pochta'),
        ('takeaway', 'Olib ketish'),
    ]

    PAYMENT_METHOD_CHOICES = [
        ('click', 'Click'),
        ('payme', 'Payme'),
        ('naqd', 'Naqd'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    status = models.CharField(max_length=20, choices=ORDER_STATUS_CHOICES, default='Pending')
    status_ru = models.CharField(max_length=20, choices=ORDER_STATUS_CHOICES_RU, null=True, blank=True,
                                 default='Pending')
    status_en = models.CharField(max_length=20, choices=ORDER_STATUS_CHOICES_EN, null=True, blank=True,
                                 default='Pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    address = models.TextField(default=None)
    delivery_type = models.CharField(max_length=100, choices=DELIVERY_TYPE_CHOICES, default='takeaway')
    payment_method = models.CharField(max_length=100, choices=PAYMENT_METHOD_CHOICES, default='naqd')
    promokod = models.CharField(max_length=50, blank=True)
    comment = models.TextField(blank=True)

    @property
    def total_price(self):
        return sum(item.total_price for item in self.items.all())

    def __str__(self):
        return f"Order {self.id} by {self.user.username}"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, default=None)
    quantity = models.PositiveIntegerField()
    total_price = models.IntegerField(default=0)

    def save(self, *args, **kwargs):
        self.total_price = self.product.product_price * self.quantity
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.quantity} x {self.product.product_name} in order {self.order.id}"


def generate_otp():
    return ''.join(random.choices('0123456789', k=4))


class OTP(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    otp = models.CharField(max_length=4, default=generate_otp)
    created_at = models.DateTimeField(auto_now_add=True)
    is_verified = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.username} - {self.otp}"

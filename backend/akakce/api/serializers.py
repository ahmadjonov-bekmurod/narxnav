from .models import Product, Company, Category, Carousel, OrderItem, Order, Excursion
from django.contrib.auth.models import User
from .models import UserProfile
from rest_framework import serializers
from .models import OTP


# class CommentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Comment
#         fields = ['id', 'product', 'text']


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    parent = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), allow_null=True, required=False)

    class Meta:
        model = Category
        fields = '__all__'



class ProductSerializer(serializers.ModelSerializer):
    # comments = CommentSerializer(many=True, read_only=True)
    product_company = CompanySerializer(read_only=True)
    product_company_id = serializers.PrimaryKeyRelatedField(
        queryset=Company.objects.all(), source='product_company', write_only=True)
    product_category = CategorySerializer(read_only=True)
    product_category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), source='product_category', write_only=True)

    class Meta:
        model = Product
        fields = [
            'id',
            'product_name',
            'product_name_ru',
            'product_name_en',
            'product_company',
            'product_company_id',
            'product_category',
            'product_category_id',
            'product_price',
            'product_year',
            'product_description',
            'product_count',
            'product_rating',
            'product_cover'
        ]


class CarouselSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carousel
        fields = '__all__'


class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'quantity', 'total_price']


class OrderItemCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['product', 'quantity']


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    total_price = serializers.ReadOnlyField()
    delivery_type_display = serializers.CharField(source='get_delivery_type_display', read_only=True)
    payment_method_display = serializers.CharField(source='get_payment_method_display', read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'user', 'status', 'created_at', 'updated_at', 'total_price', 'items',
                  'address', 'delivery_type', 'delivery_type_display', 'payment_method', 'payment_method_display',
                  'promokod', 'comment']
        read_only_fields = ['address', 'delivery_type', 'delivery_type_display',
                            'payment_method', 'payment_method_display', 'promokod', 'comment']

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        user = self.context['request'].user
        if user != instance.user:
            for field in ['address', 'delivery_type', 'delivery_type_display',
                          'payment_method', 'payment_method_display', 'promokod', 'comment']:
                ret.pop(field, None)
        return ret


class OrderCreateSerializer(serializers.ModelSerializer):
    items = OrderItemCreateSerializer(many=True)

    class Meta:
        model = Order
        fields = ['user', 'status', 'address', 'delivery_type', 'payment_method', 'promokod', 'comment', 'items']

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        order = Order.objects.create(**validated_data)
        for item_data in items_data:
            OrderItem.objects.create(order=order, **item_data)
        return order


class OTPCreateSerializer(serializers.ModelSerializer):
    user_phone_number = serializers.CharField(source='user.userprofile.phone_number', read_only=True)

    class Meta:
        model = OTP
        fields = ['user_phone_number', 'otp']


class OTPVerifySerializer(serializers.Serializer):
    phone_number = serializers.CharField()
    otp = serializers.CharField(max_length=6)

    def validate(self, data):
        phone_number = data.get('phone_number')
        otp = data.get('otp')
        try:
            user = User.objects.get(userprofile__phone_number=phone_number)
            otp_instance = OTP.objects.get(user=user, otp=otp, is_verified=False)
        except (User.DoesNotExist, OTP.DoesNotExist):
            raise serializers.ValidationError("Invalid OTP or Phone Number")
        return data


class UserSignUpSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(max_length=100)
    last_name = serializers.CharField(max_length=100)
    phone_number = serializers.CharField(max_length=15)

    class Meta:
        model = User
        fields = ['password', 'first_name', 'last_name', 'phone_number']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # Extract profile related fields from validated_data
        first_name = validated_data.pop('first_name')
        last_name = validated_data.pop('last_name')
        phone_number = validated_data.pop('phone_number')

        # Generate a unique username (you can customize this logic if needed)
        username = f"user_{User.objects.count() + 1}"

        # Create the User object
        user = User.objects.create_user(username=username, **validated_data)

        # Create the UserProfile object
        UserProfile.objects.create(user=user, first_name=first_name, last_name=last_name, phone_number=phone_number)

        return user


class ExcursionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Excursion
        fields = ['id', 'company', 'date', 'alert']

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, CompanyViewSet, CategoryViewSet, CarouselViewSet, \
    OTPCreateView, OTPVerifyView, UserSignUpView, OrderViewSet, ExcursionViewSet

router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'companies', CompanyViewSet)
router.register(r'categories', CategoryViewSet)
# router.register(r'comments', CommentViewSet)
router.register(r'carousels', CarouselViewSet)
router.register(r'orders', OrderViewSet)
router.register(r'excursions', ExcursionViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('otp/create/', OTPCreateView.as_view(), name='otp-create'),
    path('otp/verify/', OTPVerifyView.as_view(), name='otp-verify'),
    path('signup/', UserSignUpView.as_view(), name='signup'),
]

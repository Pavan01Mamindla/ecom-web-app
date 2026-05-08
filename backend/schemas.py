from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime

# User Schemas
class UserBase(BaseModel):
    name: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(UserBase):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True

# Menu Schemas
class MenuItemBase(BaseModel):
    name: str
    price: float
    image: str

class MenuItemResponse(MenuItemBase):
    id: int
    restaurant_id: int
    class Config:
        from_attributes = True

# Restaurant Schemas
class RestaurantBase(BaseModel):
    name: str
    image: str
    rating: float
    cuisine: str
    delivery_time: str
    offer: Optional[str] = None

class RestaurantResponse(RestaurantBase):
    id: int
    menu_items: List[MenuItemResponse] = []
    class Config:
        from_attributes = True

# Order Schemas
class OrderItemBase(BaseModel):
    menu_item_id: int
    quantity: int
    price: float

class OrderItemCreate(OrderItemBase):
    pass

class OrderItemResponse(OrderItemBase):
    id: int
    menu_item: Optional[MenuItemResponse] = None
    class Config:
        from_attributes = True

class OrderCreate(BaseModel):
    items: List[OrderItemCreate]
    total_amount: float

class DeliveryPartnerBase(BaseModel):
    name: str
    phone: str
    is_available: bool = True
    current_lat: Optional[float] = None
    current_lng: Optional[float] = None

class DeliveryPartnerResponse(DeliveryPartnerBase):
    id: int
    class Config:
        from_attributes = True

class DeliveryBase(BaseModel):
    order_id: int
    partner_id: int
    status: str

class DeliveryResponse(DeliveryBase):
    id: int
    partner: Optional[DeliveryPartnerResponse] = None
    class Config:
        from_attributes = True

class OrderResponse(BaseModel):
    id: int
    user_id: int
    total_amount: float
    status: str
    created_at: datetime
    items: List[OrderItemResponse]
    delivery: Optional[DeliveryResponse] = None
    class Config:
        from_attributes = True

# Token Schema
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

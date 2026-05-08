from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, Boolean
from sqlalchemy.orm import relationship, backref
from datetime import datetime
from database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    email = Column(String(100), unique=True, index=True)
    hashed_password = Column(String(255))
    created_at = Column(DateTime, default=datetime.utcnow)

class Restaurant(Base):
    __tablename__ = "restaurants"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), index=True)
    image = Column(String(500))
    rating = Column(Float)
    cuisine = Column(String(200))
    delivery_time = Column(String(50))
    offer = Column(String(100), nullable=True)
    
    menu_items = relationship("MenuItem", back_populates="restaurant")

class MenuItem(Base):
    __tablename__ = "menu_items"
    id = Column(Integer, primary_key=True, index=True)
    restaurant_id = Column(Integer, ForeignKey("restaurants.id"))
    name = Column(String(100))
    price = Column(Float)
    image = Column(String(500))
    
    restaurant = relationship("Restaurant", back_populates="menu_items")

class Order(Base):
    __tablename__ = "orders"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    total_amount = Column(Float)
    status = Column(String(50), default="Pending")
    created_at = Column(DateTime, default=datetime.utcnow)
    
    items = relationship("OrderItem", back_populates="order")

class OrderItem(Base):
    __tablename__ = "order_items"
    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"))
    menu_item_id = Column(Integer, ForeignKey("menu_items.id"))
    quantity = Column(Integer)
    price = Column(Float) # Price at the time of order
    
    order = relationship("Order", back_populates="items")
    menu_item = relationship("MenuItem")

class DeliveryPartner(Base):
    __tablename__ = "delivery_partners"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    phone = Column(String(20))
    is_available = Column(Boolean, default=True)
    current_lat = Column(Float, nullable=True)
    current_lng = Column(Float, nullable=True)

class Delivery(Base):
    __tablename__ = "deliveries"
    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"), unique=True)
    partner_id = Column(Integer, ForeignKey("delivery_partners.id"))
    status = Column(String(50), default="assigned") # assigned, picked, delivered
    
    order = relationship("Order", backref=backref("delivery", uselist=False))
    partner = relationship("DeliveryPartner")

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session, joinedload, selectinload
from typing import List
import models, schemas, auth, database


models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="FoodKart API")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to FoodKart API"}


@app.post("/auth/signup", response_model=schemas.UserResponse)
def signup(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = auth.get_password_hash(user.password)
    new_user = models.User(
        name=user.name,
        email=user.email,
        hashed_password=hashed_password
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@app.post("/auth/login")
def login(user: schemas.UserLogin, db: Session = Depends(database.get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if not db_user or not auth.verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    access_token = auth.create_access_token(data={"sub": db_user.email})
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": db_user.id,
            "name": db_user.name,
            "email": db_user.email
        }
    }


@app.get("/restaurants", response_model=List[schemas.RestaurantResponse])
def get_restaurants(db: Session = Depends(database.get_db)):
    return db.query(models.Restaurant).options(joinedload(models.Restaurant.menu_items)).all()

@app.get("/restaurants/{restaurant_id}", response_model=schemas.RestaurantResponse)
def get_restaurant(restaurant_id: int, db: Session = Depends(database.get_db)):
    restaurant = db.query(models.Restaurant).options(joinedload(models.Restaurant.menu_items)).filter(models.Restaurant.id == restaurant_id).first()
    if not restaurant:
        raise HTTPException(status_code=404, detail="Restaurant not found")
    return restaurant


@app.get("/users/me", response_model=schemas.UserResponse)
def get_user_profile(current_user: models.User = Depends(auth.get_current_user)):
    return current_user


@app.post("/orders", response_model=schemas.OrderResponse)
def place_order(order_data: schemas.OrderCreate, current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(database.get_db)):
    # Create the main order
    new_order = models.Order(
        user_id=current_user.id,
        total_amount=order_data.total_amount,
        status="Paid"
    )
    db.add(new_order)
    db.commit()
    db.refresh(new_order)
    
    
    for item in order_data.items:
        db_item = models.OrderItem(
            order_id=new_order.id,
            menu_item_id=item.menu_item_id,
            quantity=item.quantity,
            price=item.price
        )
        db.add(db_item)
    
    db.commit()
    db.refresh(new_order)
    return new_order

@app.get("/orders/me", response_model=List[schemas.OrderResponse])
def get_user_orders(current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(database.get_db)):
    orders = db.query(models.Order).filter(models.Order.user_id == current_user.id).options(selectinload(models.Order.items).selectinload(models.OrderItem.menu_item)).order_by(models.Order.created_at.desc()).all()
    return orders

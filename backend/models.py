import uuid
from sqlalchemy import Column, String, Integer, Float, ForeignKey, Text, Enum, Uuid
from sqlalchemy.orm import relationship
from database import Base
import enum

class UserRole(enum.Enum):
    BUYER = "BUYER"
    PROJECT_OWNER = "PROJECT_OWNER"
    ADMIN = "ADMIN"

class OrderStatus(enum.Enum):
    PENDING = "PENDING"
    COMPLETED = "COMPLETED"
    FAILED = "FAILED"
    RETIRED = "RETIRED"

class User(Base):
    __tablename__ = "users"

    id = Column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String, unique=True, index=True)
    wallet_address = Column(String, unique=True, nullable=True)
    role = Column(Enum(UserRole), default=UserRole.BUYER)
    
    projects = relationship("Project", back_populates="owner")
    orders = relationship("Order", back_populates="buyer")

class Project(Base):
    __tablename__ = "projects"

    id = Column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4)
    owner_id = Column(Uuid(as_uuid=True), ForeignKey("users.id"))
    name = Column(String, index=True)
    description = Column(Text)
    category = Column(String) # Forestry, Renewable Energy, Infrastructure
    location = Column(String)
    price_per_credit = Column(Float)
    available_quantity = Column(Integer)
    verra_id = Column(String, nullable=True)
    smart_contract_token_id = Column(Integer, nullable=True)

    owner = relationship("User", back_populates="projects")
    documents = relationship("ProjectDocument", back_populates="project")
    sdg_goals = relationship("SDGGoal", back_populates="project")
    orders = relationship("Order", back_populates="project")

class ProjectDocument(Base):
    __tablename__ = "project_documents"

    id = Column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4)
    project_id = Column(Uuid(as_uuid=True), ForeignKey("projects.id"))
    file_url = Column(String)
    content_text = Column(Text) # Extracted OCR text
    doc_hash = Column(String)

    project = relationship("Project", back_populates="documents")

class SDGGoal(Base):
    __tablename__ = "sdg_goals"

    id = Column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4)
    project_id = Column(Uuid(as_uuid=True), ForeignKey("projects.id"))
    sdg_number = Column(Integer)
    description = Column(Text)

    project = relationship("Project", back_populates="sdg_goals")

class Order(Base):
    __tablename__ = "orders"

    id = Column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4)
    buyer_id = Column(Uuid(as_uuid=True), ForeignKey("users.id"))
    project_id = Column(Uuid(as_uuid=True), ForeignKey("projects.id"))
    quantity = Column(Integer)
    total_price = Column(Float)
    tx_hash = Column(String, nullable=True)
    status = Column(Enum(OrderStatus), default=OrderStatus.PENDING)

    buyer = relationship("User", back_populates="orders")
    project = relationship("Project", back_populates="orders")

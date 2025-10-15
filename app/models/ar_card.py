from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime
from sqlalchemy.sql import func
from ..database import Base

class ARCard(Base):
    __tablename__ = "ar_cards"

    id = Column(Integer, primary_key=True, index=True)
    card_code = Column(String(100), unique=True, nullable=False)
    points = Column(Integer, nullable=False)
    ar_model_path = Column(String(255))
    is_scanned = Column(Boolean, default=False)
    scanned_by = Column(Integer, ForeignKey("users.id"))
    scanned_at = Column(DateTime(timezone=True))

"""Add card_image column to greetings table

Revision ID: add_card_image
Revises: 7e10840e1f67
Create Date: 2025-12-06 12:00:00.000000

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'add_card_image'
down_revision = '7e10840e1f67'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Add card_image column to greetings table
    op.add_column('greetings', sa.Column('card_image', sa.Text(), nullable=True))


def downgrade() -> None:
    # Remove card_image column
    op.drop_column('greetings', 'card_image')

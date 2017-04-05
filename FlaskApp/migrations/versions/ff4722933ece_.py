"""empty message

Revision ID: ff4722933ece
Revises: 99ceb76e7573
Create Date: 2017-04-05 15:22:12.695742

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ff4722933ece'
down_revision = '99ceb76e7573'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('master_animal',
    sa.Column('cownumber', sa.Text(), nullable=False),
    sa.Column('height', sa.Float(), nullable=True),
    sa.Column('weight', sa.Float(), nullable=True),
    sa.Column('eartag', sa.Text(), nullable=True),
    sa.Column('eid', sa.Text(), nullable=True),
    sa.Column('sex', sa.Text(), nullable=True),
    sa.Column('pasturenumber', sa.Text(), nullable=True),
    sa.Column('breed', sa.Text(), nullable=True),
    sa.Column('status', sa.Text(), nullable=True),
    sa.Column('trial', sa.Text(), nullable=True),
    sa.Column('herd', sa.Text(), nullable=True),
    sa.Column('animaltype', sa.Text(), nullable=True),
    sa.PrimaryKeyConstraint('cownumber')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('master_animal')
    # ### end Alembic commands ###

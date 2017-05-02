"""empty message

Revision ID: ef01bd4f6067
Revises: 12c697f73ef9
Create Date: 2017-04-26 14:57:26.608462

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ef01bd4f6067'
down_revision = '12c697f73ef9'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('group',
    sa.Column('cownumber', sa.Text(), nullable=True),
    sa.Column('groupnumber', sa.Integer(), nullable=False),
    sa.Column('groupname', sa.Text(), nullable=True),
    sa.Column('groupdescription', sa.Text(), nullable=True),
    sa.Column('attributes', sa.Text(), nullable=True),
    sa.Column('ts', sa.DateTime(timezone=True), server_default=sa.text(u'CURRENT_TIMESTAMP'), nullable=False),
    sa.PrimaryKeyConstraint('groupnumber', 'ts')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('group')
    # ### end Alembic commands ###

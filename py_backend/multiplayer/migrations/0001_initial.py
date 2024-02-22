# Generated by Django 4.2.9 on 2024-02-13 17:00

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Room',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(max_length=255, unique=True)),
                ('connected_user', models.IntegerField(default=0)),
                ('player_ready', models.IntegerField(default=0)),
                ('game_started', models.BooleanField(default=False)),
            ],
        ),
    ]
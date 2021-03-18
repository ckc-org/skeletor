import factory
from factory.django import DjangoModelFactory

from users.models import User


class UserFactory(DjangoModelFactory):
    email = factory.Faker('email')
    first_name = factory.Faker('first_name')
    last_name = factory.Faker('last_name')

    class Meta:
        model = User

    @factory.post_generation
    def password(self, created, extracted):
        if not created:
            return
        if extracted:
            self.set_password(extracted)
        else:
            self.set_password('factoryuserpass')
        self.save()

  async create(createUserDto: CreateUserDto) {
    const { email, name } = createUserDto;

    const newUser = await this.prisma.user.create({
      data: {
        email,
        name,
      },
    });

    return newUser;
  }

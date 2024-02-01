  async create(createUserDto: CreateUserDto) {
    const { email, name } = createUserDto;

    const newUser = await this.prisma.user.create({
      data: {
        email,
        name,
      },
    });

    return newUser;
  async findAll() {
    const users = await this.prisma.user.findMany();

    return users;
  }

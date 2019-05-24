import { Controller, Get, Post, Put, Delete, Param, Query, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { UserDTO } from './dto/UserDTO';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // fake data

  inMemoryUsers = [
    {
      id: 2,
      username: 'test 2',
      email: 'test2@test.com',
    },
    {
      id: 3,
      username: 'test 3',
      email: 'test3@test.com',
    },
  ];

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/test')
  list(): string {
    return 'hit list';
  }

  @Post()
  create() {
    return 'hit create';
  }

  @Put()
  update() {
    return 'hit update';
  }

  @Delete()
  delete() {
    return 'hit delete';
  }

  // test using parameter
  @Get('/users/:userId')
  getUserById(@Param('userId') id: string) {
    const userFromMemory = this.inMemoryUsers.find((user) => user.id === parseInt(id, 10));
    const resUser = new UserDTO();
    resUser.username = userFromMemory.username;
    resUser.email = userFromMemory.email;
    return resUser;
  }

  // test using query
  @Get('test-query')
  queryedList(@Query() query): string {
    return query;
  }

  @Post('add-user')
  createUser(@Body() userDTO: UserDTO) {
    return `user : ${userDTO.username} has been created`;
  }

}

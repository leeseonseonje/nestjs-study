import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Redirect } from "@nestjs/common";
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Request } from "express";

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Get()
  @Redirect('http://localhost:3000/cats/23')
  findAll(@Req() request: Request) {
    console.log(request.cookies);
    console.log(request.params);
    console.log(request.query);
    console.log(request.next);
    console.log(request.body);
    console.log(request.hostname);
    console.log(request.ip);
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log(id);
    return this.catsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return this.catsService.update(+id, updateCatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catsService.remove(+id);
  }
}

import { Body, Controller, Get, Param, Post,NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.services';

@Controller('messages')
export class MessagesController {
   
    
   constructor(public messageService:MessagesService){
    
   }


    @Get()
    listMessages(){
        return this.messageService.findAll()
    }

    @Post()
    createMessage(@Body() body:CreateMessageDto){
        console.log('body',body)
        return this.messageService.create(body.content)
    }

    @Get('/:id')
   async getMessage(@Param('id') id:string){
        console.log(id)
        const givenMessage=  await this.messageService.findOne(id)
        if(!givenMessage){
            throw new NotFoundException('Message NOt Found')
        }
        return givenMessage
    }
} 

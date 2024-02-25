import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Render, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './boards.entity';

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService) {}

    @Get()
    @Render('main')
    root(){
        return {message: "hello"}
    }
    @Get('/:id')
    getBoardById(@Param('id') id: number) :Promise<Board> {
        return this.boardsService.getBoardById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() CreateBoardDto: CreateBoardDto): Promise<Board> {
        return this.boardsService.createBoard(CreateBoardDto)
    }
    
    @Delete('/:id')
    deleteBoard(@Param('id', ParseIntPipe) id) :Promise<void> {
        return this.boardsService.deleteBoard(id);
    }

    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus
    ) {
        return this.boardsService.updateBoardStatus(id, status);
    }

   
}

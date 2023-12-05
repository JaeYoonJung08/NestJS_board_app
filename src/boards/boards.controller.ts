import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe, UsePipes } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './board-status.enum';

import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';

@Controller('boards')
export class BoardsController {
    constructor(private boardsService : BoardsService){
    }

    // @Get()
	// //:Board[]는 선택사항
    // getAllBoard() : Board[] {
    //     return this.boardsService.getAllBoards();
    // }

    // //서버에다가 요청을 줄 때 여기서 클라이언트가 준 정보를 받음
    // @Post()
    // @UsePipes(ValidationPipe)
    // createBoard(
    //     @Body()  createBoardDto: CreateBoardDto 
    // ): Board {
    //     return this.boardsService.createBoard(createBoardDto);
    // }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() CreateBoardDto : CreateBoardDto) : Promise<Board> {
        return this.boardsService.createBoard(CreateBoardDto)
    }

    @Get('/:id')
    getBoardById(@Param('id') id:number) : Promise<Board> {
        return this.boardsService.getBoardById(id);
    }

    // //localhost:5000?id=awdasagsg
    // //우리가 특정 게시물의 id값을 들고온다고 @Body를 
    // //사용해야한다고 생각할 수 있지만 이거 말고
    // //@param이라는 걸 사용해야된다.
    // @Get('/:id')
    // getBoardById(@Param('id') id: string): Board {
    //     return this.boardsService.getBoardById(id);
    // }

    // @Delete('/:id')
    // deleteBoard(@Param('id') id: string) {
    //     this.boardsService.deleteBoard(id);
    // }

    // @Patch('/:id/status')
    // updateBoardStatus(
    //     @Param('id') id: string,
    //     @Body('status', BoardStatusValidationPipe) status : BoardStatus
    // ) {
    //     return this.boardsService.updateBoardStatus(id, status);
    // }


}
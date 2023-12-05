import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
//v1 버전 사용
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository: BoardRepository,
    ){}
//     //CRUD에서 모든 게시물 데이터 가져오는 거니 함수 구현
//     //여기서 Board[] : return 값이 어떤 타입이 되는지 알려주기 위해
//     getAllBoards() : Board[] {
//         return this.boards;
//     }

//     createBoard(createBoardDto: CreateBoardDto){
//         //DTO 사용
//         //const title = createBoardDto.title; 도 가능 이지만 밑 코드를 추천
//         const {title, description} = createBoardDto;

//         const board : Board = {
//             id: uuid(),
//             //title: title 이름이 같으면 줄일 수 있음.
//             title,
//             description,
//             status: BoardStatus.PUBLIC
//         }
//         //boards 변수에다가 만든 걸 넣어주기
//         this.boards.push(board);
//         //const board의 정보를 리턴
//         return board;
//     }

    async createBoard(createBoardDto : CreateBoardDto) : Promise<Board> {
        const {title, description} = createBoardDto;

        const board = this.boardRepository.create({
            title,
            description,
            status: BoardStatus.PUBLIC
        })

        await this.boardRepository.save(board);
        return board;
    }

    async getBoardById(id: number): Promise <Board> {
        const found = await this.boardRepository.findOne({where : {id}});
        //const found = await this.boardRepository.findOne(id);

        if (!found){
            throw new NotFoundException(`Can't find Board with id ${id}`)
        }
        return found;
    }

//     getBoardById(id: string): Board {
//         const found = this.boards.find((board) => board.id == id);
//         if (!found){
//             throw new NotFoundException(`Can't find Board with id ${id}`);
//         }
//         return found;
//     }

//     deleteBoard(id: string) : void {
//         const found = this.getBoardById(id);
//         this.boards = this.boards.filter((board) => board.id !== found.id);
//     }

//     updateBoardStatus(id: string, status: BoardStatus): Board{
//         const board = this.getBoardById(id);
//         board.status = status;
//         return board;
//     }


}

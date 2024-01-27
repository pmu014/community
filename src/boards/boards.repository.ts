import { DataSource, Repository } from "typeorm";
import { Board } from "./boards.entity";
import { BoardStatus } from "./board-status.enum";
import { CreateBoardDto } from "./dto/create-board.dto";
import { Injectable } from "@nestjs/common";


@Injectable()
export class BoardRepository extends Repository<Board> {
    constructor(private dataSource: DataSource) {
        super(Board, dataSource.createEntityManager());
    }
    
    async createBoard(createBoardDto: CreateBoardDto) :Promise<Board>{
        const {title, description} = createBoardDto;

        const board = this.create({
            title,
            description,
            status: BoardStatus.PUBLIC
        });
    
        await this.save(board);
        return board;
    }
}
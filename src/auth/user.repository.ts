import { DataSource, EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credential.dto";
import { InjectRepository } from "@nestjs/typeorm";

// @EntityRepository(User)
// export class UserRepository extends Repository<User>{
//     async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
//         const {username, password} = authCredentialsDto;
//         const user = this.create({username, password});

//         await this.save(user);
//     }
// }


export class UserRepository extends Repository<User> {
    constructor(@InjectRepository(User) private dataSource: DataSource) {
        super(User, dataSource.manager); // 변경
    }

        async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const {username, password} = authCredentialsDto;
        const user = this.create({username, password});

        await this.save(user);
    }
}
import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private userRepository:Repository<User>,
        private jwtService : JwtService
    ){ }

    //constructor(private userRepositroy:UserRepository){}

    // async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    //     return this.userRepository.createUser(authCredentialsDto);
    // }

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        
       // return this.userRepository.createUser(authCredentialsDto);
       try{
        const {username, password} = authCredentialsDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = this.userRepository.create({username, password:hashedPassword});
      //  await this.userRepository.save(authCredentialsDto);
      await this.userRepository.save(user);
        } catch (error){
            if (error.code == '23505'){
                throw new ConflictException('Exishting username');
            }
            else {
                console.log('here');

                throw new InternalServerErrorException();
            }
            //console.log('error',error);
        }

        }

    async signIn(authCredentialDto: AuthCredentialsDto): Promise<{accessToken: string}> {
        const {username, password} = authCredentialDto;
        //console.log('username', username);
        //console.log('password', password);
        const user = await this.userRepository.findOne({where : {username}});
        //console.log('find user', user);
 
        if (user && (await bcrypt.compare(password, user.password))){
            //유저 토큰 생성 (Secret + payload)
            const payload = {username};
            const accessToken = await this.jwtService.sign(payload);

            return {accessToken : accessToken};
        }
        else {
            throw new UnauthorizedException('login failed');
        }
    }
}

// @Injectable()
// export class AuthService {
//     // constructor(
//     //     @InjectRepository(UserRepository)
//     //     private userRepositroy:UserRepository
//     // ){ }

//     constructor(private userRepositroy:UserRepository){}

//     async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
//         return this.userRepositroy.createUser(authCredentialsDto);
//     }
// }

// @Injectable()
// export class AuthService {
//   constructor(
//     @InjectRepository(UserRepository)
//     private userRepository: Repository<User>,
//   ) {}

//   async signUp(authCredentialDto: AuthCredentialsDto): Promise<void> {
//     return this.userRepository.createUser(authCredentialDto);
//   }

// }


// @Injectable()
// export class AuthService {
//     constructor(
//         @InjectRepository(UserRepository)
//         private userRepositroy:UserRepository
//     ){ }

//     //constructor(private userRepositroy:UserRepository){}

//     async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
//         return this.userRepositroy.createUser(authCredentialsDto);
//     }
// }'

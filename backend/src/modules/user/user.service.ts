import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async signup(user: User): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(user.password, salt);
    const reqBody = {
      fullname: user.fullname,
      email: user.email,
      password: hash,
      username: user.username
    };
    const newUser = new this.userModel(reqBody);
    return newUser.save();
  }

  async signin(user: User, jwt: JwtService): Promise<{ token: string }> {
    const foundUser = await this.userModel
      .findOne({ username: user.username })
      .exec();
    if (foundUser) {
      const { password } = foundUser;
      if (await bcrypt.compare(user.password, password)) {
        const payload = { username: user.username };
        return {
          token: jwt.sign(payload)
        };
      }
      throw new HttpException(
        'Incorrect username or password',
        HttpStatus.UNAUTHORIZED
      );
    }
    throw new HttpException(
      'Incorrect username or password',
      HttpStatus.UNAUTHORIZED
    );
  }

  async getOne(username): Promise<User & Document> {
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }
}

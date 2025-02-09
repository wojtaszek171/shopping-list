export class UserDto {
  _id: string;
  fullname: string;
  username: string;
  email: string;

  constructor(user: any) {
    this._id = user._id;
    this.fullname = user.fullname;
    this.username = user.username;
    this.email = user.email;
  }
}

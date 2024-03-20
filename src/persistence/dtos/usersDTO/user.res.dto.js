export default class UserResDTO {
  constructor(user) {
    this.nombre = user.first_name;
    this.correo = user.email;
    this.tipoDeCuenta = user.role;
  }
}
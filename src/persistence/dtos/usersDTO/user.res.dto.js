export default class UserResDTO {
  constructor(user) {
    //console.log("🔊solicitud que viene desde el UserDTO", user)
    this.nombre = user.first_name;
    this.correo = user.email;
    this.tipoDeCuenta = user.role;
  }
}
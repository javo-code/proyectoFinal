//user.dto.js:
export default class UserResDTO {
  constructor(user) {
    console.log("🔊solicitud que viene desde el REPOSITORY", user)

    this.nombre = user.first_name;
    this.correo = user.email;
    this.tipoDeCuenta = user.role;
  }
}
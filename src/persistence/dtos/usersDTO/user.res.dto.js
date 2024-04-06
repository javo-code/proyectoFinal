//user.dto.js:
export default class UserResDTO {
  constructor(user) {
    console.log("🔊solicitud que viene desde el REPOSITORY", user)

    this.name = user.first_name;
    this.email = user.email;
    this.userRole = user.role;
    this.userID = user._id
  }
}
export class Validate {
  static email(mail: string) {
    if (/^[\w.-]+@gmail\.com$/.test(mail)) {
      return true;
    }
    return false;
  }
  static password(pass: string) {
    // Kiểm tra mật khẩu có ít nhất 8 ký tự
    if (pass.length < 8) {
      return false;
    }

    // Kiểm tra mật khẩu có chứa ít nhất một chữ cái viết hoa, một chữ cái viết thường và một ký tự đặc biệt
    const hasUpperCase = /[A-Z]/.test(pass);
    const hasLowerCase = /[a-z]/.test(pass);
    const hasSpecialChar = /[@#$%^&+=]/.test(pass); // Thêm hoặc loại bỏ các ký tự đặc biệt theo nhu cầu

    return hasUpperCase && hasLowerCase && hasSpecialChar;
  }
}

const { User } = require("./../models")
const argon2Utils = require("./../utils/argon2")
const jwtUtils = require("./../utils/jwt")

exports.getRegisterPage = (req, res) => {
  res.render("web/register")
}

exports.getLoginPage = (req, res) => {
  res.render("web/login")
}

exports.postRegister = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
  
    const hashedPassword = await argon2Utils.hashPassword(password);

    const user = await User.create({ fullname, email, password: hashedPassword });
    res.redirect("/admin-webpdesa/login");

  } catch (error) {
    let errorMessage;

    if (error instanceof Sequelize.UniqueConstraintError) {
      errorMessage = "Email sudah terdaftar. Silakan gunakan email lain.";
    } else {
      errorMessage = "Terjadi kesalahan saat mendaftarkan akun. Silakan coba lagi.";
    }
    res.render("register", { error: errorMessage });
  }
}


exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await argon2Utils.verifyPassword(user.password, password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwtUtils.generateToken({
      id: user.id,
      fullname: user.fullname,
      email: user.email
    });

    res.cookie('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 60 * 60 * 1000
    });
    
    res.redirect("/admin-webpdesa");

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.logout = (req, res) => {
  try {
    res.clearCookie('authToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
    });

    res.redirect('/admin-webpdesa/login');
  } catch (error) {
    res.status(500).json({ error: 'Terjadi kesalahan saat logout' });
  }
};

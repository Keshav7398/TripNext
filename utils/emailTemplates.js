function verifyEmailTemplate({ username, verifyLink }) {
  return `
    <div style="font-family:Inter,Arial,sans-serif;max-width:520px;margin:auto;border:1px solid #eee;border-radius:12px;overflow:hidden">
      <div style="padding:18px 20px;background:#FF385C;color:#fff">
        <h2 style="margin:0">Verify your email</h2>
      </div>

      <div style="padding:18px 20px;color:#222">
        <p style="margin:0 0 10px">Hello <b>${username}</b>,</p>
        <p style="margin:0 0 14px">
          Click the button below to verify your email and activate your account.
        </p>

        <a href="${verifyLink}"
          style="display:inline-block;padding:12px 16px;background:#FF385C;color:white;text-decoration:none;border-radius:10px;font-weight:700">
          Verify Email
        </a>

        <p style="margin:14px 0 0;color:#717171;font-size:12px">
          This link expires in 24 hours. If you didn't create this account, ignore this email.
        </p>

        <p style="margin:12px 0 0;color:#717171;font-size:12px">
          Or copy and paste this link:
          <br/>
          <span style="word-break:break-all">${verifyLink}</span>
        </p>
      </div>
    </div>
  `;
}

module.exports = { verifyEmailTemplate };

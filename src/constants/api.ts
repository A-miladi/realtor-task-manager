export const API_URL = {
  Auth: {
    SendOtp: '/auth/send-otp',
    VerifyPhoneOTP: '/auth/verify-otp',
    VerifyEmailOTP: '/auth/verify-email',
    ForgotPassword: '/auth/forgot-password',
    ResetPassword: '/auth/reset-password',
    ChangePassword: '/auth/change-password',
    User: '/auth/me',
  },

  Uploader: {
    uploader: '/uploader',
  },
  Setting: {
    setting: 'Setting',
    settingAdd: 'Setting/edit',
    users: 'admin/users',
    addUsers: 'admin/add-user',
    editUsers: 'admin/edit-user',
    deleteUsers: 'admin/delete-user',
  },
  Task: {
    addTask: '/task/add',
    commentTask: '/task/push/comment',
    editTask: '/task/edit',
    task: '/task',
    deleteTask: '/task/delete/comment',
  },
  Forms: {
    forms: '/form',
    make_form: '/form/make-form',
  },
  Files: {
    files: '/files',
    add: '/files/add',
  },
  uploader: {
    image: '/uploader/image',
    logo: '/uploader/image/logo',
    video: '/uploader/video',
  },
  Notification: {
    Notifications: '/task/notifications',
    PostNotification: '/task/notifications/seen',
  },
  Permissions: {
    permissions: '/permissions',
    update: '/permissions/update',
  },
}

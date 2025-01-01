import express from 'express'
import { body, validationResult } from 'express-validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { prisma } from '../db'

const router = express.Router()

// 註冊驗證規則
const registerValidation = [
  body('email').isEmail().withMessage('請輸入有效的電子郵件地址'),
  body('password').isLength({ min: 8 }).withMessage('密碼長度至少需要8個字元'),
  body('name').isLength({ min: 2 }).withMessage('請輸入正確的姓名'),
  body('phone').matches(/^09\d{8}$/).withMessage('請輸入有效的手機號碼')
]

// 註冊路由
router.post('/register', registerValidation, async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { email, password, name, phone } = req.body

    // 檢查郵箱是否已被使用
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return res.status(400).json({
        field: 'email',
        message: '此電子郵件已被註冊'
      })
    }

    // 加密密碼
    const hashedPassword = await bcrypt.hash(password, 10)

    // 創建用戶
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        phone
      }
    })

    res.status(201).json({
      message: '註冊成功'
    })
  } catch (error) {
    console.error('註冊錯誤:', error)
    res.status(500).json({ message: '伺服器錯誤' })
  }
})

export default router 
import { connect } from "@/dbConfig/dbConfig"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import jwt from 'jsonwebtoken'

connect()


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { email, password } = reqBody

        // check user exits
        // check user
        const user = await User.findOne({ email })
        if (user) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 })
        }


        // check password if user exist
        const validPassword = await bcryptjs.compare(password, user.password)
        if (!validPassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 })
        }


        // create token with payload if password is right
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = jwt.sign(tokenData, process.env.SECRET_KEY!, { expiresIn: "1h" })

        const response = NextResponse.json({
            message: "Loggin Succesfull",
            success: true,
        })

        response.cookies.set("token", token, {
            httpOnly: true,
        })

        return response;
    }
    catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}

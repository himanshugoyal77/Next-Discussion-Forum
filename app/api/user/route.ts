import dbConnect from "@/lib/connectDb";
import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import User from "@/models/user.model";


export async function GET(req: NextRequest) {
  await dbConnect();

  try {
    const users = await User.find({});
    return NextResponse.json(
      { success: true, data: users },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      // @ts-ignore
      { success: false, error: error?.message },
      {
        status: 400,
      }
    );
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();

  const body = await req.json();

  try {
    const foundUser = await User.findOne({ id: body.id });
    if (foundUser) {
      return NextResponse.json(
        { success: true, data: foundUser, msg: "User already exists" },
        {
          status: 200,
        }
      );
    }

    const user = await User.create(body);

    return NextResponse.json(
      { success: true, data: user, msg: "User created successfully" },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json(
      // @ts-ignore
      { success: false, error: error?.message },
      {
        status: 400,
      }
    );
  }
}

export async function PUT(req: NextRequest) {
  await dbConnect();
  // @ts-ignore
  const body = await req.json();

  try {
    const user = await User.findOneAndUpdate(
      {
        id: body.id,
      },
      {
        imageUrl: body.imageUrl,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    return NextResponse.json(
      { success: true, data: user, msg: "profile image updated successfully" },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      // @ts-ignore
      { success: false, error: error?.message },
      {
        status: 400,
      }
    );
  }
}

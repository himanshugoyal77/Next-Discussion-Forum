import dbConnect from "@/lib/connectDb";
import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import User from "@/models/user.model";

export async function GET(req: NextRequest) {
  await dbConnect();
  const id = req.nextUrl.pathname.split("/")[3];

  try {
    const user = await User.findOne({
      id,
    });
    return NextResponse.json(
      { success: true, data: user },
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

import dbConnect from "@/lib/connectDb";
import { NextRequest, NextResponse } from "next/server";
import Question from "@/models/question";

export async function GET() {
  await dbConnect();

  try {
    const posts = await Question.find({}).sort({ createdAt: -1 });
    return Response.json(
      { success: true, data: posts },
      {
        status: 200,
      }
    );
  } catch (error) {
    return Response.json(
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

  const { question, description, userId, tags } = await req.json();
  try {
    const newQuestion = await Question.create({
      question,
      description,
      author: userId,
      tags,
    });
    return Response.json(
      { success: true, data: newQuestion },
      {
        status: 201,
      }
    );
  } catch (error) {
    return Response.json(
      // @ts-ignore
      { success: false, error: error?.message },
      {
        status: 400,
      }
    );
  }
}

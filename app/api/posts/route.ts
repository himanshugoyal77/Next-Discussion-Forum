import dbConnect from "@/lib/connectDb";
import { NextRequest, NextResponse } from "next/server";
import Question from "@/models/question";
import Reply from "@/models/reply.model";

export async function GET() {
  await dbConnect();

  try {
    const posts = await Question.find({})
      .sort({ createdAt: -1 })
      .populate("author")
      .populate("replies");
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

export async function PUT(req: NextRequest) {
  await dbConnect();

  const { questionId, userId, comment } = await req.json();
  try {
    const reply = await Reply.create({
      comment,
      author: userId,
      questionId,
    });

    const updatedQuestion = await Question.findByIdAndUpdate(
      questionId,
      {
        $push: { replies: reply._id },
      },
      { new: true }
    ).populate("author");

    return Response.json(
      { success: true, data: updatedQuestion },
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

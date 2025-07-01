import { connectToDatabase } from "@/lib/mongodb";
import Comment from "@/models/Comment";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req) {
  await connectToDatabase();
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  const comments = await Comment.find({ articleSlug: slug }).sort({ createdAt: -1 }).lean();
  return Response.json(comments);
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { content, articleSlug } = await req.json();

  await connectToDatabase();
  const newComment = await Comment.create({
    articleSlug,
    userEmail: session.user.email,
    userName: session.user.name,
    content,
  });

  return Response.json({ success: true, comment: newComment });
}
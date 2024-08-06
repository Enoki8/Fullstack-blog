import { PrismaClient } from "@prisma/client";
import { NextApiResponse } from "next"; //next/server
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function main() {
  try {
    await prisma.$connect();
  } catch (err) {
    return Error("DB接続失敗");
  }
}

//全記事取得
export const GET = async (req: Request, res: NextApiResponse) => {
  try {
    await main();
    const posts = await prisma.post.findMany();
    return NextResponse.json({ messate: "Success", posts }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

//ブログ投稿用
export const POST = async (req: Request, res: NextApiResponse) => {
    try {
      const { title, description } = await req.json();
      await main();
      const posts = await prisma.post.create({ data: { title, description} });
      return NextResponse.json({ messate: "Success", posts }, { status: 201 });
    } catch (err) {
      return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
  };
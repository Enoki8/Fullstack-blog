import { PrismaClient } from "@prisma/client";
import { NextApiResponse } from "next"; //next/server
import { NextRequest, NextResponse } from "next/server";

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

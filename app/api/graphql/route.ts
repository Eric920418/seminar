import { createSchema, createYoga } from "graphql-yoga";
import { readdirSync, readFileSync } from "fs";
import path from "path";
import { getToken } from "next-auth/jwt";
import resolvers from "../../../graphql/resolvers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

// 嚴格的 token 驗證函數
async function verifyToken(request: any) {
  // 1. 檢查 Authorization 頭部
  const authHeader = request.headers.get("Authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.substring(7);
    try {
      // 驗證 JWT token
      const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET || "");
      return !!decoded;
    } catch (error) {
      console.error("Token verification failed:", error);
      return false;
    }
  }

  // 2. 如果沒有 Authorization 頭部，嚴格拒絕（不再檢查 session）
  return false;
}

// 權限包裝器
const withAuth = (resolvers: any) => {
  const wrappedResolvers = { ...resolvers };

  // 遍歷所有 Mutation 解析器
  if (resolvers.Mutation) {
    wrappedResolvers.Mutation = Object.keys(resolvers.Mutation).reduce(
      (acc: any, key: string) => {
        // 為每個 Mutation 添加身份驗證檢查
        acc[key] = async (parent: any, args: any, context: any, info: any) => {
          if (!context.isAuthenticated) {
            throw new Error(
              "需要有效的 Authorization Bearer Token 才能執行修改操作"
            );
          }
          return resolvers.Mutation[key](parent, args, context, info);
        };
        return acc;
      },
      {}
    );
  }

  return wrappedResolvers;
};

// 定义 schemas 目录路径
const schemasDir = path.join(process.cwd(), "graphql/schemas");

// 动态读取所有 .graphql 文件并合并内容
const typeDefs = readdirSync(schemasDir)
  .filter((file: string) => file.endsWith(".graphql"))
  .map((file: string) => readFileSync(path.join(schemasDir, file), "utf-8"))
  .join("\n");

// 創建 Yoga 實例
const yoga = createYoga({
  schema: createSchema({
    typeDefs,
    resolvers: withAuth(resolvers),
  }),
  // 添加 GraphQL 相關配置
  graphqlEndpoint: "/api/graphql",
  fetchAPI: { Response: NextResponse },
  async context({ request }) {
    let isAuthenticated = false;

    try {
      // 使用嚴格的 token 驗證函數
      isAuthenticated = await verifyToken(request);
    } catch (error) {
      console.error("驗證錯誤:", error);
    }

    return { isAuthenticated };
  },
});

// 處理所有支持的 HTTP 方法
export const GET = yoga;
export const POST = yoga;
export const OPTIONS = yoga;

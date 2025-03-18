import { createSchema, createYoga } from "graphql-yoga";
import { readdirSync, readFileSync } from "fs";
import path from "path";
import resolvers from "../../../graphql/resolvers";

interface NextContext {
  params: Promise<Record<string, string>>;
}

// 定义 schemas 目录路径
const schemasDir = path.join(process.cwd(), "graphql/schemas");

// 动态读取所有 .graphql 文件并合并内容
const typeDefs = readdirSync(schemasDir)
  .filter((file: string) => file.endsWith(".graphql")) // 显式声明 file 是 string 类型
  .map((file: string) => readFileSync(path.join(schemasDir, file), "utf-8")) // 再次声明类型
  .join("\n");

// 创建 Yoga 实例
const { handleRequest } = createYoga<NextContext>({
  schema: createSchema({
    typeDefs,
    resolvers,
  }),
  graphqlEndpoint: "/api/graphql",
});

// 导出支持的 HTTP 方法
export {
  handleRequest as GET,
  handleRequest as POST,
  handleRequest as OPTIONS,
};

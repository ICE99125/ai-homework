# 八 数码问题

## 本地开发

```bash
git clone https://github.com/ICE99125/AI-Homework.git
```

```bash
cd ./AI-Homework
```

安装依赖

```bash
pnpm install
```

启用本地服务器

```bash
pnpm run dev
```

## 目录结构

```
src
  ├─components                # 自定义组件
  ├─App.tsx
  ├─index.css                 # 全局样式
  ├─main.tsx
  ├─type.d.ts                 # 全局类型声明
  ├─vite-env.d.ts
  ├─store
  └─utils                     # 核心算法
    ├─A.ts                    # A* 算法
    ├─bfs.ts                  # 宽度优先搜索
    ├─dfs.ts                  # 深度优先搜索
    └─tool.ts                 # 一些公共函数
```

## todo

[ ] 将结点查询可视化
[x] 求解过程可视化
[x] 能够选择不同的算法
[x] 能够主动输入起始矩阵和目标矩阵

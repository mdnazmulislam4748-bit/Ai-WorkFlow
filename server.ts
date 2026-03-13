import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { GoogleGenAI } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // --- API Routes ---

  // Auth
  app.post("/api/auth/signup", async (req, res) => {
    const { email, password, name } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: { email, password: hashedPassword, name },
      });
      const token = jwt.sign({ userId: user.id }, JWT_SECRET);
      res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
    } catch (e) {
      res.status(400).json({ error: "User already exists" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
  });

  // Middleware for protected routes
  const authenticate = (req: any, res: any, next: any) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
      req.userId = decoded.userId;
      next();
    } catch (e) {
      res.status(401).json({ error: "Invalid token" });
    }
  };

  // Workflows
  app.get("/api/workflows", authenticate, async (req: any, res) => {
    const workflows = await prisma.workflow.findMany({
      where: { userId: req.userId },
      include: { nodes: true, edges: true },
    });
    res.json(workflows);
  });

  app.post("/api/workflows", authenticate, async (req: any, res) => {
    const { name, description, nodes, edges } = req.body;
    const workflow = await prisma.workflow.create({
      data: {
        name,
        description,
        userId: req.userId,
        nodes: {
          create: nodes.map((n: any) => ({
            type: n.type,
            positionX: n.position.x,
            positionY: n.position.y,
            data: JSON.stringify(n.data),
          })),
        },
        edges: {
          create: edges.map((e: any) => ({
            source: e.source,
            target: e.target,
          })),
        },
      },
    });
    res.json(workflow);
  });

  // AI Execution Engine (Simplified)
  app.post("/api/execute/:workflowId", authenticate, async (req: any, res) => {
    const { workflowId } = req.params;
    const workflow = await prisma.workflow.findUnique({
      where: { id: workflowId },
      include: { nodes: true, edges: true },
    });

    if (!workflow) return res.status(404).json({ error: "Workflow not found" });

    const execution = await prisma.execution.create({
      data: {
        workflowId,
        userId: req.userId,
        status: "RUNNING",
      },
    });

    // In a real app, this would be a background job
    // For this demo, we'll simulate sequential execution
    try {
      const results: any = {};
      const nodes = workflow.nodes;
      
      for (const node of nodes) {
        const nodeData = JSON.parse(node.data);
        await prisma.executionLog.create({
          data: {
            executionId: execution.id,
            level: "INFO",
            message: `Executing node: ${node.type} (${node.id})`,
          },
        });

        if (node.type === "aiPrompt") {
          const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
          const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: nodeData.prompt,
          });
          results[node.id] = response.text;
        } else if (node.type === "delay") {
          await new Promise((resolve) => setTimeout(resolve, nodeData.ms || 1000));
        }
        // ... handle other node types ...
      }

      await prisma.execution.update({
        where: { id: execution.id },
        data: { status: "COMPLETED", result: JSON.stringify(results) },
      });

      res.json({ executionId: execution.id, status: "COMPLETED", results });
    } catch (error: any) {
      await prisma.execution.update({
        where: { id: execution.id },
        data: { status: "FAILED", result: error.message },
      });
      res.status(500).json({ error: error.message });
    }
  });

  // Templates
  app.get("/api/templates", async (req, res) => {
    const templates = await prisma.template.findMany();
    res.json(templates);
  });

  // Blog
  app.get("/api/blog", async (req, res) => {
    const posts = await prisma.blogPost.findMany({
      include: { author: { select: { name: true } } },
    });
    res.json(posts);
  });

  // --- Vite Integration ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

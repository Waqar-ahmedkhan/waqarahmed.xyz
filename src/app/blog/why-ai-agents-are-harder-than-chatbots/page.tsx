import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Database,
  Gauge,
  GitBranch,
  Layers,
  RefreshCcw,
  Search,
  ShieldCheck,
  Wrench,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Why AI Agents Are Harder Than Chatbots",
  description:
    "A practical blog explaining why AI agents are harder than chatbots, covering tools, retrieval, planning, memory, workflow execution, evaluation, cost, and reliability.",
  alternates: {
    canonical: "https://waqarahmed.xyz/blog/why-ai-agents-are-harder-than-chatbots",
  },
  openGraph: {
    title: "Why AI Agents Are Harder Than Chatbots",
    description:
      "Simple chatbots answer. AI agents plan, retrieve, use tools, remember context, and complete workflows, which makes them more powerful and harder to engineer.",
    url: "https://waqarahmed.xyz/blog/why-ai-agents-are-harder-than-chatbots",
    type: "article",
    images: [
      {
        url: "/blog/ai-agent-vs-chatbot.svg",
        width: 1200,
        height: 720,
        alt: "AI agent versus chatbot diagram",
      },
    ],
  },
};

const tableOfContents = [
  { href: "#difference", label: "Core difference" },
  { href: "#tools", label: "Tool use" },
  { href: "#retrieval", label: "Retrieval" },
  { href: "#planning", label: "Planning" },
  { href: "#memory", label: "Memory" },
  { href: "#workflows", label: "Workflows" },
  { href: "#evaluation", label: "Evaluation" },
  { href: "#stack", label: "Agent stack" },
];

const heroStats = [
  { label: "Chatbot", value: "Reply", detail: "Responds to a message with a single answer" },
  { label: "Agent", value: "Act", detail: "Plans steps, uses tools, observes results, and continues" },
  { label: "Risk", value: "Higher", detail: "More autonomy means more state, cost, and failure modes" },
];

const agentLayers = [
  {
    title: "Planning",
    icon: GitBranch,
    body: "The agent has to break a goal into steps, decide what to do next, and recover when the plan does not work.",
  },
  {
    title: "Tool calling",
    icon: Wrench,
    body: "The agent can call APIs, create tasks, send messages, generate reports, trigger n8n workflows, or update systems.",
  },
  {
    title: "Retrieval",
    icon: Search,
    body: "The agent needs the right context from vector databases, documents, product data, and previous interactions.",
  },
  {
    title: "Memory",
    icon: Database,
    body: "The agent may need short-term state, user preferences, task progress, history, and durable records.",
  },
  {
    title: "Control",
    icon: ShieldCheck,
    body: "Permissions, approvals, validation, and guardrails decide what the agent can safely do.",
  },
  {
    title: "Cost and latency",
    icon: Gauge,
    body: "Multi-step reasoning can call models and tools many times, so the system needs budgets, limits, and monitoring.",
  },
];

const comparisonRows = [
  {
    chatbot: "Answers one message at a time",
    agent: "Works toward a goal across multiple steps",
  },
  {
    chatbot: "Usually depends on conversation text",
    agent: "Retrieves knowledge, database records, and external context",
  },
  {
    chatbot: "Mostly produces text",
    agent: "Can call tools, APIs, automations, and workflows",
  },
  {
    chatbot: "Easy to demo",
    agent: "Hard to make reliable, safe, affordable, and observable",
  },
];

const failureModes = [
  "The agent picks the wrong tool for the job.",
  "The retrieval layer returns weak or irrelevant context.",
  "The plan loops, stalls, or keeps asking the same question.",
  "The agent forgets important task state between steps.",
  "A tool call succeeds technically but creates the wrong business outcome.",
  "The workflow becomes too slow or expensive for users.",
  "The agent takes action without enough validation or user approval.",
  "Small prompt changes create large behavior regressions.",
];

const stackItems = [
  "LangChain for chains, tools, retrievers, and common LLM application building blocks.",
  "LangGraph for stateful agent flows where steps, branches, memory, and recovery paths matter.",
  "AutoGen and CrewAI for multi-agent collaboration, role-based agents, and experimentation.",
  "Pinecone or another vector database for semantic retrieval and knowledge grounding.",
  "n8n for workflow automation when agent decisions need to trigger operational actions.",
  "Evaluation, logging, and human review so agent behavior improves instead of drifting silently.",
];

export default function WhyAiAgentsAreHarderThanChatbotsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <article className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to portfolio
        </Link>

        <header className="overflow-hidden rounded-lg border border-border bg-card shadow-none">
          <div className="border-b border-border p-5 sm:p-8 lg:p-10">
            <div className="mb-5 flex flex-wrap gap-2">
              {["AI Agents", "LangGraph", "Tool Calling", "Vector Search"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="max-w-4xl text-3xl font-semibold leading-tight text-foreground sm:text-5xl">
              Why AI Agents Are Harder Than Chatbots
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
              A chatbot can answer a message. An agent has to understand a goal,
              retrieve knowledge, plan steps, call tools, remember context,
              observe results, and complete a workflow without losing control.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span>By Waqar Ahmed</span>
              <span className="h-1 w-1 rounded-full bg-muted-foreground" />
              <span>10 min read</span>
              <span className="h-1 w-1 rounded-full bg-muted-foreground" />
              <span>Agentic AI Engineering</span>
            </div>
          </div>
          <Image
            src="/blog/ai-agent-vs-chatbot.svg"
            alt="Diagram comparing a simple chatbot with an AI agent that plans, retrieves, uses tools, and remembers context"
            width={1200}
            height={720}
            priority
            className="w-full bg-black"
          />
        </header>

        <section className="mt-6 grid gap-3 sm:grid-cols-3">
          {heroStats.map((item) => (
            <div key={item.label} className="rounded-lg border border-border bg-card p-4 shadow-none">
              <div className="text-xs uppercase text-muted-foreground">{item.label}</div>
              <div className="mt-2 text-2xl font-semibold text-foreground">{item.value}</div>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">{item.detail}</p>
            </div>
          ))}
        </section>

        <section className="mt-6 rounded-lg border border-border bg-card p-5 shadow-none sm:p-6">
          <div className="grid gap-5 lg:grid-cols-[220px_1fr]">
            <div>
              <p className="text-xs font-medium uppercase text-muted-foreground">Main idea</p>
              <h2 className="mt-2 text-2xl font-semibold">Agents are harder because they act</h2>
            </div>
            <div className="grid gap-3">
              {comparisonRows.map((row) => (
                <div key={row.chatbot} className="grid gap-3 rounded-lg border border-border bg-background p-3 md:grid-cols-2">
                  <div>
                    <div className="text-xs font-semibold uppercase text-muted-foreground">Chatbot</div>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{row.chatbot}</p>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase text-foreground">AI Agent</div>
                    <p className="mt-1 text-sm leading-6 text-foreground">{row.agent}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Image
          src="/blog/agent-workflow-loop.svg"
          alt="AI agent workflow loop showing goal understanding, retrieval, tool use, observation, memory, and evaluation"
          width={1200}
          height={720}
          className="mt-6 w-full rounded-lg border border-border bg-black shadow-none"
        />

        <section className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-8">
            <ArticleSection id="difference" title="A chatbot is a conversation. An agent is a workflow.">
              <p>
                A simple chatbot usually follows a direct pattern. The user sends
                a message, the model receives context, and the system returns a
                response. That can be useful for support, Q and A, brainstorming,
                summaries, and quick explanations.
              </p>
              <p>
                An AI agent is different. It is not only trying to answer. It is
                trying to complete a goal. To do that, it may need to search
                knowledge, inspect data, choose a tool, call an API, observe the
                result, update state, and decide the next step.
              </p>
              <p>
                This is why agents are powerful, but also harder. The moment the
                AI can act, the engineering problem becomes bigger than prompting.
                You now have to design control, state, safety, memory, evaluation,
                and recovery.
              </p>
            </ArticleSection>

            <ArticleSection id="tools" title="Tool use introduces real-world consequences">
              <p>
                A chatbot can be wrong and the user may ignore it. An agent can be
                wrong and still create a task, send an email, update a record,
                trigger a workflow, generate an invoice, or call an external API.
              </p>
              <p>
                Tool calling needs clear schemas, input validation, permissions,
                logging, retries, and human approval for risky actions. The tool
                should not be a vague function that accepts anything. It should be
                a carefully designed interface between AI reasoning and real
                software behavior.
              </p>
              <p>
                This is where tools like LangChain, LangGraph, CrewAI, AutoGen,
                and n8n become interesting. They help structure the workflow, but
                they do not remove the need for engineering judgment. The developer
                still has to decide what the agent is allowed to do and how failure
                is handled.
              </p>
            </ArticleSection>

            <ArticleSection id="retrieval" title="Retrieval makes agents useful, but retrieval is easy to get wrong">
              <p>
                Agents need knowledge. If the system only relies on the model
                memory, it will miss private business data, product documentation,
                user history, current records, and domain-specific details.
              </p>
              <p>
                Vector search helps by retrieving relevant chunks from documents,
                help centers, internal notes, reports, or customer data. Tools like
                Pinecone and other vector databases make this possible, but the
                hard parts are still chunking, metadata, filtering, reranking,
                freshness, and citations.
              </p>
              <p>
                A bad retrieval layer makes the agent confident with weak context.
                A good retrieval layer makes the agent grounded, specific, and
                useful.
              </p>
            </ArticleSection>

            <ArticleSection id="planning" title="Planning sounds simple until the plan changes">
              <p>
                Planning is one of the biggest differences between a chatbot and
                an agent. A chatbot answers the current message. An agent needs to
                decide what sequence of steps can complete the goal.
              </p>
              <p>
                Real workflows are messy. A tool can fail. A retrieved document
                can be incomplete. A user can change their mind. A step can reveal
                new information. The agent needs a way to branch, retry, stop, ask
                a clarifying question, or hand control back to a human.
              </p>
              <p>
                This is why stateful frameworks such as LangGraph matter. They let
                you think in nodes, edges, state, loops, and controlled transitions
                instead of hoping one long prompt will manage everything.
              </p>
            </ArticleSection>

            <ArticleSection id="memory" title="Memory is not the same as chat history">
              <p>
                Many people think memory means storing the whole conversation and
                sending it back to the model. That works for small demos, but it
                breaks down in serious products.
              </p>
              <p>
                Real memory has different layers. Short-term memory tracks the
                current task. Long-term memory stores user preferences, decisions,
                entities, and past outcomes. Product memory lives in the database:
                users, projects, invoices, bookings, settings, and workflow state.
              </p>
              <p>
                The hard question is not whether to remember. The hard question is
                what to remember, where to store it, when to retrieve it, and how
                to avoid giving the agent outdated or private information.
              </p>
            </ArticleSection>

            <ArticleSection id="workflows" title="Agents become valuable when they complete workflows">
              <p>
                The real value of an agent is not that it can chat. The value is
                that it can reduce manual work. It can turn a goal into a sequence
                of useful actions.
              </p>
              <p>
                For a coworking SaaS, an agent might check room availability,
                summarize bookings, prepare a report, draft a member message, and
                ask for approval before sending it. For an education product, it
                might inspect progress, retrieve weak topics, recommend resources,
                and update a teacher dashboard.
              </p>
              <p>
                n8n becomes useful here because many business workflows already
                live across tools. An agent can decide what should happen, while
                n8n can run the connected automation in a controlled way.
              </p>
            </ArticleSection>

            <ArticleSection id="evaluation" title="Agent evaluation is harder than chatbot evaluation">
              <p>
                A chatbot can often be evaluated by reading the answer. An agent
                needs deeper evaluation because the result is a path, not only a
                final response.
              </p>
              <p>
                Did it choose the right tool? Did it retrieve the right context?
                Did it stop at the right time? Did it ask for approval before a
                risky action? Did it spend too many tokens? Did it complete the
                workflow or only sound confident?
              </p>
              <p>
                Good agent evaluation includes test tasks, expected tool calls,
                cost budgets, latency checks, safety rules, human review, and
                regression tests. Without evaluation, every prompt or graph change
                can silently make the agent worse.
              </p>
            </ArticleSection>

            <ArticleSection id="stack" title="How I think about the agent stack">
              <p>
                I see agent engineering as a stack, not a single library choice.
                LangChain gives useful building blocks. LangGraph gives structure
                for stateful workflows. AutoGen and CrewAI help explore multi-agent
                collaboration. Pinecone and vector databases help ground the agent
                in knowledge. n8n helps connect decisions to real automations.
              </p>
              <p>
                But the tool is not the product. The product is the workflow that
                becomes easier for the user. The engineering work is designing the
                loop: goal, context, plan, tool, observation, memory, evaluation,
                and improvement.
              </p>
            </ArticleSection>
          </div>

          <aside className="h-fit space-y-5 lg:sticky lg:top-8">
            <div className="rounded-lg border border-border bg-card p-5 shadow-none">
              <h2 className="text-base font-semibold">Read The Essay</h2>
              <nav className="mt-4 grid gap-2">
                {tableOfContents.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="rounded-md border border-border bg-background px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
            <div className="rounded-lg border border-border bg-card p-5 shadow-none">
              <h2 className="text-base font-semibold">Why Agents Fail</h2>
              <ul className="mt-4 space-y-3">
                {failureModes.slice(0, 6).map((item) => (
                  <li key={item} className="flex gap-2 text-sm leading-6 text-muted-foreground">
                    <AlertTriangle className="mt-1 h-4 w-4 shrink-0 text-yellow-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </section>

        <section className="mt-10 rounded-lg border border-border bg-card p-5 shadow-none sm:p-8">
          <h2 className="text-2xl font-semibold">The engineering layers behind agents</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {agentLayers.map(({ title, body, icon: Icon }) => (
              <div key={title} className="rounded-xl border border-border bg-background p-4">
                <Icon className="h-5 w-5 text-primary" />
                <h3 className="mt-3 font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-border bg-card p-5 shadow-none sm:p-8">
            <h2 className="flex items-center gap-2 text-2xl font-semibold">
              <Layers className="h-6 w-6 text-primary" />
              Practical stack map
            </h2>
            <ul className="mt-5 space-y-3">
              {stackItems.map((item) => (
                <li key={item} className="flex gap-2 text-sm leading-6 text-muted-foreground">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-green-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-border bg-card p-5 shadow-none sm:p-8">
            <h2 className="flex items-center gap-2 text-2xl font-semibold">
              <RefreshCcw className="h-6 w-6 text-primary" />
              Final thought
            </h2>
            <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base">
              Chatbots are easier because the output is usually a message. Agents
              are harder because the output is behavior. They need planning,
              retrieval, memory, tools, safety, cost control, observability, and
              evaluation. That is exactly why they are worth learning carefully.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              View my portfolio
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
}

function ArticleSection({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 rounded-lg border border-border bg-card p-5 shadow-none sm:p-8">
      <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
      <div className="mt-4 space-y-4 text-sm leading-7 text-muted-foreground sm:text-base">
        {children}
      </div>
    </section>
  );
}

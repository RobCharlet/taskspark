import { SignIn } from "@stackframe/stack";

import TodoDashboard, {
  type SerializableTag,
  type SerializableTodo,
} from "@/components/todos/dashboard";
import { getTodosForUser, listTagsForUser, type TodoFilters } from "@/server/queries";
import { stackServerApp } from "@/stack/server";

const allowedStatuses = new Set(["all", "active", "completed"]);

type PageSearchParams = Promise<Record<string, string | string[] | undefined>>;

type HomeProps = {
  searchParams: PageSearchParams;
};

export const dynamic = "force-dynamic";

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;

  const statusParam = typeof params?.status === "string" ? params.status : "all";
  const status = allowedStatuses.has(statusParam) ? (statusParam as TodoFilters["status"]) : "all";
  const tagId = typeof params?.tag === "string" ? params.tag : undefined;
  const search = typeof params?.q === "string" ? params.q : undefined;

  const filter: TodoFilters = { status, tagId, search };

  const user = await stackServerApp.getUser();

  if (!user) {
    return <LandingPage />;
  }

  const [todos, tags] = await Promise.all([getTodosForUser(user.id, filter), listTagsForUser(user.id)]);

  const serializedTodos: SerializableTodo[] = todos.map((todo) => ({
    id: todo.id,
    title: todo.title,
    description: todo.description,
    dueAt: todo.dueAt?.toISOString() ?? null,
    completedAt: todo.completedAt?.toISOString() ?? null,
    createdAt: todo.createdAt.toISOString(),
    updatedAt: todo.updatedAt.toISOString(),
    tags: todo.tags.map(
      (tag): SerializableTag => ({
        id: tag.id,
        name: tag.name,
        color: tag.color,
      }),
    ),
  }));

  const serializedTags: SerializableTag[] = tags.map((tag) => ({
    id: tag.id,
    name: tag.name,
    color: tag.color,
  }));

  return (
    <TodoDashboard
      initialTodos={serializedTodos}
      initialTags={serializedTags}
      filters={filter}
      userName={user.displayName}
      signOutUrl={stackServerApp.urls.signOut}
    />
  );
}

function LandingPage() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-4xl flex-col items-center justify-center gap-12 px-6 py-16 text-center sm:py-24">
      <div className="space-y-6">
        <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
          Taskspark
        </span>
        <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
          Your personal command center for getting things done.
        </h1>
        <p className="text-balance text-lg text-muted-foreground sm:text-xl">
          Organize personal and work tasks, add context with tags, and stay on top of deadlines. Secure
          authentication powered by Stack Auth and reliable storage on Neon Postgres.
        </p>
      </div>
      <div className="w-full max-w-md rounded-lg border bg-card p-6 shadow-sm">
        <SignIn />
      </div>
      <p className="text-sm text-muted-foreground">
        Don&apos;t have an account yet? Use the sign up link above or any provider configured in your Stack dashboard.
      </p>
    </main>
  );
}

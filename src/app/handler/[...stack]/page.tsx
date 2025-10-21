import { StackHandler } from "@stackframe/stack";

import { stackServerApp } from "@/stack/server";

type HandlerPageProps = {
  params: Promise<Record<string, string | string[]>>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function StackHandlerPage(props: HandlerPageProps) {
  const resolvedProps = {
    params: await props.params,
    searchParams: await props.searchParams,
  };

  return <StackHandler app={stackServerApp} routeProps={resolvedProps} fullPage />;
}

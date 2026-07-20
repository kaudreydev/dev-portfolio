export default function htmlReplace(html: string, ...args: string[]): string {
  let replaced = html;
  args.forEach((arg: string, index: number) => {
    replaced = replaced.replaceAll(`\$\{${index}\}`, arg);
  });
  return replaced;
}

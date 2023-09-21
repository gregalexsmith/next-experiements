import { Scene } from './client';
import { CanvasText } from './components/canvas-text';
import { EnvBlur } from './components/env-blur';

const Header = ({ children }: any) => (
  <header className="text-2xl font-bold mt-8 mb-4">{children}</header>
);

export default function Page() {
  return (
    <main className="p-8">
      <section className="flex flex-col gap-4 mb-4">
        <h1 className="text-lg">React 3 Fiber</h1>
        <p>Some examples from react-three-fiber</p>
      </section>
      <Header>Basics</Header>
      <Scene />

      <Header>Env Blur + Interactions</Header>
      <EnvBlur />

      <Header>Canvas + Text</Header>
      <CanvasText />
    </main>
  );
}

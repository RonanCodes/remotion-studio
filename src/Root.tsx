// Auto-discovers every src/projects/<name>/register.tsx at build time.
// To add a project: drop a folder in src/projects/ with a register.tsx that
// exports a `Register` component. It will appear in the studio automatically.

declare const require: {
  context: (
    directory: string,
    useSubdirectories: boolean,
    regExp: RegExp,
  ) => {
    keys: () => string[];
    (id: string): { Register: React.FC };
  };
};

const projectModules = require.context("./projects", true, /\/register\.tsx$/);

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {projectModules.keys().map((key) => {
        const { Register } = projectModules(key);
        return <Register key={key} />;
      })}
    </>
  );
};

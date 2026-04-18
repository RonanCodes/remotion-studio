# Projects

Each subdirectory here is an independent project repo cloned into this workspace.

This folder is gitignored (except this README) so remotion-studio stays clean — each project lives in its own repo with its own history.

## Add an existing project

```bash
cd src/projects
git clone git@github.com:<owner>/<project-repo>.git <project-name>
```

Example:

```bash
git clone git@github.com:RonanCodes/remotion-studio-llm-wiki.git llm-wiki
```

The project will appear in the Remotion Studio automatically — `src/Root.tsx` auto-discovers every `src/projects/*/register.tsx` at build time.

## Create a new project

```bash
mkdir src/projects/my-project
cd src/projects/my-project
git init
```

Add a `register.tsx` that exports a `Register` component wrapping your compositions in a `<Folder>`:

```tsx
import { Composition, Folder } from "remotion";
import { MyVideo } from "./MyVideo";

export const Register: React.FC = () => (
  <Folder name="my-project">
    <Composition
      id="MyVideo"
      component={MyVideo}
      durationInFrames={300}
      fps={30}
      width={1920}
      height={1080}
    />
  </Folder>
);
```

That's it — the composition appears in `npm run dev`.

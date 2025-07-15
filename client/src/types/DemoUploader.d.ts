type DemoUploaderProps = {
  demoFile: File | null;
  setDemoFile: (file: File | null) => void;
  error: string;
  setError: (error: string) => void;
};

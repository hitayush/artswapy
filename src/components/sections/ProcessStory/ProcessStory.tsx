import { process } from '@/content/site';
import ProcessSpine from './ProcessSpine.client';

export default function ProcessStory() {
  return (
    <ProcessSpine
      label={process.label}
      rightText={process.rightText}
      heading={process.heading}
      stages={process.stages}
    />
  );
}
